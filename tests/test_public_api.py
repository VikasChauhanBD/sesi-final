"""
Test suite for SESI Public API endpoints
Tests: Committee, News, Events, Statistics, Gallery, Publications
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestPublicCommitteeAPI:
    """Tests for /api/public/committee endpoints"""
    
    def test_get_committee_members(self):
        """Test GET /api/public/committee returns committee members"""
        response = requests.get(f"{BASE_URL}/api/public/committee")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Should have at least one committee member"
        
        # Validate first member structure
        member = data[0]
        assert "id" in member
        assert "full_name" in member
        assert "designation" in member
        assert "slug" in member
        assert "is_current" in member
        
    def test_get_committee_with_year_filter(self):
        """Test GET /api/public/committee with year filter"""
        response = requests.get(f"{BASE_URL}/api/public/committee", params={"year": 2025})
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        # All members should be from 2025
        for member in data:
            assert member.get("year") == 2025
            
    def test_get_committee_member_by_slug(self):
        """Test GET /api/public/committee/{slug} returns specific member"""
        # First get all members to find a valid slug
        response = requests.get(f"{BASE_URL}/api/public/committee")
        assert response.status_code == 200
        members = response.json()
        
        if len(members) > 0:
            slug = members[0]["slug"]
            response = requests.get(f"{BASE_URL}/api/public/committee/{slug}")
            assert response.status_code == 200
            
            member = response.json()
            assert member["slug"] == slug
            assert "full_name" in member
            assert "designation" in member
            
    def test_get_committee_member_not_found(self):
        """Test GET /api/public/committee/{slug} returns 404 for invalid slug"""
        response = requests.get(f"{BASE_URL}/api/public/committee/invalid-slug-12345")
        assert response.status_code == 404


class TestPublicNewsAPI:
    """Tests for /api/public/news endpoints"""
    
    def test_get_news(self):
        """Test GET /api/public/news returns news articles"""
        response = requests.get(f"{BASE_URL}/api/public/news")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        
        if len(data) > 0:
            news = data[0]
            assert "id" in news
            assert "title" in news
            assert "content" in news
            assert "published_date" in news
            assert "is_published" in news
            
    def test_get_news_with_limit(self):
        """Test GET /api/public/news with limit parameter"""
        response = requests.get(f"{BASE_URL}/api/public/news", params={"limit": 2})
        assert response.status_code == 200
        
        data = response.json()
        assert len(data) <= 2
        
    def test_get_news_with_category_filter(self):
        """Test GET /api/public/news with category filter"""
        response = requests.get(f"{BASE_URL}/api/public/news", params={"category": "Conference"})
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        # All news should be of category Conference
        for news in data:
            assert news.get("category") == "Conference"
            
    def test_get_news_by_id(self):
        """Test GET /api/public/news/{id} returns specific news"""
        # First get all news to find a valid ID
        response = requests.get(f"{BASE_URL}/api/public/news")
        assert response.status_code == 200
        news_list = response.json()
        
        if len(news_list) > 0:
            news_id = news_list[0]["id"]
            response = requests.get(f"{BASE_URL}/api/public/news/{news_id}")
            assert response.status_code == 200
            
            news = response.json()
            assert news["id"] == news_id
            assert "title" in news
            assert "content" in news


class TestPublicEventsAPI:
    """Tests for /api/public/events endpoints"""
    
    def test_get_events(self):
        """Test GET /api/public/events returns events"""
        response = requests.get(f"{BASE_URL}/api/public/events")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        
        if len(data) > 0:
            event = data[0]
            assert "id" in event
            assert "title" in event
            assert "description" in event
            assert "event_type" in event
            assert "start_date" in event
            assert "status" in event
            
    def test_get_events_with_status_filter(self):
        """Test GET /api/public/events with status filter"""
        response = requests.get(f"{BASE_URL}/api/public/events", params={"status": "upcoming"})
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        # All events should have upcoming status
        for event in data:
            assert event.get("status") == "upcoming"
            
    def test_get_events_with_limit(self):
        """Test GET /api/public/events with limit parameter"""
        response = requests.get(f"{BASE_URL}/api/public/events", params={"limit": 2})
        assert response.status_code == 200
        
        data = response.json()
        assert len(data) <= 2
        
    def test_get_event_by_id(self):
        """Test GET /api/public/events/{id} returns specific event"""
        # First get all events to find a valid ID
        response = requests.get(f"{BASE_URL}/api/public/events")
        assert response.status_code == 200
        events = response.json()
        
        if len(events) > 0:
            event_id = events[0]["id"]
            response = requests.get(f"{BASE_URL}/api/public/events/{event_id}")
            assert response.status_code == 200
            
            event = response.json()
            assert event["id"] == event_id
            assert "title" in event


class TestPublicStatisticsAPI:
    """Tests for /api/public/statistics endpoint"""
    
    def test_get_statistics(self):
        """Test GET /api/public/statistics returns stats"""
        response = requests.get(f"{BASE_URL}/api/public/statistics")
        assert response.status_code == 200
        
        data = response.json()
        assert "total_members" in data
        assert "total_events" in data
        assert "upcoming_events" in data
        assert "total_publications" in data
        assert "cme_credits" in data
        
        # Validate data types
        assert isinstance(data["total_members"], int)
        assert isinstance(data["total_events"], int)
        assert isinstance(data["upcoming_events"], int)


class TestPublicGalleryAPI:
    """Tests for /api/public/gallery endpoint"""
    
    def test_get_gallery(self):
        """Test GET /api/public/gallery returns images"""
        response = requests.get(f"{BASE_URL}/api/public/gallery")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)


class TestPublicPublicationsAPI:
    """Tests for /api/public/publications endpoint"""
    
    def test_get_publications(self):
        """Test GET /api/public/publications returns publications"""
        response = requests.get(f"{BASE_URL}/api/public/publications")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)


class TestPublicMembersAPI:
    """Tests for /api/public/members endpoint"""
    
    def test_get_members(self):
        """Test GET /api/public/members returns members directory"""
        response = requests.get(f"{BASE_URL}/api/public/members")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)


class TestPublicStatesAPI:
    """Tests for /api/public/states endpoint"""
    
    def test_get_states(self):
        """Test GET /api/public/states returns states"""
        response = requests.get(f"{BASE_URL}/api/public/states")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)


class TestPublicSEOAPI:
    """Tests for /api/public/seo endpoint"""
    
    def test_get_page_seo(self):
        """Test GET /api/public/seo/{page_name} returns SEO data"""
        response = requests.get(f"{BASE_URL}/api/public/seo/home")
        assert response.status_code == 200
        
        data = response.json()
        assert "title" in data
        assert "description" in data


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
