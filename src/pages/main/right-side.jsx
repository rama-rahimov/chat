import "./main.css";
import {useEffect, useState} from "react";
function RightSide({ messages = [], selectedUserId, socket, myData, roomId }) {
    const [message, setMessage] = useState("");
    const [arrMessage, setArrMessage] = useState([]);
    const [user, setUser] = useState({});
    function handleSubmit(e){
        e.preventDefault();
        socket.emit('send_message', {
          message, ...user, type: 1, roomId
        });
        setMessage("")
    }
    useEffect(() => {
        const handler = (mes) => {
            console.log("Got message:", mes);
          setArrMessage(prev => [...prev, { id: mes.id, message: mes.message, senderId: mes.senderId }]);
        }
        socket.on('message', handler);
        return () => {
            socket.off('message', handler);
        }
    },[]);
    useEffect(() => {
        setArrMessage(messages);
        setUser({toUserId: (selectedUserId || {}).userId, isBot: (selectedUserId || {}).isBot});
        socket.emit("joinRoom", roomId);
    },[messages, selectedUserId, roomId]);
    return (
        <form onSubmit={handleSubmit} className="right-card">
            <div className="chat-container">
                <div className="messages">
                    {
                        arrMessage.map((mes, index) => (
                            <div key={index} className={mes.senderId !== myData.id ? "" : "right-text"}>{mes.message}</div>
                        ))
                    }
                </div>
                {user.toUserId ? <div className="input-box">
                    <input value={message} type="text" placeholder="Write a message..." onChange={(e) => setMessage(e.target.value)} />
                </div>: ""}
            </div>
        </form>
    )
}

export default RightSide;