from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    password: str
    role: str
    full_name: str
    email: EmailStr