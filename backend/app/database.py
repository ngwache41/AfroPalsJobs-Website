from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config import get_settings

settings = get_settings()

class Database:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None


database = Database()


async def connect_to_mongo():
    """Connect to MongoDB"""
    database.client = AsyncIOMotorClient(settings.MONGO_URI)
    database.db = database.client.get_default_database()
    print("Connected to MongoDB")


async def close_mongo_connection():
    """Close MongoDB connection"""
    database.client.close()
    print("Closed MongoDB connection")


def get_database() -> AsyncIOMotorDatabase:
    """Get database instance"""
    return database.db
