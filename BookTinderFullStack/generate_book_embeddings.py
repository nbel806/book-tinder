import os
import json
import time
import mysql.connector
import openai

# ---- CONFIG ----
key=""
openai.api_key = key

DB_CONFIG = {
    "host": "",
    "user": "admin",
    "password": "",
    "database": "booktinder_app"
}

BATCH_SIZE = 50  # number of books per batch
MODEL = "text-embedding-3-small"

# ---- CONNECT ----
conn = mysql.connector.connect(**DB_CONFIG)
cursor = conn.cursor(dictionary=True)

# ---- FETCH BOOKS ----
cursor.execute("""
    SELECT id, title, description 
    FROM books 
    WHERE id NOT IN (SELECT book_id FROM book_embeddings)
    LIMIT 10000;
""")
books = cursor.fetchall()

print(f"Fetched {len(books)} books to embed...")

# ---- EMBEDDING LOOP ----
for i in range(0, len(books), BATCH_SIZE):
    batch = books[i:i+BATCH_SIZE]
    texts = [f"{b['title']} - {b['description'] or ''}"[:8000] for b in batch]

    try:
        response = openai.Embeddings.create(model=MODEL, input=texts)
        embeddings = [d["embedding"] for d in response["data"]]

        for book, emb in zip(batch, embeddings):
            cursor.execute(
                "INSERT INTO book_embeddings (book_id, embedding) VALUES (%s, %s)",
                (book["id"], json.dumps(emb)),
            )

        conn.commit()
        print(f"✅ Inserted batch {i//BATCH_SIZE + 1}/{len(books)//BATCH_SIZE + 1}")
        time.sleep(0.3)

    except Exception as e:
        print(f"❌ Error at batch {i//BATCH_SIZE}: {e}")
        conn.rollback()
        time.sleep(2)

cursor.close()
conn.close()
print("🎉 Done!")
