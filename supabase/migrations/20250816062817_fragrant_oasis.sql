-- Insert sample admin user (password: admin123)
INSERT INTO users (username, email, password, is_admin, joined_date) VALUES 
('admin', 'admin@bookapp.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', TRUE, CURRENT_TIMESTAMP);

-- Insert sample regular user (password: user123)
INSERT INTO users (username, email, password, is_admin, joined_date) VALUES 
('johndoe', 'john@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', FALSE, CURRENT_TIMESTAMP);

-- Insert sample books
INSERT INTO books (title, author, isbn, genre, condition, price, description, seller_id, published_year, page_count, for_sale, for_exchange, is_available, created_at) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 'Classic Literature', 'GOOD', 12.99, 'A classic American novel about the Jazz Age.', 2, 1925, 180, TRUE, TRUE, TRUE, CURRENT_TIMESTAMP),
('To Kill a Mockingbird', 'Harper Lee', '9780060935467', 'Classic Literature', 'LIKE_NEW', 14.50, 'A gripping tale of racial injustice and childhood innocence.', 1, 1960, 281, TRUE, FALSE, TRUE, CURRENT_TIMESTAMP),
('1984', 'George Orwell', '9780451524935', 'Science Fiction', 'GOOD', 11.25, 'A dystopian social science fiction novel.', 2, 1949, 328, FALSE, TRUE, TRUE, CURRENT_TIMESTAMP),
('Pride and Prejudice', 'Jane Austen', '9780141439518', 'Romance', 'NEW', 16.99, 'A romantic novel of manners written by Jane Austen.', 1, 1813, 432, TRUE, TRUE, TRUE, CURRENT_TIMESTAMP),
('The Catcher in the Rye', 'J.D. Salinger', '9780316769174', 'Classic Literature', 'FAIR', 9.99, 'A controversial novel originally published for adults.', 2, 1951, 277, TRUE, FALSE, TRUE, CURRENT_TIMESTAMP);

-- Insert sample book images
INSERT INTO book_images (book_id, image_url) VALUES
(1, 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'),
(2, 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'),
(3, 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'),
(4, 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'),
(5, 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg');