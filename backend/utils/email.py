import logging
import os

logger = logging.getLogger(__name__)

# Get app URL from environment variable with fallback
APP_URL = os.environ.get('APP_URL', 'https://sesi.co.in')

def send_email(to_email: str, subject: str, body: str, attachment=None, attachment_name=None):
    """
    Mock email function - logs email to console
    Replace with actual SMTP implementation when email service is configured
    
    Args:
        to_email: Recipient email
        subject: Email subject
        body: Email body text
        attachment: File buffer (BytesIO) for attachment
        attachment_name: Name of the attachment file
    """
    logger.info(f"""
    ============ EMAIL NOTIFICATION ============
    To: {to_email}
    Subject: {subject}
    Body:
    {body}
    Attachment: {attachment_name if attachment else 'None'}
    ============================================
    """)
    print(f"\n📧 EMAIL SENT TO: {to_email}")
    print(f"📌 SUBJECT: {subject}")
    print(f"📝 BODY:\n{body}")
    if attachment:
        print(f"📎 ATTACHMENT: {attachment_name}")
    print()
    return True

def send_membership_application_email(application_data: dict):
    """Send email notification for new membership application"""
    applicant_email = application_data.get('email')
    application_id = application_data.get('id')
    full_name = application_data.get('full_name')
    
    # Email to applicant
    applicant_subject = "SESI Membership Application Received"
    applicant_body = f"""
    Dear {full_name},
    
    Thank you for applying for membership with the Shoulder & Elbow Society of India (SESI).
    
    Your application has been successfully received and is now under review.
    
    Application ID: {application_id}
    Application Date: {application_data.get('submitted_at')}
    
    You will receive a confirmation email once your application has been reviewed by our team.
    
    Best regards,
    SESI Admin Team
    Shoulder & Elbow Society of India
    Website: {APP_URL}
    """
    
    send_email(applicant_email, applicant_subject, applicant_body)
    
    # Email to admin
    admin_email = "admin@sesi.co.in"
    admin_subject = f"New Membership Application - {full_name}"
    admin_body = f"""
    New membership application received:
    
    Application ID: {application_id}
    Name: {full_name}
    Email: {applicant_email}
    Mobile: {application_data.get('mobile')}
    Membership Type: {application_data.get('membership_type')}
    Region: {application_data.get('region_membership')}
    
    Please review the application in the admin panel:
    https://sesi.co.in/admin/applications/{application_id}
    
    Best regards,
    SESI System
    """
    
    send_email(admin_email, admin_subject, admin_body)

def send_approval_email_with_certificate(application_data: dict, certificate_buffer, certificate_path: str):
    """Send approval email with membership certificate"""
    applicant_email = application_data.get('email')
    full_name = application_data.get('full_name')
    membership_number = application_data.get('membership_number')
    membership_type = application_data.get('membership_type')
    
    # Email to approved member
    subject = "🎉 Congratulations! SESI Membership Approved"
    body = f"""
    Dear {full_name},
    
    Congratulations! We are pleased to inform you that your application for membership with the 
    Shoulder & Elbow Society of India (SESI) has been APPROVED.
    
    ✅ Membership Details:
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Membership Number: {membership_number}
    Membership Type: {membership_type}
    Status: Active
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    📜 Your digital membership certificate is attached to this email.
    
    🎯 Member Benefits:
    • Access to exclusive SESI conferences and workshops
    • CME credits and continuing education opportunities
    • Networking with leading shoulder & elbow surgeons
    • Access to latest research and publications
    • Discounted registration for SESI events
    • Member directory listing
    
    🌐 Next Steps:
    1. Download and save your membership certificate
    2. Visit our website: https://sesi.co.in
    3. Stay updated on upcoming events and conferences
    4. Connect with fellow members
    
    Welcome to the SESI family! We look forward to your active participation 
    and contribution to advancing shoulder and elbow surgery in India.
    
    For any queries, please contact us at info@sesi.co.in
    
    Best regards,
    SESI Admin Team
    Shoulder & Elbow Society of India
    Website: https://sesi.co.in
    """
    
    send_email(
        applicant_email, 
        subject, 
        body,
        attachment=certificate_buffer,
        attachment_name=f"SESI_Certificate_{membership_number}.pdf"
    )
    
    # Email to admin
    admin_email = "admin@sesi.co.in"
    admin_subject = f"Membership Approved - {full_name}"
    admin_body = f"""
    Membership application has been approved:
    
    Member Name: {full_name}
    Membership Number: {membership_number}
    Email: {applicant_email}
    Membership Type: {membership_type}
    
    Certificate generated and sent to member.
    Certificate path: {certificate_path}
    
    The member can now access all SESI benefits and services.
    
    Best regards,
    SESI System
    """
    
    send_email(admin_email, admin_subject, admin_body)
