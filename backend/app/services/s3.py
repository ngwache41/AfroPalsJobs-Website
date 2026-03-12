import boto3
from botocore.exceptions import ClientError
from typing import Optional
from app.config import get_settings
import uuid

settings = get_settings()


class S3Service:
    def __init__(self):
        self.s3_client = boto3.client(
            's3',
            endpoint_url=settings.S3_ENDPOINT,
            aws_access_key_id=settings.S3_ACCESS_KEY,
            aws_secret_access_key=settings.S3_SECRET_KEY,
            region_name=settings.S3_REGION
        )
        self.bucket = settings.S3_BUCKET

    async def upload_file(
        self,
        file_content: bytes,
        file_name: str,
        content_type: str = "application/pdf"
    ) -> Optional[str]:
        """Upload a file to S3/R2"""
        try:
            # Generate unique filename
            file_extension = file_name.split('.')[-1]
            unique_filename = f"{uuid.uuid4()}.{file_extension}"
            
            # Upload to S3
            self.s3_client.put_object(
                Bucket=self.bucket,
                Key=unique_filename,
                Body=file_content,
                ContentType=content_type
            )
            
            # Generate public URL
            file_url = f"{settings.S3_ENDPOINT}/{self.bucket}/{unique_filename}"
            return file_url
            
        except ClientError as e:
            print(f"Error uploading file: {e}")
            return None

    async def delete_file(self, file_url: str) -> bool:
        """Delete a file from S3/R2"""
        try:
            # Extract filename from URL
            filename = file_url.split('/')[-1]
            
            self.s3_client.delete_object(
                Bucket=self.bucket,
                Key=filename
            )
            return True
            
        except ClientError as e:
            print(f"Error deleting file: {e}")
            return False


s3_service = S3Service()
