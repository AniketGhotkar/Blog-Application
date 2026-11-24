
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMyPosts() {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch("http://localhost:3000/posts/user", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch your posts");
                }

                setPosts(data);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchMyPosts();
    }, []);

    async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");

    if (!confirmDelete) return;

    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3000/posts/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Failed to delete post");

        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
        alert(error.message);
    }
}

   function handleEdit(id) {
        navigate(`/edit-post/${id}`);
    }

    return (
        <div className="max-w-5xl mx-auto mt-10 px-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Posts</h1>

            <div className="flex flex-col gap-6">
                {posts.map((post) => (
                    <PostCard key={post._id} id={post._id} title={post.title}  showActions={true} content={post.content} author={post.user?.name || "Unknown"} onEdit={() => handleEdit(post._id)} onDelete={() => handleDelete(post._id)}/>
                ))}
            </div>

            {posts.length === 0 && <p className="text-center text-gray-500 bg-white p-6 rounded-lg shadow-sm">You haven't created any posts yet.</p>}
        </div>
    );
}

export default MyPosts;
