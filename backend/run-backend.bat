@echo off
echo Starting BoiBondhu Backend Server...
echo.
echo Make sure MySQL is running and database is set up!
echo.
cd backend
echo Installing dependencies...
call mvn clean install -q
echo.
echo Starting Spring Boot application...
call mvn spring-boot:run