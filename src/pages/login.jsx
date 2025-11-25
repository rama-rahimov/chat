import '../App.css'
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.length || !password.length) {
            alert("Please fill all fields");
        }else {
            const url = `/api/auth/login`;
            console.log('Fetch URL:', url);  // <-- вот здесь увидишь полный URL
            const result = await fetch(`${import.meta.env.VITE_TEST_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            const fullResult = await result.json();
            if (fullResult.error) {
                alert(fullResult.message);
            } else {
                alert('Succesfull!');
                localStorage.removeItem("token");
                localStorage.setItem('token', fullResult.token);
                console.log({tooookkeeenn: localStorage.getItem('token')});
                navigate("/main");
            }
        }
    }
    return (
       <div className="card">
           <form onSubmit={handleSubmit} className="card-body">
               <h1>Welcome to Simple Chat</h1>
               <h2>Login</h2>
               <div className="row">
                   <label htmlFor="email">Email</label>
                   <input value={email} className="inputs" onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className="row">
                   <label htmlFor="password">Password</label>
                   <input type="password" value={password} className="inputs"   onChange={(e) => setPassword(e.target.value)} />
               </div>
               <button className="btn btn-primary btn-lg btn-block" type="submit">Apply</button>
               <p>for registration click <Link to='/registration'>registration</Link></p>
           </form>
       </div>
    )
}

export default Login
