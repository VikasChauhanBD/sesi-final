import os
import uuid
from pathlib import Path
from fastapi import UploadFile, HTTPException
from typing import List

ALLOWED_EXTENSIONS = {'.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

UPLOAD_DIR = Path("/app/backend/uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

def validate_file(file: UploadFile) -> bool:
    """Validate file type and size"""
    # Check file extension
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    return True

async def save_upload_file(file: UploadFile, subfolder: str = "general") -> str:
    """Save uploaded file and return the file path"""
    validate_file(file)
    
    # Create subfolder if it doesn't exist
    folder_path = UPLOAD_DIR / subfolder
    folder_path.mkdir(exist_ok=True, parents=True)
    
    # Generate unique filename
    file_ext = Path(file.filename).suffix.lower()
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = folder_path / unique_filename
    
    # Save file
    contents = await file.read()
    
    # Check file size
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size: {MAX_FILE_SIZE / (1024*1024)}MB"
        )
    
    with open(file_path, "wb") as f:
        f.write(contents)
    
    # Return relative path
    return f"/uploads/{subfolder}/{unique_filename}"

async def save_multiple_files(
    files: List[UploadFile],
    subfolder: str = "general"
) -> List[str]:
    """Save multiple files and return list of file paths"""
    file_paths = []
    for file in files:
        if file.filename:  # Skip if no file selected
            file_path = await save_upload_file(file, subfolder)
            file_paths.append(file_path)
    return file_paths

def delete_file(file_path: str) -> bool:
    """Delete a file from the server"""
    try:
        full_path = Path("/app/backend") / file_path.lstrip("/")
        if full_path.exists():
            full_path.unlink()
            return True
        return False
    except Exception as e:
        print(f"Error deleting file: {e}")
        return False
