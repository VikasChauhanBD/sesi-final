from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
from datetime import datetime
import uuid

# Base Models
class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: str
    role: str = "admin"  # admin, editor
    full_name: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str = "admin"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Member Models
class Member(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: EmailStr
    mobile: str
    qualification: str
    specialization: Optional[str] = None
    hospital: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    membership_type: str  # Life Member, Associate Member
    membership_number: Optional[str] = None
    joined_date: datetime = Field(default_factory=datetime.utcnow)
    status: str = "active"  # active, inactive
    profile_image: Optional[str] = None
    certificate_path: Optional[str] = None
    application_id: Optional[str] = None
    years_experience: Optional[int] = None
    medical_council_reg_no: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MemberCreate(BaseModel):
    full_name: str
    email: EmailStr
    mobile: str
    qualification: str
    specialization: Optional[str] = None
    hospital: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    membership_type: str
    membership_number: Optional[str] = None

# Committee Models
class CommitteeMember(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    designation: str  # President, Secretary, Treasurer, EC Member
    email: Optional[str] = None
    mobile: Optional[str] = None
    bio: Optional[str] = None
    profile_image: Optional[str] = None
    year: int  # Committee year
    display_order: int = 0
    is_current: bool = True
    slug: Optional[str] = None
    qualifications: Optional[str] = None
    hospital: Optional[str] = None
    city: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CommitteeMemberCreate(BaseModel):
    full_name: str
    designation: str
    email: Optional[str] = None
    mobile: Optional[str] = None
    bio: Optional[str] = None
    year: int
    display_order: int = 0
    is_current: bool = True
    slug: Optional[str] = None
    qualifications: Optional[str] = None
    hospital: Optional[str] = None
    city: Optional[str] = None

# Event Models
class Event(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    event_type: str  # Conference, Workshop, Course, Fellowship, CME
    start_date: datetime
    end_date: Optional[datetime] = None
    venue: Optional[str] = None
    city: Optional[str] = None
    registration_link: Optional[str] = None
    banner_image: Optional[str] = None
    status: str = "upcoming"  # upcoming, ongoing, completed
    created_at: datetime = Field(default_factory=datetime.utcnow)
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None

class EventCreate(BaseModel):
    title: str
    description: str
    event_type: str
    start_date: datetime
    end_date: Optional[datetime] = None
    venue: Optional[str] = None
    city: Optional[str] = None
    registration_link: Optional[str] = None
    status: str = "upcoming"

# News Models
class News(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    excerpt: Optional[str] = None
    image: Optional[str] = None
    published_date: datetime = Field(default_factory=datetime.utcnow)
    author: Optional[str] = None
    category: Optional[str] = None
    is_published: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None

class NewsCreate(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    category: Optional[str] = None
    is_published: bool = True

# Gallery Models
class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: Optional[str] = None
    image_url: str
    category: Optional[str] = None  # Event, Conference, Workshop
    event_id: Optional[str] = None
    upload_date: datetime = Field(default_factory=datetime.utcnow)
    display_order: int = 0

class GalleryImageCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    event_id: Optional[str] = None
    display_order: int = 0

# Publication Models
class Publication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: Optional[str] = None
    publication_type: str  # Journal, Newsletter, Research Paper
    authors: Optional[str] = None
    published_date: datetime
    file_url: Optional[str] = None
    external_link: Optional[str] = None
    cover_image: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class PublicationCreate(BaseModel):
    title: str
    description: Optional[str] = None
    publication_type: str
    authors: Optional[str] = None
    published_date: datetime
    external_link: Optional[str] = None

# State and District Models
class State(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    code: str

class District(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    state_id: str

# Membership Application Models
class MembershipApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    region_membership: str  # National, International
    membership_type: str  # Associate Member, Life Member
    title: str  # Mr., Mrs., Miss, Ms., Dr., Prof.
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    full_name: str
    mobile: str
    email: EmailStr
    gender: str  # Male, Female, Other
    medical_council_reg_no: str
    qualification: str
    current_appointments: str
    specialised_practice: str
    years_experience: int
    proposal_name_1: str
    proposal_name_2: str
    comm_address: str
    comm_country: str = "India"
    comm_state_id: str
    comm_district_id: str
    comm_pincode: str
    work_address: str
    work_country: str = "India"
    work_state_id: str
    work_district_id: str
    work_pincode: str
    work_hospital: Optional[str] = None
    documents: Optional[List[str]] = []  # List of document file paths
    status: str = "submitted"  # submitted, under_review, approved, rejected
    admin_notes: Optional[str] = None
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    reviewed_at: Optional[datetime] = None
    reviewed_by: Optional[str] = None

class MembershipApplicationCreate(BaseModel):
    region_membership: str
    membership_type: str
    title: str
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    mobile: str
    email: EmailStr
    gender: str
    medical_council_reg_no: str
    qualification: str
    current_appointments: str
    specialised_practice: str
    years_experience: int
    proposal_name_1: str
    proposal_name_2: str
    comm_address: str
    comm_state_id: str
    comm_district_id: str
    comm_pincode: str
    work_address: str
    work_state_id: str
    work_district_id: str
    work_pincode: str
    work_hospital: Optional[str] = None

# Page SEO Models
class PageSEO(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    page_name: str  # home, about, membership, etc.
    title: str
    description: str
    keywords: str
    og_title: Optional[str] = None
    og_description: Optional[str] = None
    og_image: Optional[str] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PageSEOCreate(BaseModel):
    page_name: str
    title: str
    description: str
    keywords: str
    og_title: Optional[str] = None
    og_description: Optional[str] = None
