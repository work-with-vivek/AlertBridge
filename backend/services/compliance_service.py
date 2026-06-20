def calculate_compliance_score(notification_status, evidence_status):

    notification_status = notification_status.lower()
    evidence_status = evidence_status.lower()

    if notification_status == "completed" and evidence_status == "verified":
        return 100

    elif notification_status == "completed" and evidence_status == "submitted":
        return 80

    elif notification_status == "pending" and evidence_status == "submitted":
        return 50

    elif notification_status == "pending" and evidence_status == "not submitted":
        return 20

    return 0