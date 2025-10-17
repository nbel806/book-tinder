import gzip
import json
import mysql.connector

# Config
GZ_FILE = "ol_dump_authors_2025-09-30.txt.gz"
BATCH_SIZE = 1000
START = 11951000 

DB_CONFIG = {
    "host": "booktinder-prod.c7amsyuueft7.ap-southeast-2.rds.amazonaws.com",
    "user": "admin",
    "password": "wzxZEe27X9LUXMg22nBP",
    "database": "booktinder_app"
}

def main():
    # Connect to MySQL
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    # SQL insert with duplicate handling
    sql = """
        INSERT INTO authors
            (author_key, name, birth_year, death_year, bio)
        VALUES (%s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            birth_year = VALUES(birth_year),
            death_year = VALUES(death_year),
            bio = VALUES(bio)
    """

    batch = []
    count = 0

    with gzip.open(GZ_FILE, 'rt', encoding='utf-8') as f:
        for line in f:
            parts = line.strip().split("\t")
            if len(parts) < 5:
                continue  # skip malformed lines

            try:
                data = json.loads(parts[4])
                author_key = data.get("key")
                name = data.get("name")
                birth_year = data.get("birth_date")
                death_year = data.get("death_date")
                bio_field = data.get("bio")

                # Handle bio field
                if isinstance(bio_field, dict):
                    bio = bio_field.get("value")
                elif isinstance(bio_field, str):
                    bio = bio_field
                else:
                    bio = None

                batch.append((author_key, name, birth_year, death_year, bio))
                count += 1

                if len(batch) >= BATCH_SIZE:
                    cursor.executemany(sql, batch)
                    conn.commit()
                    print(f"✅ Uploaded {count} authors so far...")
                    batch = []

            except json.JSONDecodeError:
                continue  # skip malformed JSON

    # Insert remaining authors
    if batch:
        cursor.executemany(sql, batch)
        conn.commit()
        print(f"✅ Uploaded total {count} authors.")

    cursor.close()
    conn.close()
    print("🎉 All authors uploaded successfully!")

if __name__ == "__main__":
    main()
