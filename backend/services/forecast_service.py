def generate_forecast(sector, exposed_data):

    sector = sector.lower()
    exposed_data = exposed_data.lower()

    threats = []
    actions = []

    # Banking
    if sector == "banking":

        threats.extend([
            "Identity Theft",
            "KYC Fraud",
            "Financial Fraud"
        ])

        actions.extend([
            "Notify banks",
            "Monitor fraud complaints",
            "Issue customer advisory"
        ])

    # Telecom
    elif sector == "telecom":

        threats.extend([
            "OTP Fraud",
            "SIM Swap",
            "Phishing"
        ])

        actions.extend([
            "Notify telecom operators",
            "Monitor SIM swap complaints",
            "Issue public advisory"
        ])

    # Education
    elif sector == "education":

        threats.extend([
            "Student Phishing",
            "Credential Theft"
        ])

        actions.extend([
            "Notify institutions",
            "Advise password reset"
        ])

    # Extra rules based on exposed data

    if "pan" in exposed_data:
        threats.append("Identity Theft")

    if "phone" in exposed_data:
        threats.append("OTP Fraud")

    if "email" in exposed_data:
        threats.append("Phishing")

    if "upi" in exposed_data or "bank" in exposed_data:
        threats.append("Financial Fraud")

    # Remove duplicates
    threats = list(set(threats))
    actions = list(set(actions))

    return {
        "predicted_threats": threats,
        "recommended_actions": actions
    }
