from auth.jwt_handler import create_access_token, verify_token

token = create_access_token(
    {
        "sub": "admin"
    }
)

print("TOKEN:")
print(token)

print("\nVERIFY:")

print(
    verify_token(token)
)