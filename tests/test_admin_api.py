"""
Backend API Tests for SESI Admin Panel
Tests: Authentication, Members, Committee, Events, News, Gallery, Dashboard
"""
import pytest
import requests
import os
from datetime import datetime, timedelta

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://sesi-medical.preview.emergentagent.com').rstrip('/')

# Test credentials
ADMIN_EMAIL = "admin@sesi.co.in"
ADMIN_PASSWORD = "Admin@SESI2025"


class TestAuthentication:
    """Authentication endpoint tests"""
    
    def test_login_success(self):
        """Test successful admin login"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "user" in data
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["role"] == "admin"
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "wrong@example.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 401


@pytest.fixture(scope="module")
def auth_token():
    """Get authentication token for tests"""
    response = requests.post(f"{BASE_URL}/api/auth/login", json={
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD
    })
    if response.status_code == 200:
        return response.json().get("access_token")
    pytest.skip("Authentication failed - skipping authenticated tests")


@pytest.fixture(scope="module")
def auth_headers(auth_token):
    """Get headers with auth token"""
    return {
        "Authorization": f"Bearer {auth_token}",
        "Content-Type": "application/json"
    }


class TestDashboard:
    """Dashboard stats endpoint tests"""
    
    def test_get_dashboard_stats(self, auth_headers):
        """Test dashboard stats endpoint"""
        response = requests.get(f"{BASE_URL}/api/admin/dashboard/stats", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert "total_members" in data
        assert "active_members" in data
        assert "total_events" in data
        assert "upcoming_events" in data
        assert "total_news" in data
        assert "pending_applications" in data
        assert "total_applications" in data
        # Verify counts are integers
        assert isinstance(data["total_members"], int)
        assert isinstance(data["total_events"], int)


class TestMembersAPI:
    """Members CRUD tests - P0 Bug Fix Verification"""
    
    def test_get_all_members(self, auth_headers):
        """Test GET /api/admin/members returns members with certificate_path"""
        response = requests.get(f"{BASE_URL}/api/admin/members", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 5  # Should have 5 approved members
        
        # P0 Bug Fix Verification: certificate_path should be present
        for member in data:
            assert "id" in member
            assert "full_name" in member
            assert "email" in member
            assert "membership_number" in member
            # P0 Bug: certificate_path was missing before fix
            assert "certificate_path" in member
            if member.get("certificate_path"):
                assert member["certificate_path"].startswith("/uploads/certificates/")
    
    def test_member_has_all_required_fields(self, auth_headers):
        """Verify member response includes all fields from Member model"""
        response = requests.get(f"{BASE_URL}/api/admin/members", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        
        if len(data) > 0:
            member = data[0]
            # Check all fields from Member model are present
            required_fields = [
                "id", "full_name", "email", "mobile", "qualification",
                "membership_type", "status", "certificate_path"
            ]
            for field in required_fields:
                assert field in member, f"Missing field: {field}"


class TestCommitteeAPI:
    """Committee CRUD tests"""
    
    created_committee_id = None
    
    def test_get_all_committee(self, auth_headers):
        """Test GET /api/admin/committee"""
        response = requests.get(f"{BASE_URL}/api/admin/committee", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_create_committee_member(self, auth_headers):
        """Test POST /api/admin/committee"""
        payload = {
            "full_name": "TEST_Dr. Test Committee Member",
            "designation": "EC Member",
            "email": "test.committee@example.com",
            "mobile": "9876543210",
            "bio": "Test bio for committee member",
            "year": 2025,
            "display_order": 99,
            "is_current": True
        }
        response = requests.post(f"{BASE_URL}/api/admin/committee", json=payload, headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["full_name"] == payload["full_name"]
        assert data["designation"] == payload["designation"]
        assert "id" in data
        TestCommitteeAPI.created_committee_id = data["id"]
    
    def test_update_committee_member(self, auth_headers):
        """Test PUT /api/admin/committee/{id}"""
        if not TestCommitteeAPI.created_committee_id:
            pytest.skip("No committee member created to update")
        
        payload = {
            "full_name": "TEST_Dr. Updated Committee Member",
            "designation": "President",
            "email": "updated.committee@example.com",
            "mobile": "9876543211",
            "bio": "Updated bio",
            "year": 2025,
            "display_order": 1,
            "is_current": True
        }
        response = requests.put(
            f"{BASE_URL}/api/admin/committee/{TestCommitteeAPI.created_committee_id}",
            json=payload,
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["full_name"] == payload["full_name"]
        assert data["designation"] == payload["designation"]
    
    def test_delete_committee_member(self, auth_headers):
        """Test DELETE /api/admin/committee/{id}"""
        if not TestCommitteeAPI.created_committee_id:
            pytest.skip("No committee member created to delete")
        
        response = requests.delete(
            f"{BASE_URL}/api/admin/committee/{TestCommitteeAPI.created_committee_id}",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        
        # Verify deletion
        response = requests.get(f"{BASE_URL}/api/admin/committee", headers=auth_headers)
        committee_ids = [m["id"] for m in response.json()]
        assert TestCommitteeAPI.created_committee_id not in committee_ids


class TestEventsAPI:
    """Events CRUD tests"""
    
    created_event_id = None
    
    def test_get_all_events(self, auth_headers):
        """Test GET /api/admin/events"""
        response = requests.get(f"{BASE_URL}/api/admin/events", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_create_event(self, auth_headers):
        """Test POST /api/admin/events"""
        start_date = (datetime.now() + timedelta(days=30)).isoformat()
        end_date = (datetime.now() + timedelta(days=31)).isoformat()
        
        payload = {
            "title": "TEST_Annual Conference 2025",
            "description": "Test event description for annual conference",
            "event_type": "Conference",
            "start_date": start_date,
            "end_date": end_date,
            "venue": "Test Convention Center",
            "city": "Mumbai",
            "registration_link": "https://example.com/register",
            "status": "upcoming"
        }
        response = requests.post(f"{BASE_URL}/api/admin/events", json=payload, headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == payload["title"]
        assert data["event_type"] == payload["event_type"]
        assert "id" in data
        TestEventsAPI.created_event_id = data["id"]
    
    def test_update_event(self, auth_headers):
        """Test PUT /api/admin/events/{id}"""
        if not TestEventsAPI.created_event_id:
            pytest.skip("No event created to update")
        
        start_date = (datetime.now() + timedelta(days=60)).isoformat()
        
        payload = {
            "title": "TEST_Updated Conference 2025",
            "description": "Updated event description",
            "event_type": "Workshop",
            "start_date": start_date,
            "venue": "Updated Venue",
            "city": "Delhi",
            "status": "upcoming"
        }
        response = requests.put(
            f"{BASE_URL}/api/admin/events/{TestEventsAPI.created_event_id}",
            json=payload,
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == payload["title"]
        assert data["event_type"] == payload["event_type"]
    
    def test_delete_event(self, auth_headers):
        """Test DELETE /api/admin/events/{id}"""
        if not TestEventsAPI.created_event_id:
            pytest.skip("No event created to delete")
        
        response = requests.delete(
            f"{BASE_URL}/api/admin/events/{TestEventsAPI.created_event_id}",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True


class TestNewsAPI:
    """News CRUD tests"""
    
    created_news_id = None
    
    def test_get_all_news(self, auth_headers):
        """Test GET /api/admin/news"""
        response = requests.get(f"{BASE_URL}/api/admin/news", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_create_news(self, auth_headers):
        """Test POST /api/admin/news"""
        payload = {
            "title": "TEST_Important Announcement",
            "content": "This is a test news article content for testing purposes.",
            "excerpt": "Test excerpt for news",
            "category": "Announcement",
            "is_published": True
        }
        response = requests.post(f"{BASE_URL}/api/admin/news", json=payload, headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == payload["title"]
        assert data["content"] == payload["content"]
        assert "id" in data
        TestNewsAPI.created_news_id = data["id"]
    
    def test_update_news(self, auth_headers):
        """Test PUT /api/admin/news/{id}"""
        if not TestNewsAPI.created_news_id:
            pytest.skip("No news created to update")
        
        payload = {
            "title": "TEST_Updated Announcement",
            "content": "Updated news content",
            "excerpt": "Updated excerpt",
            "category": "Update",
            "is_published": False
        }
        response = requests.put(
            f"{BASE_URL}/api/admin/news/{TestNewsAPI.created_news_id}",
            json=payload,
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == payload["title"]
        assert data["is_published"] == False
    
    def test_delete_news(self, auth_headers):
        """Test DELETE /api/admin/news/{id}"""
        if not TestNewsAPI.created_news_id:
            pytest.skip("No news created to delete")
        
        response = requests.delete(
            f"{BASE_URL}/api/admin/news/{TestNewsAPI.created_news_id}",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True


class TestGalleryAPI:
    """Gallery API tests"""
    
    def test_get_all_gallery(self, auth_headers):
        """Test GET /api/admin/gallery"""
        response = requests.get(f"{BASE_URL}/api/admin/gallery", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)


class TestApplicationsAPI:
    """Applications API tests"""
    
    def test_get_all_applications(self, auth_headers):
        """Test GET /api/admin/applications"""
        response = requests.get(f"{BASE_URL}/api/admin/applications", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_get_applications_by_status(self, auth_headers):
        """Test GET /api/admin/applications?status=submitted"""
        response = requests.get(
            f"{BASE_URL}/api/admin/applications?status=submitted",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)


class TestUnauthorizedAccess:
    """Test unauthorized access to protected endpoints"""
    
    def test_members_without_auth(self):
        """Test accessing members without auth token"""
        response = requests.get(f"{BASE_URL}/api/admin/members")
        assert response.status_code == 401
    
    def test_committee_without_auth(self):
        """Test accessing committee without auth token"""
        response = requests.get(f"{BASE_URL}/api/admin/committee")
        assert response.status_code == 401
    
    def test_events_without_auth(self):
        """Test accessing events without auth token"""
        response = requests.get(f"{BASE_URL}/api/admin/events")
        assert response.status_code == 401
    
    def test_news_without_auth(self):
        """Test accessing news without auth token"""
        response = requests.get(f"{BASE_URL}/api/admin/news")
        assert response.status_code == 401


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
