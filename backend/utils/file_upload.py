# import os
# import uuid
# from pathlib import Path
# from fastapi import UploadFile, HTTPException
# from typing import List

# ALLOWED_EXTENSIONS = {'.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'}
# MAX_FILE_SIZE = 5 * 1024 * 1024

# BASE_DIR = Path(__file__).resolve().parent.parent
# UPLOAD_DIR = BASE_DIR / "uploads"
# UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# def validate_file(file: UploadFile) -> bool:
#     file_ext = Path(file.filename).suffix.lower()
#     if file_ext not in ALLOWED_EXTENSIONS:
#         raise HTTPException(
#             status_code=400,
#             detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
#         )
#     return True

# async def save_upload_file(file: UploadFile, subfolder: str = "general") -> str:
#     validate_file(file)
    
#     folder_path = UPLOAD_DIR / subfolder
#     folder_path.mkdir(parents=True, exist_ok=True)
    
#     file_ext = Path(file.filename).suffix.lower()
#     unique_filename = f"{uuid.uuid4()}{file_ext}"
#     file_path = folder_path / unique_filename
    
#     contents = await file.read()
    
#     if len(contents) > MAX_FILE_SIZE:
#         raise HTTPException(
#             status_code=400,
#             detail=f"File too large. Maximum size: {MAX_FILE_SIZE / (1024*1024)}MB"
#         )
    
#     with open(file_path, "wb") as f:
#         f.write(contents)
    
#     return f"/uploads/{subfolder}/{unique_filename}"

# async def save_multiple_files(
#     files: List[UploadFile],
#     subfolder: str = "general"
# ) -> List[str]:
#     file_paths = []
#     for file in files:
#         if file.filename:
#             file_path = await save_upload_file(file, subfolder)
#             file_paths.append(file_path)
#     return file_paths

# def delete_file(file_path: str) -> bool:
#     try:
#         full_path = BASE_DIR / file_path.lstrip("/")
#         if full_path.exists():
#             full_path.unlink()
#             return True
#         return False
#     except Exception as e:
#         print(f"Error deleting file: {e}")
#         return False


import os
import uuid
from pathlib import Path
from fastapi import UploadFile, HTTPException
from typing import List

ALLOWED_EXTENSIONS = {'.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'}
MAX_FILE_SIZE = 5 * 1024 * 1024

BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

def validate_file(file: UploadFile) -> bool:
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    return True

async def save_upload_file(file: UploadFile, subfolder: str = "general") -> str:
    validate_file(file)
    
    folder_path = UPLOAD_DIR / subfolder
    folder_path.mkdir(parents=True, exist_ok=True)
    
    file_ext = Path(file.filename).suffix.lower()
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = folder_path / unique_filename
    
    contents = await file.read()
    
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size: {MAX_FILE_SIZE / (1024*1024)}MB"
        )
    
    with open(file_path, "wb") as f:
        f.write(contents)
    
    return f"/uploads/{subfolder}/{unique_filename}"

async def save_multiple_files(
    files: List[UploadFile],
    subfolder: str = "general"
) -> List[str]:
    file_paths = []
    for file in files:
        if file.filename:
            file_path = await save_upload_file(file, subfolder)
            file_paths.append(file_path)
    return file_paths

def delete_file(file_path: str) -> bool:
    try:
        full_path = BASE_DIR / file_path.lstrip("/")
        if full_path.exists():
            full_path.unlink()
            return True
        return False
    except Exception as e:
        print(f"Error deleting file: {e}")
        return False
