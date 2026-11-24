import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
  async function handleSubmit(e) {
    e.preventDefault();

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        alert("Registration successful!");

        setName("");
        setEmail("");
        setPassword("");
        navigate("/");
    } catch (error) {
        alert(error.message);
    }
}

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">

            <h2 className="text-2xl font-bold mb-6">Create Account</h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                <input type="text" placeholder="Enter your name" value={name} onChange = {(e) => setName(e.target.value)} className="border p-3 rounded-lg"/>

                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 rounded-lg"/>

                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-3 rounded-lg"/>

                <button type="submit" className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">Register</button>
            </form>
        </div>
    );
}

export default Register;