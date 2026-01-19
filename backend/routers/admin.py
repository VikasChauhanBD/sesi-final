from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from motor.motor_asyncio import AsyncIOMotorClient
import os
from typing import List, Optional
from datetime import datetime
import uuid
from models.models import (
    Member, MemberCreate,
    CommitteeMember, CommitteeMemberCreate,
    Event, EventCreate,
    News, NewsCreate,
    GalleryImage, GalleryImageCreate,
    Publication, PublicationCreate,
    PageSEO, PageSEOCreate
)
from routers.auth import get_current_user
from utils.file_upload import save_upload_file, delete_file

router = APIRouter(prefix="/admin", tags=["Admin"], dependencies=[Depends(get_current_user)])

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sesi_database')]

# ==================== DASHBOARD ====================
@router.get("/dashboard/stats")
async def get_dashboard_stats():
    """Get dashboard statistics"""
    total_members = await db.members.count_documents({})
    active_members = await db.members.count_documents({"status": "active"})
    total_events = await db.events.count_documents({})
    upcoming_events = await db.events.count_documents({"status": "upcoming"})
    total_news = await db.news.count_documents({})
    pending_applications = await db.membership_applications.count_documents({"status": "submitted"})
    total_applications = await db.membership_applications.count_documents({})
    
    return {
        "total_members": total_members,
        "active_members": active_members,
        "total_events": total_events,
        "upcoming_events": upcoming_events,
        "total_news": total_news,
        "pending_applications": pending_applications,
        "total_applications": total_applications
    }

# ==================== MEMBERS MANAGEMENT ====================
@router.get("/members", response_model=List[Member])
async def get_all_members():
    """Get all members"""
    members = await db.members.find({}, {"_id": 0}).sort("full_name", 1).to_list(1000)
    return members

@router.post("/members", response_model=Member)
async def create_member(member: MemberCreate):
    """Create new member"""
    member_dict = member.model_dump()
    member_obj = Member(**member_dict)
    doc = member_obj.model_dump()
    await db.members.insert_one(doc)
    return member_obj

@router.put("/members/{member_id}", response_model=Member)
async def update_member(member_id: str, member_update: MemberCreate):
    """Update member"""
    existing = await db.members.find_one({"id": member_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Member not found")
    
    update_data = member_update.model_dump()
    await db.members.update_one({"id": member_id}, {"$set": update_data})
    
    updated = await db.members.find_one({"id": member_id}, {"_id": 0})
    return Member(**updated)

@router.delete("/members/{member_id}")
async def delete_member(member_id: str):
    """Delete member"""
    result = await db.members.delete_one({"id": member_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Member not found")
    return {"success": True, "message": "Member deleted"}

# ==================== COMMITTEE MANAGEMENT ====================
@router.get("/committee", response_model=List[CommitteeMember])
async def get_all_committee_members():
    """Get all committee members"""
    members = await db.committee_members.find({}, {"_id": 0}).sort("display_order", 1).to_list(100)
    return members

@router.post("/committee", response_model=CommitteeMember)
async def create_committee_member(member: CommitteeMemberCreate):
    """Create committee member"""
    member_dict = member.model_dump()
    member_obj = CommitteeMember(**member_dict)
    doc = member_obj.model_dump()
    await db.committee_members.insert_one(doc)
    return member_obj

@router.put("/committee/{member_id}", response_model=CommitteeMember)
async def update_committee_member(member_id: str, member_update: CommitteeMemberCreate):
    """Update committee member"""
    existing = await db.committee_members.find_one({"id": member_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Committee member not found")
    
    update_data = member_update.model_dump()
    await db.committee_members.update_one({"id": member_id}, {"$set": update_data})
    
    updated = await db.committee_members.find_one({"id": member_id}, {"_id": 0})
    return CommitteeMember(**updated)

@router.delete("/committee/{member_id}")
async def delete_committee_member(member_id: str):
    """Delete committee member"""
    result = await db.committee_members.delete_one({"id": member_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Committee member not found")
    return {"success": True, "message": "Committee member deleted"}

# ==================== EVENTS MANAGEMENT ====================
@router.get("/events", response_model=List[Event])
async def get_all_events():
    """Get all events"""
    events = await db.events.find({}, {"_id": 0}).sort("start_date", -1).to_list(1000)
    return events

@router.post("/events", response_model=Event)
async def create_event(event: EventCreate):
    """Create event"""
    event_dict = event.model_dump()
    event_obj = Event(**event_dict)
    doc = event_obj.model_dump()
    # Convert datetime to ISO string for MongoDB
    doc['start_date'] = doc['start_date'].isoformat()
    if doc.get('end_date'):
        doc['end_date'] = doc['end_date'].isoformat()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.events.insert_one(doc)
    return event_obj

@router.put("/events/{event_id}", response_model=Event)
async def update_event(event_id: str, event_update: EventCreate):
    """Update event"""
    existing = await db.events.find_one({"id": event_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Event not found")
    
    update_data = event_update.model_dump()
    # Convert datetime to ISO string
    update_data['start_date'] = update_data['start_date'].isoformat()
    if update_data.get('end_date'):
        update_data['end_date'] = update_data['end_date'].isoformat()
    
    await db.events.update_one({"id": event_id}, {"$set": update_data})
    
    updated = await db.events.find_one({"id": event_id}, {"_id": 0})
    # Convert ISO strings back to datetime for response
    if isinstance(updated['start_date'], str):
        updated['start_date'] = datetime.fromisoformat(updated['start_date'])
    if updated.get('end_date') and isinstance(updated['end_date'], str):
        updated['end_date'] = datetime.fromisoformat(updated['end_date'])
    if isinstance(updated['created_at'], str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    
    return Event(**updated)

@router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    """Delete event"""
    result = await db.events.delete_one({"id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"success": True, "message": "Event deleted"}

# ==================== NEWS MANAGEMENT ====================
@router.get("/news", response_model=List[News])
async def get_all_news():
    """Get all news"""
    news = await db.news.find({}, {"_id": 0}).sort("published_date", -1).to_list(1000)
    return news

@router.post("/news", response_model=News)
async def create_news(news_item: NewsCreate):
    """Create news"""
    news_dict = news_item.model_dump()
    news_obj = News(**news_dict)
    doc = news_obj.model_dump()
    doc['published_date'] = doc['published_date'].isoformat()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.news.insert_one(doc)
    return news_obj

@router.put("/news/{news_id}", response_model=News)
async def update_news(news_id: str, news_update: NewsCreate):
    """Update news"""
    existing = await db.news.find_one({"id": news_id})
    if not existing:
        raise HTTPException(status_code=404, detail="News not found")
    
    update_data = news_update.model_dump()
    await db.news.update_one({"id": news_id}, {"$set": update_data})
    
    updated = await db.news.find_one({"id": news_id}, {"_id": 0})
    if isinstance(updated['published_date'], str):
        updated['published_date'] = datetime.fromisoformat(updated['published_date'])
    if isinstance(updated['created_at'], str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    
    return News(**updated)

@router.delete("/news/{news_id}")
async def delete_news(news_id: str):
    """Delete news"""
    result = await db.news.delete_one({"id": news_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="News not found")
    return {"success": True, "message": "News deleted"}

# ==================== GALLERY MANAGEMENT ====================
@router.get("/gallery", response_model=List[GalleryImage])
async def get_all_gallery():
    """Get all gallery images"""
    images = await db.gallery.find({}, {"_id": 0}).sort("upload_date", -1).to_list(1000)
    return images

@router.post("/gallery/upload")
async def upload_gallery_image(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    image: UploadFile = File(...)
):
    """Upload gallery image"""
    # Save image file
    image_path = await save_upload_file(image, "gallery")
    
    # Create gallery entry
    gallery_obj = GalleryImage(
        title=title,
        description=description,
        image_url=image_path,
        category=category
    )
    doc = gallery_obj.model_dump()
    doc['upload_date'] = doc['upload_date'].isoformat()
    await db.gallery.insert_one(doc)
    
    return gallery_obj

@router.delete("/gallery/{image_id}")
async def delete_gallery_image(image_id: str):
    """Delete gallery image"""
    image = await db.gallery.find_one({"id": image_id})
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Delete file
    delete_file(image['image_url'])
    
    # Delete from database
    await db.gallery.delete_one({"id": image_id})
    return {"success": True, "message": "Image deleted"}

# ==================== PUBLICATIONS MANAGEMENT ====================
@router.get("/publications", response_model=List[Publication])
async def get_all_publications():
    """Get all publications"""
    pubs = await db.publications.find({}, {"_id": 0}).sort("published_date", -1).to_list(1000)
    return pubs

@router.post("/publications", response_model=Publication)
async def create_publication(publication: PublicationCreate):
    """Create publication"""
    pub_dict = publication.model_dump()
    pub_obj = Publication(**pub_dict)
    doc = pub_obj.model_dump()
    doc['published_date'] = doc['published_date'].isoformat()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.publications.insert_one(doc)
    return pub_obj

@router.delete("/publications/{pub_id}")
async def delete_publication(pub_id: str):
    """Delete publication"""
    result = await db.publications.delete_one({"id": pub_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Publication not found")
    return {"success": True, "message": "Publication deleted"}

# ==================== MEMBERSHIP APPLICATIONS ====================
@router.get("/applications")
async def get_all_applications(status: Optional[str] = None):
    """Get all membership applications"""
    query = {}
    if status:
        query["status"] = status
    
    applications = await db.membership_applications.find(query, {"_id": 0}).sort("submitted_at", -1).to_list(1000)
    return applications

@router.get("/applications/{application_id}")
async def get_application_detail(application_id: str):
    """Get application detail"""
    application = await db.membership_applications.find_one({"id": application_id}, {"_id": 0})
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    return application

@router.put("/applications/{application_id}/status")
async def update_application_status(
    application_id: str,
    status: str,
    admin_notes: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    """Update application status"""
    if status not in ["submitted", "under_review", "approved", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    update_data = {
        "status": status,
        "reviewed_at": datetime.utcnow().isoformat(),
        "reviewed_by": current_user.get("email")
    }
    
    if admin_notes:
        update_data["admin_notes"] = admin_notes
    
    result = await db.membership_applications.update_one(
        {"id": application_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    
    return {"success": True, "message": f"Application status updated to {status}"}

# ==================== SEO MANAGEMENT ====================
@router.get("/seo")
async def get_all_seo():
    """Get all SEO data"""
    seo_data = await db.page_seo.find({}, {"_id": 0}).to_list(100)
    return seo_data

@router.post("/seo", response_model=PageSEO)
async def create_or_update_seo(seo_data: PageSEOCreate):
    """Create or update SEO data for a page"""
    # Check if exists
    existing = await db.page_seo.find_one({"page_name": seo_data.page_name})
    
    seo_dict = seo_data.model_dump()
    
    if existing:
        # Update
        await db.page_seo.update_one(
            {"page_name": seo_data.page_name},
            {"$set": seo_dict}
        )
        updated = await db.page_seo.find_one({"page_name": seo_data.page_name}, {"_id": 0})
        if isinstance(updated['updated_at'], str):
            updated['updated_at'] = datetime.fromisoformat(updated['updated_at'])
        return PageSEO(**updated)
    else:
        # Create
        seo_obj = PageSEO(**seo_dict)
        doc = seo_obj.model_dump()
        doc['updated_at'] = doc['updated_at'].isoformat()
        await db.page_seo.insert_one(doc)
        return seo_obj

# ==================== FILE UPLOAD ====================
@router.post("/upload")
async def upload_file(file: UploadFile = File(...), subfolder: str = "general"):
    """Upload a file"""
    file_path = await save_upload_file(file, subfolder)
    return {"success": True, "file_path": file_path}
