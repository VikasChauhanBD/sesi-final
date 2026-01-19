from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from motor.motor_asyncio import AsyncIOMotorClient
import os
from typing import List, Optional
from models.models import MembershipApplication, MembershipApplicationCreate
from utils.email import send_membership_application_email
from utils.file_upload import save_upload_file
from datetime import datetime
import uuid

router = APIRouter(prefix="/membership", tags=["Membership"])

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sesi_database')]

@router.post("/apply")
async def submit_membership_application(
    region_membership: str = Form(...),
    membership_type: str = Form(...),
    title: str = Form(...),
    first_name: str = Form(...),
    middle_name: Optional[str] = Form(None),
    last_name: str = Form(...),
    mobile: str = Form(...),
    email: str = Form(...),
    gender: str = Form(...),
    medical_council_reg_no: str = Form(...),
    qualification: str = Form(...),
    current_appointments: str = Form(...),
    specialised_practice: str = Form(...),
    years_experience: int = Form(...),
    proposal_name_1: str = Form(...),
    proposal_name_2: str = Form(...),
    comm_address: str = Form(...),
    comm_state_id: str = Form(...),
    comm_district_id: str = Form(...),
    comm_pincode: str = Form(...),
    work_address: str = Form(...),
    work_state_id: str = Form(...),
    work_district_id: str = Form(...),
    work_pincode: str = Form(...),
    work_hospital: Optional[str] = Form(None),
    # File uploads
    aadhar: Optional[UploadFile] = File(None),
    mbbs_certificate: UploadFile = File(...),
    orthopedic_certificate: UploadFile = File(...),
    specialisation_certificate: Optional[UploadFile] = File(None),
    state_registration_certificate: UploadFile = File(...),
):
    """Submit membership application with file uploads"""
    
    try:
        # Generate application ID
        application_id = str(uuid.uuid4())
        
        # Create full name
        full_name = f"{title} {first_name}"
        if middle_name:
            full_name += f" {middle_name}"
        full_name += f" {last_name}"
        
        # Save uploaded files
        documents = []
        
        # Save required documents
        if mbbs_certificate.filename:
            mbbs_path = await save_upload_file(mbbs_certificate, f"membership_applications/{application_id}")
            documents.append({"type": "mbbs_certificate", "path": mbbs_path})
        
        if orthopedic_certificate.filename:
            ortho_path = await save_upload_file(orthopedic_certificate, f"membership_applications/{application_id}")
            documents.append({"type": "orthopedic_certificate", "path": ortho_path})
        
        if state_registration_certificate.filename:
            state_reg_path = await save_upload_file(state_registration_certificate, f"membership_applications/{application_id}")
            documents.append({"type": "state_registration_certificate", "path": state_reg_path})
        
        # Save optional documents
        if aadhar and aadhar.filename:
            aadhar_path = await save_upload_file(aadhar, f"membership_applications/{application_id}")
            documents.append({"type": "aadhar", "path": aadhar_path})
        
        if specialisation_certificate and specialisation_certificate.filename:
            spec_path = await save_upload_file(specialisation_certificate, f"membership_applications/{application_id}")
            documents.append({"type": "specialisation_certificate", "path": spec_path})
        
        # Get state and district names for reference
        state_comm = await db.states.find_one({"id": comm_state_id}, {"_id": 0})
        district_comm = await db.districts.find_one({"id": comm_district_id}, {"_id": 0})
        state_work = await db.states.find_one({"id": work_state_id}, {"_id": 0})
        district_work = await db.districts.find_one({"id": work_district_id}, {"_id": 0})
        
        # Create application document
        application = {
            "id": application_id,
            "region_membership": region_membership,
            "membership_type": membership_type,
            "title": title,
            "first_name": first_name,
            "middle_name": middle_name,
            "last_name": last_name,
            "full_name": full_name,
            "mobile": mobile,
            "email": email,
            "gender": gender,
            "medical_council_reg_no": medical_council_reg_no,
            "qualification": qualification,
            "current_appointments": current_appointments,
            "specialised_practice": specialised_practice,
            "years_experience": years_experience,
            "proposal_name_1": proposal_name_1,
            "proposal_name_2": proposal_name_2,
            "comm_address": comm_address,
            "comm_country": "India",
            "comm_state_id": comm_state_id,
            "comm_state_name": state_comm.get("name") if state_comm else "",
            "comm_district_id": comm_district_id,
            "comm_district_name": district_comm.get("name") if district_comm else "",
            "comm_pincode": comm_pincode,
            "work_address": work_address,
            "work_country": "India",
            "work_state_id": work_state_id,
            "work_state_name": state_work.get("name") if state_work else "",
            "work_district_id": work_district_id,
            "work_district_name": district_work.get("name") if district_work else "",
            "work_pincode": work_pincode,
            "work_hospital": work_hospital,
            "documents": documents,
            "status": "submitted",
            "submitted_at": datetime.utcnow().isoformat(),
            "admin_notes": None,
            "reviewed_at": None,
            "reviewed_by": None
        }
        
        # Save to database
        await db.membership_applications.insert_one(application)
        
        # Send email notifications
        send_membership_application_email(application)
        
        return {
            "success": True,
            "message": "Application submitted successfully",
            "application_id": application_id,
            "email": email
        }
        
    except Exception as e:
        print(f"Error submitting application: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error submitting application: {str(e)}")

@router.get("/applications/{application_id}")
async def get_application(application_id: str):
    """Get application by ID (public view for applicant)"""
    application = await db.membership_applications.find_one(
        {"id": application_id},
        {"_id": 0}
    )
    
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Return limited info for public view
    return {
        "id": application["id"],
        "full_name": application["full_name"],
        "email": application["email"],
        "status": application["status"],
        "submitted_at": application["submitted_at"]
    }
