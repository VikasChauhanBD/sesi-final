"""
Seed script to populate database with initial data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import sys
import uuid

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from seed_data.indian_states_districts import INDIAN_STATES_DISTRICTS
from utils.auth import get_password_hash

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_database():
    # Connect to MongoDB
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'sesi_database')]
    
    print("🌱 Starting database seeding...")
    
    # 1. Seed States and Districts
    print("\\n📍 Seeding Indian States and Districts...")
    states_collection = db.states
    districts_collection = db.districts
    
    # Clear existing data
    await states_collection.delete_many({})
    await districts_collection.delete_many({})
    
    for state_name, districts in INDIAN_STATES_DISTRICTS.items():
        # Create state
        state_id = str(uuid.uuid4())
        state_code = state_name.lower().replace(" ", "_").replace("and", "").replace("&", "")
        
        await states_collection.insert_one({
            "id": state_id,
            "name": state_name,
            "code": state_code
        })
        
        # Create districts for this state
        for district_name in districts:
            await districts_collection.insert_one({
                "id": str(uuid.uuid4()),
                "name": district_name,
                "state_id": state_id
            })
    
    total_states = await states_collection.count_documents({})
    total_districts = await districts_collection.count_documents({})
    print(f"✅ Seeded {total_states} states and {total_districts} districts")
    
    # 2. Create Default Admin User
    print("\\n👤 Creating default admin user...")
    users_collection = db.users
    
    # Check if admin exists
    existing_admin = await users_collection.find_one({"email": "admin@sesi.co.in"})
    
    if not existing_admin:
        admin_password = "Admin@SESI2025"  # Change this in production
        admin_user = {
            "id": str(uuid.uuid4()),
            "email": "admin@sesi.co.in",
            "password_hash": get_password_hash(admin_password),
            "role": "admin",
            "full_name": "SESI Admin",
            "is_active": True
        }
        await users_collection.insert_one(admin_user)
        print(f"✅ Admin user created:")
        print(f"   Email: admin@sesi.co.in")
        print(f"   Password: {admin_password}")
        print(f"   ⚠️  Please change the password after first login!")
    else:
        print("✅ Admin user already exists")
    
    # 3. Seed Sample Committee Members
    print("\\n👥 Seeding sample committee members...")
    committee_collection = db.committee_members
    
    # Clear existing
    await committee_collection.delete_many({})
    
    sample_committee = [
        {
            "id": str(uuid.uuid4()),
            "full_name": "Dr. Ramankant Aggarwal",
            "designation": "President",
            "year": 2025,
            "display_order": 1,
            "is_current": True
        },
        {
            "id": str(uuid.uuid4()),
            "full_name": "Dr. Ayyapan Nair",
            "designation": "Secretary",
            "year": 2025,
            "display_order": 2,
            "is_current": True
        },
        {
            "id": str(uuid.uuid4()),
            "full_name": "Dr. Vinay Pandey",
            "designation": "Finance Secretary",
            "year": 2025,
            "display_order": 3,
            "is_current": True
        },
    ]
    
    await committee_collection.insert_many(sample_committee)
    print(f"✅ Seeded {len(sample_committee)} committee members")
    
    # 4. Seed Sample SEO Data
    print("\\n🔍 Seeding SEO data...")
    seo_collection = db.page_seo
    
    await seo_collection.delete_many({})
    
    seo_pages = [
        {
            "id": str(uuid.uuid4()),
            "page_name": "home",
            "title": "Shoulder & Elbow Society of India (SESI) | Leading Orthopaedic Society",
            "description": "Official website of the Shoulder & Elbow Society of India (SESI). Join 480+ active members, access CME credits, events, publications, and advance shoulder & elbow surgery in India.",
            "keywords": "SESI, Shoulder Elbow Society India, orthopaedic society, shoulder surgery, elbow surgery, medical education, CME"
        },
        {
            "id": str(uuid.uuid4()),
            "page_name": "membership",
            "title": "SESI Membership | Join Shoulder & Elbow Society of India",
            "description": "Apply for SESI membership. Join India's premier shoulder & elbow surgery society. Benefits include CME credits, conference access, publications, and networking opportunities.",
            "keywords": "SESI membership, join SESI, orthopaedic society membership, medical society India"
        },
        {
            "id": str(uuid.uuid4()),
            "page_name": "events",
            "title": "SESI Events & Conferences | Upcoming Medical Events",
            "description": "Attend SESI conferences, workshops, and CME programs. Stay updated on upcoming events, annual meetings, and continuing medical education opportunities.",
            "keywords": "SESI events, orthopaedic conferences, medical workshops, CME programs, SESICON"
        }
    ]
    
    await seo_collection.insert_many(seo_pages)
    print(f"✅ Seeded SEO data for {len(seo_pages)} pages")
    
    print("\\n✅ Database seeding completed successfully!")
    print("\\n" + "="*60)
    print("ADMIN LOGIN CREDENTIALS:")
    print("="*60)
    print("Email: admin@sesi.co.in")
    print("Password: Admin@SESI2025")
    print("="*60)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
