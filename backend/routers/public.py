from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
import os
from typing import List, Optional
from models.models import (
    CommitteeMember, Event, News, GalleryImage, 
    Publication, Member, State, District
)

router = APIRouter(prefix="/public", tags=["Public"])

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sesi_database')]

# Committee Members
@router.get("/committee", response_model=List[CommitteeMember])
async def get_committee_members(year: Optional[int] = None, is_current: bool = True):
    """Get committee members"""
    query = {"is_current": is_current}
    if year:
        query["year"] = year
    
    members = await db.committee_members.find(query, {"_id": 0}).sort("display_order", 1).to_list(100)
    return members

# Events
@router.get("/events", response_model=List[Event])
async def get_events(status: Optional[str] = None, event_type: Optional[str] = None, limit: int = 10):
    """Get events"""
    query = {}
    if status:
        query["status"] = status
    if event_type:
        query["event_type"] = event_type
    
    events = await db.events.find(query, {"_id": 0}).sort("start_date", -1).limit(limit).to_list(limit)
    return events

@router.get("/events/{event_id}", response_model=Event)
async def get_event_by_id(event_id: str):
    """Get event by ID"""
    event = await db.events.find_one({"id": event_id}, {"_id": 0})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

# News
@router.get("/news", response_model=List[News])
async def get_news(limit: int = 10, category: Optional[str] = None):
    """Get news articles"""
    query = {"is_published": True}
    if category:
        query["category"] = category
    
    news = await db.news.find(query, {"_id": 0}).sort("published_date", -1).limit(limit).to_list(limit)
    return news

@router.get("/news/{news_id}", response_model=News)
async def get_news_by_id(news_id: str):
    """Get news by ID"""
    news = await db.news.find_one({"id": news_id, "is_published": True}, {"_id": 0})
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    return news

# Gallery
@router.get("/gallery", response_model=List[GalleryImage])
async def get_gallery_images(category: Optional[str] = None, limit: int = 50):
    """Get gallery images"""
    query = {}
    if category:
        query["category"] = category
    
    images = await db.gallery.find(query, {"_id": 0}).sort("upload_date", -1).limit(limit).to_list(limit)
    return images

# Publications
@router.get("/publications", response_model=List[Publication])
async def get_publications(publication_type: Optional[str] = None, limit: int = 20):
    """Get publications"""
    query = {}
    if publication_type:
        query["publication_type"] = publication_type
    
    publications = await db.publications.find(query, {"_id": 0}).sort("published_date", -1).limit(limit).to_list(limit)
    return publications

# Members Directory
@router.get("/members", response_model=List[Member])
async def get_members(state: Optional[str] = None, city: Optional[str] = None):
    """Get members directory (public view - limited info)"""
    query = {"status": "active"}
    if state:
        query["state"] = state
    if city:
        query["city"] = city
    
    # Return limited public information
    members = await db.members.find(
        query,
        {
            "_id": 0,
            "id": 1,
            "full_name": 1,
            "qualification": 1,
            "specialization": 1,
            "city": 1,
            "state": 1,
            "hospital": 1
        }
    ).sort("full_name", 1).to_list(1000)
    return members

# States and Districts
@router.get("/states", response_model=List[State])
async def get_states():
    """Get all states"""
    states = await db.states.find({}, {"_id": 0}).sort("name", 1).to_list(100)
    return states

@router.get("/districts/{state_id}", response_model=List[District])
async def get_districts_by_state(state_id: str):
    """Get districts by state ID"""
    districts = await db.districts.find({"state_id": state_id}, {"_id": 0}).sort("name", 1).to_list(1000)
    return districts

# SEO Data
@router.get("/seo/{page_name}")
async def get_page_seo(page_name: str):
    """Get SEO data for a page"""
    seo = await db.page_seo.find_one({"page_name": page_name}, {"_id": 0})
    if not seo:
        return {
            "title": "Shoulder & Elbow Society of India",
            "description": "Official website of SESI",
            "keywords": "SESI, shoulder, elbow, orthopaedic"
        }
    return seo

# Statistics
@router.get("/statistics")
async def get_statistics():
    """Get website statistics"""
    total_members = await db.members.count_documents({"status": "active"})
    total_events = await db.events.count_documents({})
    upcoming_events = await db.events.count_documents({"status": "upcoming"})
    total_publications = await db.publications.count_documents({})
    
    return {
        "total_members": total_members,
        "total_events": total_events,
        "upcoming_events": upcoming_events,
        "total_publications": total_publications,
        "cme_credits": "1,000+",
        "endorsed_legislation": 39
    }
