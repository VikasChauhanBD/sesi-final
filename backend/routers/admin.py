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
    GalleryAlbum, GalleryAlbumCreate,
    Publication, PublicationCreate,
    PageSEO, PageSEOCreate
)
from routers.auth import get_current_user
from utils.file_upload import save_upload_file, delete_file
from utils.certificate import generate_membership_certificate, get_next_membership_number
from utils.email import send_approval_email_with_certificate
from pathlib import Path

router = APIRouter(prefix="/admin", tags=["Admin"], dependencies=[Depends(get_current_user)])

from database import db


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

# ==================== GALLERY ALBUM MANAGEMENT ====================
@router.get("/gallery/albums")
async def get_all_albums():
    """Get all gallery albums"""
    albums = await db.gallery_albums.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    # Add photo count to each album
    for album in albums:
        album['photo_count'] = await db.gallery.count_documents({"album_id": album['id']})
    return albums

@router.post("/gallery/albums")
async def create_album(album: GalleryAlbumCreate):
    """Create a new gallery album"""
    album_obj = GalleryAlbum(
        title=album.title,
        description=album.description,
        event_date=album.event_date,
        location=album.location,
        category=album.category
    )
    doc = album_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.gallery_albums.insert_one(doc)
    return album_obj

@router.put("/gallery/albums/{album_id}")
async def update_album(album_id: str, album: GalleryAlbumCreate):
    """Update an album"""
    update_data = album.model_dump(exclude_unset=True)
    result = await db.gallery_albums.update_one(
        {"id": album_id},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Album not found")
    return {"success": True, "message": "Album updated"}

@router.delete("/gallery/albums/{album_id}")
async def delete_album(album_id: str):
    """Delete an album and all its photos"""
    album = await db.gallery_albums.find_one({"id": album_id})
    if not album:
        raise HTTPException(status_code=404, detail="Album not found")
    
    # Delete all photos in the album
    photos = await db.gallery.find({"album_id": album_id}).to_list(1000)
    for photo in photos:
        if photo.get('image_url') and not photo['image_url'].startswith('http'):
            delete_file(photo['image_url'])
    await db.gallery.delete_many({"album_id": album_id})
    
    # Delete album cover if exists
    if album.get('cover_image') and not album['cover_image'].startswith('http'):
        delete_file(album['cover_image'])
    
    # Delete album
    await db.gallery_albums.delete_one({"id": album_id})
    return {"success": True, "message": "Album and all photos deleted"}

@router.get("/gallery/albums/{album_id}/photos")
async def get_album_photos(album_id: str):
    """Get all photos in an album"""
    photos = await db.gallery.find({"album_id": album_id}, {"_id": 0}).sort("display_order", 1).to_list(1000)
    return photos

@router.post("/gallery/albums/{album_id}/photos")
async def upload_album_photo(
    album_id: str,
    title: str = Form(""),
    description: Optional[str] = Form(None),
    image: UploadFile = File(...)
):
    """Upload a photo to an album"""
    # Verify album exists
    album = await db.gallery_albums.find_one({"id": album_id})
    if not album:
        raise HTTPException(status_code=404, detail="Album not found")
    
    # Save image file
    image_path = await save_upload_file(image, "gallery")
    
    # Get current photo count for display order
    photo_count = await db.gallery.count_documents({"album_id": album_id})
    
    # Create gallery entry
    gallery_obj = GalleryImage(
        title=title or album['title'],
        description=description,
        image_url=image_path,
        category=album.get('category'),
        album_id=album_id,
        display_order=photo_count
    )
    doc = gallery_obj.model_dump()
    doc['upload_date'] = doc['upload_date'].isoformat()
    await db.gallery.insert_one(doc)
    
    # Update album cover if it's the first photo
    if photo_count == 0:
        await db.gallery_albums.update_one(
            {"id": album_id},
            {"$set": {"cover_image": image_path}}
        )
    
    # Update photo count
    await db.gallery_albums.update_one(
        {"id": album_id},
        {"$set": {"photo_count": photo_count + 1}}
    )
    
    return gallery_obj

@router.post("/gallery/albums/{album_id}/photos/bulk")
async def upload_album_photos_bulk(
    album_id: str,
    images: List[UploadFile] = File(...)
):
    """Upload multiple photos to an album"""
    # Verify album exists
    album = await db.gallery_albums.find_one({"id": album_id})
    if not album:
        raise HTTPException(status_code=404, detail="Album not found")
    
    # Get current photo count for display order
    photo_count = await db.gallery.count_documents({"album_id": album_id})
    uploaded = []
    first_image_path = None
    
    for idx, image in enumerate(images):
        # Save image file
        image_path = await save_upload_file(image, "gallery")
        if idx == 0 and photo_count == 0:
            first_image_path = image_path
        
        # Create gallery entry
        gallery_obj = GalleryImage(
            title=album['title'],
            description=None,
            image_url=image_path,
            category=album.get('category'),
            album_id=album_id,
            display_order=photo_count + idx
        )
        doc = gallery_obj.model_dump()
        doc['upload_date'] = doc['upload_date'].isoformat()
        await db.gallery.insert_one(doc)
        uploaded.append(gallery_obj)
    
    # Update album cover if this was the first batch
    if first_image_path:
        await db.gallery_albums.update_one(
            {"id": album_id},
            {"$set": {"cover_image": first_image_path}}
        )
    
    # Update photo count
    await db.gallery_albums.update_one(
        {"id": album_id},
        {"$set": {"photo_count": photo_count + len(images)}}
    )
    
    return {"success": True, "uploaded_count": len(uploaded)}

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
    """Update application status and generate certificate if approved"""
    if status not in ["submitted", "under_review", "approved", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    # Get the application first
    application = await db.membership_applications.find_one({"id": application_id})
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    update_data = {
        "status": status,
        "reviewed_at": datetime.utcnow().isoformat(),
        "reviewed_by": current_user.get("email")
    }
    
    if admin_notes:
        update_data["admin_notes"] = admin_notes
    
    # If approved, generate membership number and certificate
    if status == "approved" and application.get("status") != "approved":
        # Generate unique membership number
        membership_number = await get_next_membership_number()
        update_data["membership_number"] = membership_number
        update_data["approved_date"] = datetime.utcnow().isoformat()
        
        # Update application with membership number first
        await db.membership_applications.update_one(
            {"id": application_id},
            {"$set": update_data}
        )
        
        # Get updated application
        updated_app = await db.membership_applications.find_one({"id": application_id}, {"_id": 0})
        
        # Generate certificate
        certificate_data = {
            "full_name": updated_app.get("full_name"),
            "qualification": updated_app.get("qualification"),
            "work_hospital": updated_app.get("work_hospital"),
            "membership_type": updated_app.get("membership_type"),
            "membership_number": membership_number,
            "approved_date": datetime.fromisoformat(update_data["approved_date"]).strftime('%B %d, %Y')
        }
        
        certificate_buffer = generate_membership_certificate(certificate_data)
        
        # Save certificate to file system
        cert_folder = Path("/app/backend/uploads/certificates")
        cert_folder.mkdir(exist_ok=True, parents=True)
        cert_filename = f"SESI_Certificate_{membership_number}.pdf"
        cert_path = cert_folder / cert_filename
        
        with open(cert_path, "wb") as f:
            f.write(certificate_buffer.getvalue())
        
        # Update application with certificate path
        certificate_url = f"/uploads/certificates/{cert_filename}"
        await db.membership_applications.update_one(
            {"id": application_id},
            {"$set": {"certificate_path": certificate_url}}
        )
        
        # Create member profile automatically
        member_id = str(uuid.uuid4())
        member_data = {
            "id": member_id,
            "full_name": updated_app.get("full_name"),
            "email": updated_app.get("email"),
            "mobile": updated_app.get("mobile"),
            "qualification": updated_app.get("qualification"),
            "specialization": updated_app.get("specialised_practice"),
            "hospital": updated_app.get("work_hospital"),
            "city": updated_app.get("work_district_name"),
            "state": updated_app.get("work_state_name"),
            "membership_type": updated_app.get("membership_type"),
            "membership_number": membership_number,
            "joined_date": datetime.utcnow().isoformat(),
            "status": "active",
            "certificate_path": certificate_url,
            "application_id": application_id,
            "years_experience": updated_app.get("years_experience"),
            "medical_council_reg_no": updated_app.get("medical_council_reg_no"),
            "created_at": datetime.utcnow().isoformat()
        }
        
        # Insert member into members collection
        await db.members.insert_one(member_data)
        
        # Send approval email with certificate
        certificate_buffer.seek(0)
        send_approval_email_with_certificate(updated_app, certificate_buffer, certificate_url)
        
        return {
            "success": True,
            "message": f"Application approved! Membership number {membership_number} generated. Member profile created.",
            "membership_number": membership_number,
            "certificate_path": certificate_url,
            "member_id": member_id
        }
    else:
        # For other status updates
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
