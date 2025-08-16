#!/bin/bash
echo "Starting BoiBondhu Backend Server..."
echo ""
echo "Prerequisites Check:"
echo "1. Make sure MySQL is running"
echo "2. Database 'book_exchange' exists"
echo "3. Schema has been imported"
echo ""

# Check if we're already in backend directory
if [ ! -f "pom.xml" ]; then
    if [ -d "backend" ]; then
        cd backend
    else
        echo "Error: Cannot find backend directory or pom.xml"
        exit 1
    fi
fi

echo "Installing dependencies..."
mvn clean install -q

if [ $? -ne 0 ]; then
    echo "Error: Maven build failed. Please check your Java and Maven installation."
    exit 1
fi

echo ""
echo "Starting Spring Boot application..."
echo "Backend will be available at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo ""
mvn spring-boot:run