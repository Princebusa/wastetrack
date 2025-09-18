
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../layout/Layout';

const Social = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [newPost, setNewPost] = useState({
        description: '',
        isAnonymous: true,
        image: null
    });
    const { user } = useAuth();

    // Fetch posts
    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/posts');
            const data = await response.json();
            if (data.success) {
                setPosts(data.data);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Create new post
    

    // Vote on post
    const handleVote = async (postId, voteType) => {
        if (!user) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/posts/${postId}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ voteType })
            });
            const data = await response.json();
            if (data.success) {
                fetchPosts(); // Refresh posts
            }
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    // Remove vote
    const handleRemoveVote = async (postId) => {
        if (!user) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/posts/${postId}/vote`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                fetchPosts(); // Refresh posts
            }
        } catch (error) {
            console.error('Error removing vote:', error);
        }
    };

    const formatTimeAgo = (date) => {
        const now = new Date();
        const postDate = new Date(date);
        const diffInSeconds = Math.floor((now - postDate) / 1000);
        
        if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <Layout>
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Community Feed</h1>
               
            </div>

            {/* Create Post Form */}
           

            {/* Posts Feed */}
            <div className="space-y-4">
                {posts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <p>No posts yet. Be the first to share something!</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className="bg-white rounded-lg border border-gray-200 p-6">
                            {/* Post Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-gray-600">
                                            {post.isAnonymous ? '?' : (post.user?.username?.[0] || 'U')}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {post.isAnonymous ? 'Anonymous' : (post.user?.username || 'Unknown')}
                                        </p>
                                        <p className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="mb-4">
                                <p className="text-gray-800 whitespace-pre-wrap">{post.description}</p>
                                {post.imageUrl && (
                                    <img
                                        src={post.imageUrl}
                                        alt="Post"
                                        className="mt-3 rounded-lg max-w-full h-auto"
                                    />
                                )}
                            </div>

                            {/* Voting Section */}
                            <div className="flex items-center space-x-4 pt-3 border-t border-gray-100">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => post.userUpvoted ? handleRemoveVote(post._id) : handleVote(post._id, 'upvote')}
                                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                                            post.userUpvoted 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className="text-lg">↑</span>
                                        <span>{post.upvoteCount}</span>
                                    </button>
                                    
                                    <button
                                        onClick={() => post.userDownvoted ? handleRemoveVote(post._id) : handleVote(post._id, 'downvote')}
                                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                                            post.userDownvoted 
                                                ? 'bg-red-100 text-red-700' 
                                                : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className="text-lg">↓</span>
                                        <span>{post.downvoteCount}</span>
                                    </button>
                                </div>
                                
                                <div className="text-sm text-gray-500">
                                    Score: <span className={`font-medium ${post.score >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {post.score}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div></Layout>
    );
};

export default Social;