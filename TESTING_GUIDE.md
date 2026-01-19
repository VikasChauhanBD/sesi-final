# 🧪 SESI Backend API Testing Guide

## ✅ What We've Built So Far

### Phase 1 & 2: Backend Complete ✅
- ✅ Authentication System (JWT)
- ✅ All Public APIs (Events, News, Members, Committee, Gallery, Publications)
- ✅ Membership Registration API with File Uploads
- ✅ Admin CRUD APIs for all entities
- ✅ State → District Dependent Dropdown
- ✅ Database seeded with 36 states and 744 districts

---

## 🎯 How to Test

### Method 1: Automated Test Script (Easiest)

Run the test script:
```bash
cd /app/backend
./test_api.sh
```

This will test:
- ✅ Health Check
- ✅ Get All States
- ✅ Get Districts by State
- ✅ Committee Members
- ✅ Statistics
- ✅ Admin Login
- ✅ Protected Admin Routes

---

### Method 2: Interactive HTML Form (Best for Registration Testing)

1. **Open the test form in browser:**
   - File location: `/app/backend/test_form.html`
   - Or create a simple HTTP server:
   ```bash
   cd /app/backend
   python3 -m http.server 8080
   ```
   - Then open: `http://localhost:8080/test_form.html`

2. **Test the Registration Form:**
   - Fill in all required fields
   - Select a state → Districts will load automatically
   - Upload sample documents
   - Click Submit
   - Check console logs for email notifications

---

### Method 3: Manual API Testing with curl

#### 1. Test Health Check
```bash
curl http://localhost:8001/api/health
```

#### 2. Get All States
```bash
curl http://localhost:8001/api/public/states | python3 -m json.tool
```

#### 3. Get Districts by State (Karnataka example)
```bash
# First get Karnataka's ID
STATE_ID=$(curl -s http://localhost:8001/api/public/states | python3 -c "import sys, json; data = json.load(sys.stdin); print([s['id'] for s in data if s['name']=='Karnataka'][0])")

# Then get districts
curl "http://localhost:8001/api/public/districts/$STATE_ID" | python3 -m json.tool
```

#### 4. Test Admin Login
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@sesi.co.in",
    "password": "Admin@SESI2025"
  }' | python3 -m json.tool
```

#### 5. Test Protected Admin Route
```bash
# First login and get token
TOKEN=$(curl -s -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@sesi.co.in", "password": "Admin@SESI2025"}' \
  | python3 -c "import sys, json; print(json.load(sys.stdin)['access_token'])")

# Then access protected route
curl http://localhost:8001/api/admin/dashboard/stats \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
```

#### 6. Test Membership Application (with FormData)
```bash
curl -X POST http://localhost:8001/api/membership/apply \
  -F "region_membership=National" \
  -F "membership_type=Life Member" \
  -F "title=Dr." \
  -F "first_name=John" \
  -F "middle_name=Kumar" \
  -F "last_name=Sharma" \
  -F "mobile=9876543210" \
  -F "email=john.sharma@example.com" \
  -F "gender=Male" \
  -F "medical_council_reg_no=MCI12345" \
  -F "qualification=MBBS, MS Ortho" \
  -F "current_appointments=Consultant Orthopedic Surgeon" \
  -F "specialised_practice=Shoulder and Elbow Surgery" \
  -F "years_experience=10" \
  -F "proposal_name_1=Dr. Ramesh Kumar" \
  -F "proposal_name_2=Dr. Suresh Patel" \
  -F "comm_address=123 Main Street, Bangalore" \
  -F "comm_state_id=<STATE_ID>" \
  -F "comm_district_id=<DISTRICT_ID>" \
  -F "comm_pincode=560001" \
  -F "work_address=456 Hospital Road, Bangalore" \
  -F "work_state_id=<STATE_ID>" \
  -F "work_district_id=<DISTRICT_ID>" \
  -F "work_pincode=560002" \
  -F "work_hospital=Apollo Hospital" \
  -F "mbbs_certificate=@/path/to/mbbs.pdf" \
  -F "orthopedic_certificate=@/path/to/ortho.pdf" \
  -F "state_registration_certificate=@/path/to/state_reg.pdf"
```

---

## 📝 Available API Endpoints

### Public APIs (No Authentication Required)
- `GET /api/health` - Health check
- `GET /api/public/states` - Get all states
- `GET /api/public/districts/{state_id}` - Get districts by state
- `GET /api/public/committee` - Get committee members
- `GET /api/public/events` - Get events
- `GET /api/public/news` - Get news
- `GET /api/public/gallery` - Get gallery images
- `GET /api/public/publications` - Get publications
- `GET /api/public/members` - Get members directory
- `GET /api/public/statistics` - Get website statistics
- `GET /api/public/seo/{page_name}` - Get SEO data for a page
- `POST /api/membership/apply` - Submit membership application

### Authentication APIs
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token

### Admin APIs (Authentication Required)
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/members` - Get all members
- `POST /api/admin/members` - Create member
- `PUT /api/admin/members/{id}` - Update member
- `DELETE /api/admin/members/{id}` - Delete member
- `GET /api/admin/committee` - Get committee members
- `POST /api/admin/committee` - Create committee member
- `PUT /api/admin/committee/{id}` - Update committee member
- `DELETE /api/admin/committee/{id}` - Delete committee member
- `GET /api/admin/events` - Get all events
- `POST /api/admin/events` - Create event
- `PUT /api/admin/events/{id}` - Update event
- `DELETE /api/admin/events/{id}` - Delete event
- `GET /api/admin/news` - Get all news
- `POST /api/admin/news` - Create news
- `PUT /api/admin/news/{id}` - Update news
- `DELETE /api/admin/news/{id}` - Delete news
- `GET /api/admin/gallery` - Get gallery images
- `POST /api/admin/gallery/upload` - Upload gallery image
- `DELETE /api/admin/gallery/{id}` - Delete gallery image
- `GET /api/admin/applications` - Get membership applications
- `GET /api/admin/applications/{id}` - Get application detail
- `PUT /api/admin/applications/{id}/status` - Update application status

---

## 🔑 Admin Credentials

```
Email: admin@sesi.co.in
Password: Admin@SESI2025
```

⚠️ **Important:** Change this password in production!

---

## 📊 Database Status

### Collections Created:
- ✅ **states** - 36 states (all Indian states + UTs)
- ✅ **districts** - 744 districts
- ✅ **users** - 1 admin user
- ✅ **committee_members** - 3 sample members
- ✅ **page_seo** - 3 SEO pages
- ✅ **events** - (empty, ready for admin to add)
- ✅ **news** - (empty, ready for admin to add)
- ✅ **members** - (empty, ready for admin to add)
- ✅ **membership_applications** - (empty, will populate on form submission)
- ✅ **gallery** - (empty, ready for admin to add)
- ✅ **publications** - (empty, ready for admin to add)

---

## 🎯 Next Steps

### ✅ Completed:
- Backend API development
- Database seeding
- Authentication system
- File upload system
- State → District dropdown API

### 🔄 In Progress:
- Frontend development (React)

### 📋 Pending:
- Admin panel UI
- Public pages UI
- Testing & bug fixes
- SEO optimization

---

## 🐛 Troubleshooting

### Backend not responding?
```bash
sudo supervisorctl status backend
sudo supervisorctl restart backend
tail -f /var/log/supervisor/backend.err.log
```

### Database issues?
```bash
mongosh sesi_database --eval "db.states.countDocuments({})"
```

### Re-seed database?
```bash
cd /app/backend
python seed_database.py
```

---

## 📞 Support

If you encounter any issues:
1. Check backend logs: `tail -f /var/log/supervisor/backend.err.log`
2. Verify MongoDB is running: `sudo supervisorctl status mongodb`
3. Test API health: `curl http://localhost:8001/api/health`

---

**Status:** Backend Phase Complete ✅ | Ready for Frontend Development 🚀
