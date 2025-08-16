# Easy Backend Setup Guide

## 🚀 Quick Start (Easiest Method)

### Option 1: Using IDE (Recommended)
1. **Download IntelliJ IDEA Community** (free) or **Eclipse**
2. **Open the backend folder** as a project
3. **Wait for Maven to download dependencies** (automatic)
4. **Right-click on `BookExchangeApplication.java`** → Run
5. **Backend starts on** `http://localhost:8080`

### Option 2: Using Command Line (Simple)
```bash
# Navigate to backend folder
cd backend

# Run directly (Maven wrapper - no Maven installation needed)
./mvnw spring-boot:run
```

**Windows:**
```cmd
cd backend
mvnw.cmd spring-boot:run
```

### Option 3: Using Docker (If you have Docker)
```bash
cd backend
docker build -t boibondhu-backend .
docker run -p 8080:8080 boibondhu-backend
```

## 🗄️ Database Setup (Required)

### Easy MySQL Setup:
1. **Download XAMPP** (includes MySQL): https://www.apachefriends.org/
2. **Start XAMPP** → Start MySQL
3. **Open phpMyAdmin** (http://localhost/phpmyadmin)
4. **Create database**: Click "New" → Name: `book_exchange` → Create
5. **Import schema**: Click `book_exchange` → Import → Choose `backend/database/schema.sql`

### Alternative - H2 Database (No MySQL needed):
I can configure the app to use H2 (in-memory database) - no setup required!

## ⚡ Troubleshooting

### "Java not found"
- **Download Java 17**: https://adoptium.net/
- **Set JAVA_HOME** environment variable

### "Maven not found"
- Use `./mvnw` instead of `mvn` (Maven wrapper included)

### "Port 8080 already in use"
- **Kill process**: `netstat -ano | findstr :8080` (Windows)
- **Or change port** in `application.yml`: `server.port: 8081`

### "Database connection failed"
- **Check MySQL is running** (XAMPP control panel)
- **Verify credentials** in `application.yml`
- **Or use H2 database** (let me know if you want this)

## 🎯 Success Indicators
- ✅ Console shows: "Started BookExchangeApplication"
- ✅ Visit: http://localhost:8080/api/health
- ✅ Should return: "Backend server is running"

## 🆘 Still Having Issues?
Let me know which method you prefer and I'll help you set it up!