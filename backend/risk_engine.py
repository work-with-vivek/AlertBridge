def analyze_risk(exposed_data):

    exposed_data = exposed_data.lower()

    if "upi" in exposed_data or "bank" in exposed_data:
        return {
            "risk": "Critical",
            "threats": [
                "Financial Fraud",
                "UPI Fraud",
                "Account Takeover"
            ]
        }

    if "pan" in exposed_data:
        return {
            "risk": "High",
            "threats": [
                "Identity Theft",
                "KYC Fraud",
                "Phishing"
            ]
        }

    if "phone" in exposed_data and "email" in exposed_data:
        return {
            "risk": "Medium",
            "threats": [
                "OTP Fraud",
                "SIM Swap",
                "Phishing"
            ]
        }

    if "email" in exposed_data:
        return {
            "risk": "Low",
            "threats": [
                "Spam",
                "Phishing"
            ]
        }

    return {
        "risk": "Unknown",
        "threats": []
    }