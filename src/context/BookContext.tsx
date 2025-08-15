import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book, Review, ExchangeRequest, WishlistItem } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

interface BookContextType {
  books: Book[];
  reviews: Review[];
  exchangeRequests: ExchangeRequest[];
  wishlist: WishlistItem[];
  loading: boolean;
  addBook: (book: Omit<Book, 'id' | 'createdAt'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  addToWishlist: (userId: string, bookId: string) => void;
  removeFromWishlist: (userId: string, bookId: string) => void;
  createExchangeRequest: (request: Omit<ExchangeRequest, 'id' | 'createdAt'>) => void;
  updateExchangeRequest: (id: string, status: ExchangeRequest['status']) => void;
  fetchBooks: () => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [exchangeRequests, setExchangeRequests] = useState<ExchangeRequest[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        headers: getAuthHeaders(),
      });
      
      if (response.ok) {
        const data = await response.json();
        const formattedBooks: Book[] = (Array.isArray(data) ? data : []).map((book: any) => ({
          id: book.id.toString(),
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          genre: book.genre,
          condition: book.condition.toLowerCase().replace('_', '-'),
          price: parseFloat(book.price),
          description: book.description,
          images: book.images?.length > 0 ? book.images : ['https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'],
          sellerId: book.seller?.id?.toString() || '1',
          sellerName: book.seller?.username || 'Unknown',
          isAvailable: book.isAvailable,
          publishedYear: book.publishedYear,
          language: book.language,
          pageCount: book.pageCount,
          createdAt: new Date(book.createdAt).toISOString().split('T')[0],
          forSale: book.forSale,
          forExchange: book.forExchange
        }));
        setBooks(formattedBooks);
      } else {
        console.error('Failed to fetch books');
        // Fallback to sample data if backend is not available
        const sampleBooks: Book[] = [
          {
            id: '1',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            isbn: '9780743273565',
            genre: 'Classic Literature',
            condition: 'good',
            price: 12.99,
            description: 'A classic American novel about the Jazz Age.',
            images: ['https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'],
            sellerId: '2',
            sellerName: 'johndoe',
            isAvailable: true,
            publishedYear: 1925,
            language: 'English',
            pageCount: 180,
            createdAt: '2024-01-01',
            forSale: true,
            forExchange: true
          }
        ];
        setBooks(sampleBooks);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      // Fallback to sample data
      const sampleBooks: Book[] = [
        {
          id: '1',
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          isbn: '9780743273565',
          genre: 'Classic Literature',
          condition: 'good',
          price: 12.99,
          description: 'A classic American novel about the Jazz Age.',
          images: ['https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'],
          sellerId: '2',
          sellerName: 'johndoe',
          isAvailable: true,
          publishedYear: 1925,
          language: 'English',
          pageCount: 180,
          createdAt: '2024-01-01',
          forSale: true,
          forExchange: true
        }
      ];
      setBooks(sampleBooks);
    } finally {
      setLoading(false);
    }
  };
  const addBook = async (bookData: Omit<Book, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: bookData.title,
          author: bookData.author,
          isbn: bookData.isbn,
          genre: bookData.genre,
          condition: bookData.condition.toUpperCase().replace('-', '_'),
          price: bookData.price,
          description: bookData.description,
          images: bookData.images,
          publishedYear: bookData.publishedYear,
          language: bookData.language,
          pageCount: bookData.pageCount,
          forSale: bookData.forSale,
          forExchange: bookData.forExchange
        }),
      });
      
      if (response.ok) {
        fetchBooks(); // Refresh the books list
      } else {
        console.error('Failed to add book');
        // Fallback to local state update
        const newBook: Book = {
          ...bookData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split('T')[0]
        };
        setBooks(prev => [...prev, newBook]);
      }
    } catch (error) {
      console.error('Error adding book:', error);
      // Fallback to local state update
      const newBook: Book = {
        ...bookData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setBooks(prev => [...prev, newBook]);
    }
  };

  const updateBook = (id: string, bookData: Partial<Book>) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...bookData } : book
    ));
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [...prev, newReview]);
  };

  const addToWishlist = (userId: string, bookId: string) => {
    const newWishlistItem: WishlistItem = {
      id: Date.now().toString(),
      userId,
      bookId,
      addedAt: new Date().toISOString().split('T')[0]
    };
    setWishlist(prev => [...prev, newWishlistItem]);
  };

  const removeFromWishlist = (userId: string, bookId: string) => {
    setWishlist(prev => prev.filter(item => 
      !(item.userId === userId && item.bookId === bookId)
    ));
  };

  const createExchangeRequest = (requestData: Omit<ExchangeRequest, 'id' | 'createdAt'>) => {
    const newRequest: ExchangeRequest = {
      ...requestData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setExchangeRequests(prev => [...prev, newRequest]);
  };

  const updateExchangeRequest = (id: string, status: ExchangeRequest['status']) => {
    setExchangeRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status } : req
    ));
  };

  return (
    <BookContext.Provider value={{
      books,
      reviews,
      exchangeRequests,
      wishlist,
      loading,
      addBook,
      updateBook,
      deleteBook,
      addReview,
      addToWishlist,
      removeFromWishlist,
      createExchangeRequest,
      updateExchangeRequest,
      fetchBooks
    }}>
      {children}
    </BookContext.Provider>
  );
};