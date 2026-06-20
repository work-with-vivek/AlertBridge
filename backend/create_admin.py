from auth.password import hash_password
import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="cybersuraksha",
    user="postgres",
    password="Cyber123@"
)

cur = conn.cursor()

hashed = hash_password("admin123")

cur.execute(
    """
    INSERT INTO users (username, password, role)
    VALUES (%s, %s, %s)
    ON CONFLICT (username) DO NOTHING
    """,
    ("admin", hashed, "admin")
)

conn.commit()

print("Admin user created successfully!")

cur.close()
conn.close()