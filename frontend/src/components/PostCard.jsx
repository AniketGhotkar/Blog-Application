
import { Link } from "react-router-dom";

function PostCard({ id, title, content, author, showActions = false, onEdit, onDelete }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <Link to={`/posts/${id}`}>
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <p className="text-gray-600 mt-3">{content}</p>
                <p className="text-sm text-gray-400 mt-4">Posted by {author}</p>
            </Link>

            {showActions && (
                <div className="flex gap-4 mt-5">
                    <button onClick={onEdit} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Edit</button>
                    <button onClick={onDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Delete</button>
                </div>
            )}
        </div>
    );
}

export default PostCard;
