import React, { useState } from 'react';
import { User, Edit, Save, X, BookOpen, Heart, RefreshCw, Star, Calendar, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBooks } from '../../context/BookContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const { books, reviews, wishlist, exchangeRequests } = useBooks();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  const userBooks = books.filter(book => book.sellerId === user?.id);
  const userReviews = reviews.filter(review => review.userId === user?.id);
  const userWishlist = wishlist.filter(item => item.userId === user?.id);
  const userExchangeRequests = exchangeRequests.filter(req => req.requesterId === user?.id);

  const handleSave = () => {
    // In a real app, this would make an API call to update user data
    console.log('Saving user data:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      username: user?.username || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User size={48} className="text-white" />
              </div>
              <div className="text-white">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editData.username}
                      onChange={(e) => setEditData({...editData, username: e.target.value})}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                      placeholder="Username"
                    />
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                      placeholder="Email"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold">{user.username}</h1>
                    <div className="flex items-center mt-2">
                      <Mail size={16} className="mr-2" />
                      <span className="text-blue-100">{user.email}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-blue-100">Joined {user.joinedDate}</span>
                    </div>
                    {user.isAdmin && (
                      <span className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium mt-2">
                        Admin
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors"
                  >
                    <Save size={20} />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                >
                  <Edit size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-gray-50">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
              <BookOpen size={24} className="text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{userBooks.length}</div>
            <div className="text-sm text-gray-600">Books Listed</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
              <Heart size={24} className="text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{userWishlist.length}</div>
            <div className="text-sm text-gray-600">Wishlist Items</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
              <RefreshCw size={24} className="text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{userExchangeRequests.length}</div>
            <div className="text-sm text-gray-600">Exchange Requests</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
              <Star size={24} className="text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{userReviews.length}</div>
            <div className="text-sm text-gray-600">Reviews Written</div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-8">
          {/* My Books */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">My Books</h3>
            {userBooks.length === 0 ? (
              <p className="text-gray-600">You haven't listed any books yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userBooks.slice(0, 6).map(book => (
                  <div key={book.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <img
                      src={book.images[0]}
                      alt={book.title}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h4 className="font-medium text-gray-900 mb-1">{book.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                    <div className="flex justify-between items-center">
                      {book.forSale && (
                        <span className="text-green-600 font-semibold">${book.price}</span>
                      )}
                      <div className="flex gap-1">
                        {book.forSale && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Sale</span>
                        )}
                        {book.forExchange && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Exchange</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Reviews */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Reviews</h3>
            {userReviews.length === 0 ? (
              <p className="text-gray-600">You haven't written any reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {userReviews.slice(0, 3).map(review => {
                  const book = books.find(b => b.id === review.bookId);
                  return (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{book?.title}</h4>
                          <div className="flex items-center mt-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                size={16}
                                className={`${
                                  star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.createdAt}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;