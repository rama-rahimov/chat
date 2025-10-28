import '../App.css'
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        navigate("/main");
    }
    useEffect(() => {
        (async () => {
            try {
                let res = await fetch("http://localhost:3000/api");
                console.log({res:res.json()});
            }catch(err) {
                console.log({err: err.message});
            }
        })()
    })
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
                   <input value={password} className="inputs"  onChange={(e) => setPassword(e.target.value)} />
               </div>
               <button className="btn btn-primary btn-lg btn-block" type="submit">Apply</button>
               <p>for registration click <Link to='/registration'>registration</Link></p>
           </form>
       </div>
    )
}

export default App