#!/bin/bash
echo "Starting BoiBondhu Backend Server..."
echo ""
echo "Make sure MySQL is running and database is set up!"
echo ""
cd backend
echo "Installing dependencies..."
mvn clean install -q
echo ""
echo "Starting Spring Boot application..."
mvn spring-boot:run