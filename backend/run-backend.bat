@echo off
echo Starting BoiBondhu Backend Server...
echo.
echo Prerequisites Check:
echo 1. Make sure MySQL is running
echo 2. Database 'book_exchange' exists  
echo 3. Schema has been imported
echo.

REM Check if we're already in backend directory
if not exist "pom.xml" (
    if exist "backend" (
        cd backend
    ) else (
        echo Error: Cannot find backend directory or pom.xml
        pause
        exit /b 1
    )
)

echo Installing dependencies...
call mvn clean install -q

if %ERRORLEVEL% neq 0 (
    echo Error: Maven build failed. Please check your Java and Maven installation.
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8080
echo Press Ctrl+C to stop the server
echo.
call mvn spring-boot:run