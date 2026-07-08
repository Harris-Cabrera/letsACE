# letsACE

![Backend Tests](https://github.com/Harris-Cabrera/letsACE/actions/workflows/backend-tests.yml/badge.svg)

A full-stack certification practice platform built with React, FastAPI, and PostgreSQL.

letsACE allows users to take customizable quizzes, track performance analytics, review answers, and manage certification questions through an admin dashboard.

## Live Demo

Live App: https://letsace.app

Demo User:

```text
Email: demo@letsace.com
Password: password123
```

---

## Features

### User Features
- JWT-based authentication and protected routes
- Custom quiz generation
- Multiple certification domains
- Quiz attempt history
- Answer review with explanations
- Performance dashboard and statistics tracking

### Admin Features
- Role-based admin access
- Create, update, and delete questions
- CSV question import
- Question bank management

### Engineering Features
- REST API backend architecture
- PostgreSQL relational database design
- ORM models with SQLAlchemy
- Database migrations using Alembic
- Automated backend testing with Pytest
- CI pipeline using GitHub Actions

---

## Tech Stack

### Frontend
- React
- Vite
- Axios
- React Router
- CSS

### Backend
- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- Alembic
- JWT Authentication

### Deployment / DevOps
- Vercel
- Render
- GitHub Actions CI/CD

---

## Architecture

```text
                React Client
                     |
                     |
              FastAPI REST API
                     |
                     |
              PostgreSQL Database


Development Pipeline:

Developer
    |
    |
 GitHub Repository
    |
    |
GitHub Actions Tests
    |
    |
Production Deployment
```

---

## Screenshots

### Login
![Login](screenshots/letsACE_login.jpg)

### User Dashboard
![User Dashboard](screenshots/letsACE_UserDashboard.jpg)

### Quiz Settings
![Quiz Settings](screenshots/letsACE_UserQuizSettings.jpg)

### Quiz
![Quiz](screenshots/letsACE_UserQuiz.jpg)

### Quiz Review
![Quiz Review](screenshots/letsACE_UserQuizReview.jpg)

### Admin Panel
![Admin Panel](screenshots/letsACE_AdminPanel.jpg)

---

## Running Locally

Clone repository:

```bash
git clone https://github.com/Harris-Cabrera/letsACE.git
```

Backend setup:

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Frontend setup:

```bash
cd frontend

npm install

npm run dev
```

---

## Testing

Run backend tests:

```bash
cd backend

pytest
```

---

## Project Status

MVP deployed.

Future improvements:
- OAuth authentication
- Expanded certification support
- Advanced analytics
- Cloud storage integration