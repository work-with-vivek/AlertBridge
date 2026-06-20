from auth.password import hash_password, verify_password

password = "admin123"

hashed = hash_password(password)

print("Hashed Password:")
print(hashed)

print("\nVerification:")
print(verify_password(password, hashed))