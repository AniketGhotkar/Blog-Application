
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch post");
                }

                setPost(data);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchPost();
    }, [id]);

    if (!post) return <p className="text-center mt-10 text-gray-600">Loading post...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 px-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
                <p className="text-gray-400 text-sm mt-3">Posted by {post.user?.name || "Unknown"}</p>
                <p className="text-gray-700 mt-6 leading-8 whitespace-pre-wrap">{post.content}</p>
            </div>
        </div>
    );
}

export default PostDetails;
