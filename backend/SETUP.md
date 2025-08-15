# BoiBondhu Backend Setup Guide

## Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Step-by-Step Setup

### 1. Install MySQL
Download and install MySQL from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

### 2. Create Database
Open MySQL command line or MySQL Workbench and run:
```sql
CREATE DATABASE book_exchange;
```

### 3. Configure Database Connection
Edit `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/book_exchange?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
    username: root  # Change to your MySQL username
    password: password  # Change to your MySQL password
```

### 4. Run Database Schema
Execute the SQL script:
```bash
mysql -u root -p book_exchange < backend/database/schema.sql
```

### 5. Install Dependencies and Run
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

## Test the Connection
Visit `http://localhost:8080/api/books` in your browser to see if the API is working.

## Default Users
- **Admin**: admin@bookapp.com / admin123
- **User**: john@example.com / user123

## Troubleshooting
- Make sure MySQL is running
- Check database credentials in application.yml
- Ensure port 8080 is not in use
- Check firewall settings