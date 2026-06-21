# 🛡️ AlertBridge – Cyber Breach Management & Compliance System

## 📌 Overview

AlertBridge is a web-based Cyber Breach Management & Compliance System developed using **React.js**, **FastAPI**, and **PostgreSQL**. The platform helps organizations record cyber breach incidents, assess their severity, monitor compliance, manage investigations, and analyze security data through an interactive dashboard.

---

# 🚀 Features

* 🔐 JWT Authentication
* 👥 Role-Based Access Control (Admin, Analyst, Auditor)
* 📋 Register Cyber Breaches
* 📊 Security Analytics Dashboard
* 📈 Monthly Trend & Severity Charts
* 🌍 Attack Map
* 📂 Public Breach Registry
* 🔔 Notification Management (Simulation)
* ✅ Compliance Tracking
* 👤 User Management
* 📝 Audit Logs
* ⚙️ System Settings (Dark Mode & Refresh Rate)
* 🧠 Threat Intelligence Dashboard

---

# 🛠️ Technology Stack

## Frontend

* React.js
* Material UI
* Axios
* React Router
* Recharts
* React Leaflet

## Backend

* FastAPI
* SQLAlchemy
* JWT Authentication
* WebSocket

## Database

* PostgreSQL

---

# 📂 Project Structure

```
AlertBridge
│
├── backend
│   ├── auth
│   ├── routes
│   ├── services
│   ├── schemas
│   ├── main.py
│   └── database.py
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/AlertBridge.git
```

---

## 2. Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend will run on:

```
http://localhost:8000
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 4. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE alertbridge;
```

Import the provided SQL file into PostgreSQL.

Update your database connection in `database.py` if required.

---

# 🔐 User Roles

### Admin

* Manage Users
* Audit Logs
* Settings
* Register Breaches
* Notifications

### Analyst

* Register Breaches
* Security Analytics
* Threat Intelligence
* Incident Management

### Auditor

* View Compliance
* Audit Reports
* Public Registry

---

# 🔄 System Workflow

```
User Login
      │
      ▼
Register Breach
      │
      ▼
Risk Assessment
      │
      ▼
Store in Database
      │
      ▼
Compliance Tracking
      │
      ▼
Notification (Simulation)
      │
      ▼
Security Dashboard
```

---

# 📊 Major Modules

* Authentication
* Dashboard
* Register Breach
* Security Analytics
* Compliance Management
* Public Registry
* Notifications
* Threat Intelligence
* Attack Map
* User Management
* Audit Logs
* Settings

---

# 🛡️ Security Features

* JWT Authentication
* Password Hashing (bcrypt)
* Role-Based Access Control
* Protected API Routes
* Audit Logging

---

# 🚔 How It Helps Law Enforcement

AlertBridge provides a centralized platform for recording and managing cyber breach incidents. It enables investigators and cybersecurity teams to monitor breach reports, assess incident severity, track compliance activities, maintain audit trails, and analyze cyberattack trends. The notification workflow demonstrates how affected users can be informed after a data breach, supporting transparent and structured incident response.

---

# 🔮 Future Enhancements

* Real Email Notifications
* SMS Integration
* CERT-In Integration
* SIEM Integration
* Multi-Factor Authentication (MFA)
* Machine Learning-Based Risk Prediction
* Docker Deployment
* Cloud Deployment

---

# 👨‍💻 Developer

**Vivek Maurya**

APCSIP 2026 Project

---

# 📄 License

This project was developed for educational and academic purposes as part of the APCSIP 2026 internship program.
