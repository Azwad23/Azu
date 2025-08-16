@echo off
echo ========================================
echo    BoiBondhu Backend Server Starter
echo ========================================
echo.

REM Check if Java is installed
java -version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please download Java 17 from: https://adoptium.net/
    echo.
    pause
    exit /b 1
)

echo ✓ Java is installed
echo.

REM Navigate to backend directory if not already there
if not exist "pom.xml" (
    if exist "backend" (
        cd backend
        echo ✓ Navigated to backend directory
    ) else (
        echo ERROR: Cannot find backend directory
        pause
        exit /b 1
    )
)

echo ✓ Found backend project
echo.
echo Starting backend server...
echo This may take a few minutes on first run...
echo.
echo Backend will be available at: http://localhost:8080
echo Press Ctrl+C to stop the server
echo.

REM Use Maven wrapper (no Maven installation required)
call mvnw.cmd spring-boot:run

if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Failed to start backend server
    echo.
    pause
)