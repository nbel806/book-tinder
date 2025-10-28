import os
import json
import numpy as np
import faiss
import mysql.connector
from mysql.connector import pooling
from fastapi import FastAPI
from dotenv import load_dotenv
import random

load_dotenv()

# ---- Config ----
DB_CONFIG = {
    "host": os.getenv("DATABASE_ROUTE"),
    "user": os.getenv("DATABASE_USER"),
    "password": os.getenv("DATABASE_PASSWORD"),
    "database": os.getenv("DATABASE_NAME"),
    "port": int(os.getenv("DATABASE_PORT", 3306)),
    "connection_timeout": 300,
    "autocommit": True,
}

# ---- DB Connection Pool ----
db_pool = pooling.MySQLConnectionPool(
    pool_name="book_pool",
    pool_size=5,
    **DB_CONFIG
)

def get_user_liked_books(user_id: int):
    conn = db_pool.get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT book_id FROM user_liked_book WHERE user_id = %s",
        (user_id,)
    )
    liked_books = [row["book_id"] for row in cursor.fetchall()]
    cursor.close()
    conn.close()
    return liked_books

def get_user_seen_books(user_id: int):
    conn = db_pool.get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT book_id FROM user_seen_book WHERE user_id = %s",
        (user_id,)
    )
    seen_books = [row["book_id"] for row in cursor.fetchall()]
    cursor.close()
    conn.close()
    return seen_books

def get_random_recommendations(num_recs: int = 5):
    conn = db_pool.get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT MIN(id) AS min_id, MAX(id) AS max_id FROM books")
    result = cursor.fetchone()
    min_id, max_id = result["min_id"], result["max_id"]

    recommendations = []
    attempts = 0

    while len(recommendations) < num_recs and attempts < num_recs * 5:
        # pick a random ID in range
        rand_id = random.randint(min_id, max_id)
        cursor.execute("SELECT id FROM books WHERE id >= %s LIMIT 1", (rand_id,))
        book = cursor.fetchone()
        if book and rand_id not in recommendations:
            recommendations.append(rand_id)
        attempts += 1

    cursor.close()
    conn.close()
    return recommendations

# ---- Load FAISS index + mapping ----
index = faiss.read_index("faiss.index")
with open("book_id_map.json") as f:
    book_id_to_idx = json.load(f)

book_ids = list(book_id_to_idx.keys())

app = FastAPI()

print("Recommendation microservice is up and running.")

# ---- Recommendation endpoint ----
@app.get("/recommend/{user_id}")
def recommend(user_id: int, top_k: int = 5):
    liked_books = get_user_liked_books(user_id)
    seen_books = get_user_seen_books(user_id)  

    if not liked_books:
        print("No liked books found.")
        return {"recommended_book_ids": get_random_recommendations(top_k)}

    # Only consider liked books that exist in FAISS
    liked_indices = [book_id_to_idx[str(bid)] for bid in liked_books if str(bid) in book_id_to_idx]

    if not liked_indices:
        print("No liked indices found in FAISS.")
        return {"recommended_book_ids": get_random_recommendations(top_k)}

    # Reconstruct embeddings and average
    liked_vecs = np.vstack([index.reconstruct(i) for i in liked_indices])
    user_embedding = np.mean(liked_vecs, axis=0, keepdims=True)
    faiss.normalize_L2(user_embedding)

    # Search for similar books
    D, I = index.search(user_embedding, top_k * 2)
    recommended_ids = [
        book_ids[i] for i in I[0] if int(book_ids[i]) not in liked_books
    ][:top_k]

    return {"recommended_book_ids": recommended_ids}
