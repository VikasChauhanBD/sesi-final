"""
Certificate generation utility for SESI membership
Generates a professional PDF certificate for approved members
"""
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from datetime import datetime
import io
import os

# Get app URL from environment variable with fallback
# APP_URL = os.environ.get('APP_URL', 'https://sesi.co.in').replace('https://', '').replace('http://', '')

APP_URL = os.environ.get('APP_URL', 'http://localhost:3000/').replace('https://', '').replace('http://', '')

def generate_membership_certificate(member_data):
    """
    Generate a professional membership certificate PDF
    
    Args:
        member_data: dict containing member information
        
    Returns:
        BytesIO buffer containing the PDF
    """
    buffer = io.BytesIO()
    
    # Create canvas with landscape A4
    c = canvas.Canvas(buffer, pagesize=landscape(A4))
    width, height = landscape(A4)
    
    # Draw decorative border
    c.setStrokeColor(colors.HexColor('#0d9488'))  # Teal color
    c.setLineWidth(8)
    c.rect(0.5*inch, 0.5*inch, width - inch, height - inch)
    
    c.setStrokeColor(colors.HexColor('#f97316'))  # Orange color
    c.setLineWidth(3)
    c.rect(0.6*inch, 0.6*inch, width - 1.2*inch, height - 1.2*inch)
    
    # Title
    c.setFont("Helvetica-Bold", 36)
    c.setFillColor(colors.HexColor('#0d9488'))
    c.drawCentredString(width/2, height - 1.5*inch, "CERTIFICATE OF MEMBERSHIP")
    
    # Organization name
    c.setFont("Helvetica-Bold", 24)
    c.setFillColor(colors.HexColor('#1f2937'))
    c.drawCentredString(width/2, height - 2*inch, "Shoulder & Elbow Society of India")
    c.setFont("Helvetica", 14)
    c.drawCentredString(width/2, height - 2.4*inch, "(SESI)")
    
    # Divider line
    c.setStrokeColor(colors.HexColor('#d1d5db'))
    c.setLineWidth(1)
    c.line(2*inch, height - 2.7*inch, width - 2*inch, height - 2.7*inch)
    
    # Certificate text
    c.setFont("Helvetica", 16)
    c.setFillColor(colors.HexColor('#374151'))
    c.drawCentredString(width/2, height - 3.3*inch, "This is to certify that")
    
    # Member name (highlighted)
    c.setFont("Helvetica-Bold", 28)
    c.setFillColor(colors.HexColor('#f97316'))
    member_name = member_data.get('full_name', '')
    c.drawCentredString(width/2, height - 3.9*inch, member_name)
    
    # Member details
    c.setFont("Helvetica", 14)
    c.setFillColor(colors.HexColor('#374151'))
    qualification = member_data.get('qualification', '')
    c.drawCentredString(width/2, height - 4.4*inch, qualification)
    
    hospital = member_data.get('work_hospital', '')
    if hospital:
        c.drawCentredString(width/2, height - 4.7*inch, hospital)
        next_y = height - 5.2*inch
    else:
        next_y = height - 5*inch
    
    # Membership type
    c.setFont("Helvetica", 16)
    membership_type = member_data.get('membership_type', '')
    c.drawCentredString(width/2, next_y, f"has been accepted as a {membership_type}")
    
    # Membership number
    c.setFont("Helvetica-Bold", 18)
    c.setFillColor(colors.HexColor('#0d9488'))
    membership_number = member_data.get('membership_number', '')
    c.drawCentredString(width/2, next_y - 0.6*inch, f"Membership Number: {membership_number}")
    
    # Date
    c.setFont("Helvetica", 12)
    c.setFillColor(colors.HexColor('#6b7280'))
    approval_date = member_data.get('approved_date', datetime.now().strftime('%B %d, %Y'))
    c.drawCentredString(width/2, next_y - 1.1*inch, f"Date of Approval: {approval_date}")
    
    # Footer section
    footer_y = 1.8*inch
    
    # Signature lines
    c.setStrokeColor(colors.HexColor('#9ca3af'))
    c.setLineWidth(1)
    
    # President signature
    c.line(1.5*inch, footer_y, 3.5*inch, footer_y)
    c.setFont("Helvetica", 10)
    c.setFillColor(colors.HexColor('#374151'))
    c.drawCentredString(2.5*inch, footer_y - 0.3*inch, "President")
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(2.5*inch, footer_y - 0.55*inch, "SESI")
    
    # Secretary signature
    c.line(width - 3.5*inch, footer_y, width - 1.5*inch, footer_y)
    c.setFont("Helvetica", 10)
    c.setFillColor(colors.HexColor('#374151'))
    c.drawCentredString(width - 2.5*inch, footer_y - 0.3*inch, "Secretary")
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(width - 2.5*inch, footer_y - 0.55*inch, "SESI")
    
    # Official stamp/seal placeholder
    c.setFont("Helvetica-Oblique", 9)
    c.setFillColor(colors.HexColor('#9ca3af'))
    c.drawCentredString(width/2, footer_y - 0.3*inch, "Official Seal")
    
    # Bottom text
    c.setFont("Helvetica", 9)
    c.setFillColor(colors.HexColor('#6b7280'))
    c.drawCentredString(width/2, 0.8*inch, f"Shoulder & Elbow Society of India | {APP_URL} | info@sesi.co.in")
    
    # Save PDF
    c.save()
    buffer.seek(0)
    return buffer

def generate_membership_number(year=None):
    """
    Generate unique membership number
    Format: SESI-YYYY-XXXX
    
    Args:
        year: Year for the membership (default: current year)
        
    Returns:
        Membership number string
    """
    from motor.motor_asyncio import AsyncIOMotorClient
    import os
    import asyncio
    
    if year is None:
        year = datetime.now().year
    
    # This is a synchronous wrapper - should be called from async context
    # For now, returns a placeholder format
    # In actual implementation, this will query database for last number
    return f"SESI-{year}-0001"

async def get_next_membership_number():
    """
    Get next available membership number from database
    Format: SESI-YYYY-XXXX where XXXX is sequential
    """
    from motor.motor_asyncio import AsyncIOMotorClient
    import os
    
    from database import db

    
    current_year = datetime.now().year
    
    # Find the highest membership number for current year
    pipeline = [
        {
            "$match": {
                "membership_number": {"$regex": f"^SESI-{current_year}-"}
            }
        },
        {
            "$project": {
                "number_part": {
                    "$toInt": {
                        "$substr": ["$membership_number", 10, 4]
                    }
                }
            }
        },
        {
            "$sort": {"number_part": -1}
        },
        {
            "$limit": 1
        }
    ]
    
    result = await db.membership_applications.aggregate(pipeline).to_list(1)
    
    if result:
        next_number = result[0]['number_part'] + 1
    else:
        next_number = 1
    
    membership_number = f"SESI-{current_year}-{str(next_number).zfill(4)}"
    client.close()
    
    return membership_number
