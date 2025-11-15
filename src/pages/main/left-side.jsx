import "./main.css";
import {useEffect, useState} from "react";
function LeftSide({ setMessages, setSelectedUserId }) {
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    function  getAllMessages(e, user2Id) {
        e.preventDefault();
        (async () => {
            try {
                const messagesJson = await fetch(`${import.meta.env.VITE_TEST_API_URL}/api/chat/${user2Id}`,{
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                setSelectedUserId(user2Id);
                const messages = await messagesJson.json();
                if (messages.error) {
                    alert(messages.message);
                }else {
                    setMessages((messages.Message || []).length ? messages.Message.map(el => ({ ...el, message: el.text})): []);
                }
            }catch(err) {
                console.log(err);
                alert(err.message);
            }
        })()
    }
    useEffect(() => {
        (async () => {
            try {
                const usersJson = await fetch(`${import.meta.env.VITE_TEST_API_URL}/api/profile/users`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const users = await usersJson.json();
                if(users.error) throw new Error(users.message);
                setUsers(users);
            }catch(err) {
                console.log(err);
                alert(err.message);
            }
        })()
    },[])
    return (
        <div className="left-card">
            <h1>Chats</h1>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            {
                users.map((user, index) => (<h2 key={index} onClick={(e) => getAllMessages(e, user.id)}>{user.name}</h2>))
            }
        </div>
    )
}

export default LeftSide;