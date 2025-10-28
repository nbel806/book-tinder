import faiss
import numpy as np
import json
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    "host": os.getenv("DATABASE_ROUTE"),
    "user": os.getenv("DATABASE_USER"),
    "password": os.getenv("DATABASE_PASSWORD"),
    "database": os.getenv("DATABASE_NAME"),
    "port": os.getenv("DATABASE_PORT", 3306),
    "connection_timeout": 300,
}
# Connect to DB
conn = mysql.connector.connect(**DB_CONFIG)

cursor = conn.cursor(dictionary=True, buffered=True)

# Batch fetch embeddings
BATCH_SIZE = 5000
offset = 0
book_ids = []
emb_list = []

while True:
    cursor.execute(
        "SELECT book_id, embedding FROM book_embeddings LIMIT %s OFFSET %s",
        (BATCH_SIZE, offset),
    )
    batch = cursor.fetchall()
    if not batch:
        break

    for b in batch:
        book_ids.append(b["book_id"])
        emb_list.append(np.array(json.loads(b["embedding"]), dtype="float32"))

    offset += BATCH_SIZE

embeddings = np.vstack(emb_list)
faiss.normalize_L2(embeddings)

# Save mapping
book_id_to_idx = {bid: idx for idx, bid in enumerate(book_ids)}

# Build FAISS index
dimension = embeddings.shape[1]
index = faiss.IndexFlatIP(dimension)
index.add(embeddings)

# Save FAISS index to disk
faiss.write_index(index, "faiss.index")
with open("book_id_map.json", "w") as f:
    json.dump(book_id_to_idx, f)
