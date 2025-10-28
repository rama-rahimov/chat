import '../App.css'
import {useState} from "react";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
       <div className="card">
           <div className="card-body">
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
               <p>for registration click </p>
           </div>
       </div>
    )
}

export default App