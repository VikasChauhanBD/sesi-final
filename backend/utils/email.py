import logging

logger = logging.getLogger(__name__)

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
    Website: https://sesi.co.in
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
