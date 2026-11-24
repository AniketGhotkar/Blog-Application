
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import PostCard from "../components/PostCard";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { logout, token } = useAuth();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/get`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();

                if (response.status === 401) {
                    logout();
                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch posts");
                }

                setPosts(data);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchPosts();
    }, []);

    return (
        <div className="max-w-5xl mx-auto mt-10 px-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">All Posts</h1>

            {error && <p className="text-red-600">{error}</p>}

            <div className="flex flex-col gap-6">
                {posts.map((post) => (
                    <PostCard key={post._id} id={post._id} title={post.title} content={post.content} author={post.user?.name || "Unknown"} />
                ))}
            </div>

            {posts.length === 0 && !error && <p className="text-center text-gray-500 bg-white p-6 rounded-lg shadow-sm">No posts available.</p>}
        </div>
    );
}

export default Posts;
