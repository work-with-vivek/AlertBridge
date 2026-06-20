from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:Cyber123%40@localhost:5432/cybersuraksha"

engine = create_engine(
    DATABASE_URL,
    echo=False
)