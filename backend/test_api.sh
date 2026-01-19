#!/bin/bash

echo "=========================================="
echo "SESI Backend API Testing"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

API_URL="http://localhost:8001/api"

echo -e "${BLUE}1. Testing Health Check${NC}"
curl -s $API_URL/health | python3 -m json.tool
echo ""
echo ""

echo -e "${BLUE}2. Testing Get All States${NC}"
curl -s $API_URL/public/states | python3 -c "import sys, json; data = json.load(sys.stdin); print(f'Total States: {len(data)}'); [print(f'  - {s[\"name\"]}') for s in data[:5]]"
echo ""
echo ""

echo -e "${BLUE}3. Testing Get Districts (Karnataka)${NC}"
STATE_ID=$(curl -s $API_URL/public/states | python3 -c "import sys, json; data = json.load(sys.stdin); print([s['id'] for s in data if s['name']=='Karnataka'][0])")
curl -s "$API_URL/public/districts/$STATE_ID" | python3 -c "import sys, json; data = json.load(sys.stdin); print(f'Districts in Karnataka: {len(data)}'); [print(f'  - {d[\"name\"]}') for d in data[:5]]"
echo ""
echo ""

echo -e "${BLUE}4. Testing Committee Members${NC}"
curl -s $API_URL/public/committee | python3 -c "import sys, json; data = json.load(sys.stdin); print(f'Committee Members: {len(data)}'); [print(f'  - {m[\"full_name\"]} ({m[\"designation\"]})') for m in data]"
echo ""
echo ""

echo -e "${BLUE}5. Testing Statistics${NC}"
curl -s $API_URL/public/statistics | python3 -m json.tool
echo ""
echo ""

echo -e "${BLUE}6. Testing Admin Login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@sesi.co.in", "password": "Admin@SESI2025"}')

echo "$LOGIN_RESPONSE" | python3 -m json.tool

# Extract token
TOKEN=$(echo $LOGIN_RESPONSE | python3 -c "import sys, json; data = json.load(sys.stdin); print(data.get('access_token', ''))")

if [ ! -z "$TOKEN" ]; then
    echo -e "${GREEN}✅ Login Successful!${NC}"
    echo "Token: ${TOKEN:0:50}..."
    echo ""
    echo ""
    
    echo -e "${BLUE}7. Testing Protected Admin Dashboard (with token)${NC}"
    curl -s $API_URL/admin/dashboard/stats \
      -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
    echo ""
    echo ""
    
    echo -e "${BLUE}8. Testing Get All Applications (Admin)${NC}"
    curl -s $API_URL/admin/applications \
      -H "Authorization: Bearer $TOKEN" | python3 -c "import sys, json; data = json.load(sys.stdin); print(f'Total Applications: {len(data)}')"
    echo ""
    echo ""
else
    echo -e "${RED}❌ Login Failed${NC}"
fi

echo -e "${GREEN}=========================================="
echo "Testing Complete!"
echo "==========================================${NC}"
echo ""
echo "Admin Credentials:"
echo "  Email: admin@sesi.co.in"
echo "  Password: Admin@SESI2025"
echo ""
