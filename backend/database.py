import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent
load_dotenv(ROOT_DIR / ".env")

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME", "sesi_database")

if not MONGO_URL:
    raise ValueError("❌ MONGO_URL is missing in .env")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]
