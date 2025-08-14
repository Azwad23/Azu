# BoiBondhu Backend API

Spring Boot REST API for the BoiBondhu book exchange platform.

## Setup

### Prerequisites
- Java 17+
- Maven 3.6+
- MySQL 8.0+

### Database Setup
1. Create MySQL database:
```sql
CREATE DATABASE book_exchange;
```

2. Update database credentials in `src/main/resources/application.yml`

3. Run the schema:
```bash
mysql -u your_username -p book_exchange < database/schema.sql
```

### Run Application
```bash
mvn clean install
mvn spring-boot:run
```

API will be available at: http://localhost:8080/api

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Books
- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Create book (authenticated)
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### Search & Filter
- `GET /api/books/search?q={query}` - Search books
- `GET /api/books/genre/{genre}` - Filter by genre
- `GET /api/books/for-sale` - Books for sale
- `GET /api/books/for-exchange` - Books for exchange

## Security

- JWT-based authentication
- BCrypt password encryption
- CORS enabled for frontend
- Role-based access control

## Default Users

- **Admin**: admin@bookexchange.com / password
- **User**: john@example.com / password