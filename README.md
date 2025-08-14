# BoiBondhu - Book Exchange Platform

A full-stack book exchange and selling platform built with React (Frontend) and Spring Boot (Backend).

## Project Structure

```
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── backend-api/       # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── ...
└── README.md
```

## Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

### Backend Setup
```bash
cd backend-api
mvn clean install
mvn spring-boot:run
```
Backend runs on: http://localhost:8080

## Features

- 📚 Book listing and browsing
- 🔐 JWT Authentication
- 💱 Book exchange system
- ⭐ Reviews and ratings
- ❤️ Wishlist functionality
- 👨‍💼 Admin panel
- 📱 Responsive design

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS
- Vite
- Lucide React Icons

**Backend:**
- Spring Boot 3
- Spring Security + JWT
- MySQL Database
- Maven

## Database Setup

1. Install MySQL
2. Create database: `book_exchange`
3. Update credentials in `backend-api/src/main/resources/application.yml`
4. Run schema from `backend-api/database/schema.sql`

## Development

1. Start backend server first
2. Start frontend development server
3. Access application at http://localhost:5173

For detailed setup instructions, see the README files in each folder.