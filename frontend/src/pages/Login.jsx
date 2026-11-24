import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Login failed");
            }

           login(data.token);

            alert("Login successfull!");

            setEmail("");
            setPassword("");
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Login Account</h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"  className="border p-3 rounded-lg"/>

                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" className="border p-3 rounded-lg"/>

                <button  className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;