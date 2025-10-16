import datetime
import gzip
import json
import mysql.connector
from datetime import datetime

# === MySQL connection ===
conn = mysql.connector.connect(
    host="booktinder-prod.c7amsyuueft7.ap-southeast-2.rds.amazonaws.com",
    user="admin",
    password="wzxZEe27X9LUXMg22nBP",
    database="booktinder_app"
)
cursor = conn.cursor()
START_FROM = 0
MAX_RECORDS = 1000000
BATCH_SIZE = 10
count = 0
inserted = 0

print("Starting import for Works dump ...")

with gzip.open("ol_dump_works_2025-09-30.txt.gz", "rt", encoding="utf-8") as f:
    for line in f:
        if count < START_FROM:
            continue  # skip lines before START_LINE
        if count > MAX_RECORDS:
            break 
        try:
            parts = line.strip().split('\t')
            if len(parts) < 5:
                continue  # skip malformed lines

            data_json = parts[4]  # last column is JSON
            data = json.loads(data_json)

            # Ensure it's a work
            if data.get("type", {}).get("key") != "/type/work":
                continue

            # Title
            title = data.get("title") or None
            if not title:
                continue

            # Authors → keys as JSON
            authors_list = data.get("authors") or []
            author_keys = [a["author"]["key"] for a in authors_list if "author" in a]
            author = json.dumps(author_keys) if author_keys else None

            # Description
            desc_field = data.get("description")
            if isinstance(desc_field, dict):
                description = desc_field.get("value")
            elif isinstance(desc_field, str):
                description = desc_field
            else:
                description = None

            # Genres / subjects
            subjects = data.get("subjects") or []
            genres = json.dumps(subjects) if subjects else None

            # Cover image
            covers = data.get("covers") or []
            image = f"https://covers.openlibrary.org/b/id/{covers[0]}-L.jpg" if covers else None

            # Created & last_modified
            created_at = None
            last_modified = None
            if "created" in data and "value" in data["created"]:
                created_at = datetime.fromisoformat(data["created"]["value"])
            if "last_modified" in data and "value" in data["last_modified"]:
                last_modified = datetime.fromisoformat(data["last_modified"]["value"])

            # Insert into MySQL
            cursor.execute(
                """
                INSERT IGNORE INTO books
                (title, author, description, genres, image, published_year, created_at, last_modified)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (title, author, description, genres, image, None, created_at, last_modified)
            )

            count += 1
            inserted += 1
            if count % BATCH_SIZE == 0:
                conn.commit()
                print(f"Committed {count} records so far...")

        except json.JSONDecodeError:
            continue  # skip malformed JSON in column
        except Exception as e:
            print(f"Error at record {count}: {e}")

# Final commit
conn.commit()
cursor.close()
conn.close()
print(f"Import complete. Total inserted: {inserted}")