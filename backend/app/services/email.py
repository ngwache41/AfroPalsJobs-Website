import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import get_settings

settings = get_settings()


class EmailService:
    def __init__(self):
        self.smtp_host = settings.SMTP_HOST
        self.smtp_port = settings.SMTP_PORT
        self.smtp_user = settings.SMTP_USER
        self.smtp_pass = settings.SMTP_PASS

    async def send_email(
        self,
        to_email: str,
        subject: str,
        html_content: str
    ) -> bool:
        """Send an email"""
        try:
            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = self.smtp_user
            message["To"] = to_email

            html_part = MIMEText(html_content, "html")
            message.attach(html_part)

            await aiosmtplib.send(
                message,
                hostname=self.smtp_host,
                port=self.smtp_port,
                username=self.smtp_user,
                password=self.smtp_pass,
                start_tls=True
            )
            return True
            
        except Exception as e:
            print(f"Error sending email: {e}")
            return False

    async def send_application_confirmation(
        self,
        to_email: str,
        candidate_name: str,
        job_title: str,
        company: str
    ):
        """Send application confirmation email"""
        subject = f"Application Received: {job_title} at {company}"
        html_content = f"""
        <html>
            <body>
                <h2>Thank you for your application!</h2>
                <p>Dear {candidate_name},</p>
                <p>We have received your application for the position of <strong>{job_title}</strong> at <strong>{company}</strong>.</p>
                <p>Our team will review your application and get back to you soon.</p>
                <br>
                <p>Best regards,<br>The TalentHub Team</p>
            </body>
        </html>
        """
        await self.send_email(to_email, subject, html_content)

    async def send_new_application_notification(
        self,
        to_email: str,
        candidate_name: str,
        job_title: str
    ):
        """Notify employer of new application"""
        subject = f"New Application: {job_title}"
        html_content = f"""
        <html>
            <body>
                <h2>New Application Received</h2>
                <p>You have received a new application for <strong>{job_title}</strong>.</p>
                <p>Candidate: {candidate_name}</p>
                <p>Please log in to your dashboard to review the application.</p>
                <br>
                <p>Best regards,<br>The TalentHub Team</p>
            </body>
        </html>
        """
        await self.send_email(to_email, subject, html_content)


email_service = EmailService()
