# letsACEREADME.md
![Backend Tests](https://github.com/Harris-Cabrera/letsACE/actions/workflows/backend-tests.yml/badge.svg)
# letsACE

Certification practice platform built with React, FastAPI, and PostgreSQL.

## Features
- Secure user authentication with JWT
- Custom quiz engine
- Performance dashboard
- Question review system
- Admin question management
- Responsive UI

## Tech Stack

Frontend:
React
Vite
Axios
React Router

Backend:
FastAPI
SQLAlchemy
PostgreSQL
Alembic
JWT Authentication

Deployment:
Vercel
Render

## Architecture

React Client
      |
      |
 FastAPI REST API
      |
      |
 PostgreSQL Database


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


## Live Demo

Live App: https://letsace.app

Demo User:

```text
Email: demo@letsace.com
Password: password123


## Running Locally

Backend:
pip install -r requirements.txt

Frontend:
npm install
npm run dev
