'use client'
import { useContext, useEffect, useState } from 'react';
import { BookmarkIcon, EyeIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { AuthContext } from '@/context/store';
import Link from 'next/link';

const SavedPostsPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await axios.get('http://localhost:7001/api/post/saved', {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
        });
        setSavedPosts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load saved posts');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSavedPosts();
  }, [auth.token]);

  const unsavePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:7001/api/post/${postId}/save`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      });
      setSavedPosts(savedPosts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Error unsaving post:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <BookmarkIcon className="h-8 w-8 text-indigo-600 mr-2" />
            Saved Posts
          </h1>
          <p className="text-gray-500">
            {savedPosts.length} {savedPosts.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {/* Saved Posts Grid */}
        {savedPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPosts.map((post) => (
              <div 
                key={post._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {post.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <button
                      onClick={() => unsavePost(post._id)}
                      className="text-indigo-600 hover:text-indigo-800 transition-colors ml-2"
                      aria-label="Unsave post"
                    >
                      <BookmarkIcon className="h-5 w-5 fill-current" />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {post.descriptions}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>{post.author?.username || 'Unknown'}</span>
                  </div>
                </div>
                
                {/* View Button */}
                <div className="px-4 pb-4">
                  <Link 
                    href={`/view/${post._id}`} 
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookmarkIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No saved posts</h3>
            <p className="mt-1 text-gray-500">
              Save posts to view them here later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPostsPage;