# from fastapi import FastAPI, APIRouter
# from fastapi.staticfiles import StaticFiles
# from dotenv import load_dotenv
# from starlette.middleware.cors import CORSMiddleware
# from motor.motor_asyncio import AsyncIOMotorClient
# import os
# import logging
# from pathlib import Path
# from pydantic import BaseModel, Field, ConfigDict
# from typing import List
# import uuid
# from datetime import datetime, timezone

# from routers import auth, public, membership, admin

# ROOT_DIR = Path(__file__).resolve().parent
# load_dotenv(ROOT_DIR / '.env')

# mongo_url = os.environ['MONGO_URL']
# client = AsyncIOMotorClient(mongo_url)
# db = client[os.environ.get('DB_NAME', 'sesi_database')]

# app = FastAPI(title="SESI API", version="1.0.0")

# api_router = APIRouter(prefix="/api")

# class StatusCheck(BaseModel):
#     model_config = ConfigDict(extra="ignore")
#     id: str = Field(default_factory=lambda: str(uuid.uuid4()))
#     client_name: str
#     timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# class StatusCheckCreate(BaseModel):
#     client_name: str

# @api_router.get("/")
# async def root():
#     return {"message": "SESI API is running", "status": "healthy"}

# @api_router.get("/health")
# async def health_check():
#     return {"status": "healthy", "database": "connected"}

# api_router.include_router(auth.router)
# api_router.include_router(public.router)
# api_router.include_router(membership.router)
# api_router.include_router(admin.router)

# app.include_router(api_router)

# BASE_DIR = Path(__file__).resolve().parent
# uploads_dir = BASE_DIR / "uploads"
# uploads_dir.mkdir(parents=True, exist_ok=True)

# app.mount("/api/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")

# app.add_middleware(
#     CORSMiddleware,
#     allow_credentials=True,
#     allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# logging.basicConfig(
#     level=logging.INFO,
#     format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
# )
# logger = logging.getLogger(__name__)

# @app.on_event("shutdown")
# async def shutdown_db_client():
#     client.close()


from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

from routers import auth, public, membership, admin

ROOT_DIR = Path(__file__).resolve().parent
load_dotenv(ROOT_DIR / '.env')

from database import client



app = FastAPI(title="SESI API", version="1.0.0")

api_router = APIRouter(prefix="/api")

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

@api_router.get("/")
async def root():
    return {"message": "SESI API is running", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

api_router.include_router(auth.router)
api_router.include_router(public.router)
api_router.include_router(membership.router)
api_router.include_router(admin.router)

app.include_router(api_router)

BASE_DIR = Path(__file__).resolve().parent
uploads_dir = BASE_DIR / "uploads"
uploads_dir.mkdir(parents=True, exist_ok=True)

app.mount("/api/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()