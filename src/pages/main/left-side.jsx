import "./main.css";
import {useCallback, useEffect, useState} from "react";
import {debounce} from "../../common/Func.js";
function LeftSide({ setMessages, setSelectedUserId, setRoomId }) {
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    async function getAllUsers() {
        const usersJson = await fetch(`${import.meta.env.VITE_TEST_API_URL}/api/profile/users`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        const users = await usersJson.json();
        if(users.error) throw new Error(users.message);
        setUsers(users);
    }
    function  getAllMessages(e, user) {
        e.preventDefault();
        (async () => {
            try {
                const messagesJson = await fetch(`${import.meta.env.VITE_TEST_API_URL}/api/chat/${user2Id}`,{
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                setSelectedUserId({ userId:user.id, isBot: user.isBot });
                const data = await messagesJson.json();
                if (data.error) {
                    alert(data.message);
                }else {
                    setMessages((data.messages || []).length ? data.messages.map(el => ({ ...el, message: el.text})): []);
                    setRoomId(data.roomId)
                }
            }catch(err) {
                console.log(err);
                alert(err.message);
            }
        })()
    }
    const search = useCallback(debounce( (name) => {
        (async ()=> {
            const usersJson = await fetch(`${import.meta.env.VITE_TEST_API_URL}/api/profile/find/${name}`,{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            const users =  await usersJson.json();
            setUsers(users);
        })()
    }, 500),[]);
    const findUsers = async (e) => {
       e.preventDefault();
       if(!e.target.value){
           setName(e.target.value);
          await getAllUsers();
       }else {
           setName(e.target.value);
           search(e.target.value);
       }
    }
    useEffect(() => {
        (async () => {
            try {
                await getAllUsers();
            }catch(err) {
                console.log(err);
                alert(err.message);
            }
        })()
    },[])
    return (
        <div className="left-card">
            <h1>Chats</h1>
            <input value={name} onChange={findUsers} />
            {
                users.map((user, index) => (<h2 key={index} onClick={(e) => getAllMessages(e, user)}>{user.name}</h2>))
            }
        </div>
    )
}

export default LeftSide;