#!/bin/bash
echo "========================================"
echo "   BoiBondhu Backend Server Starter"
echo "========================================"
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "ERROR: Java is not installed or not in PATH"
    echo "Please download Java 17 from: https://adoptium.net/"
    echo ""
    exit 1
fi

echo "✓ Java is installed"
echo ""

# Navigate to backend directory if not already there
if [ ! -f "pom.xml" ]; then
    if [ -d "backend" ]; then
        cd backend
        echo "✓ Navigated to backend directory"
    else
        echo "ERROR: Cannot find backend directory"
        exit 1
    fi
fi

echo "✓ Found backend project"
echo ""
echo "Starting backend server..."
echo "This may take a few minutes on first run..."
echo ""
echo "Backend will be available at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo ""

# Make Maven wrapper executable
chmod +x mvnw

# Use Maven wrapper (no Maven installation required)
./mvnw spring-boot:run

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to start backend server"
    echo ""
fi