import "./main.css";
import {useEffect, useState} from "react";
function RightSide({ messages = [], selectedUserId, socket, myData }) {
    const [message, setMessage] = useState("");
    const [arrMessage, setArrMessage] = useState([]);
    const [userId, setUserId] = useState(null);
    function handleSubmit(e){
        e.preventDefault();
        socket.emit('send_message', {
            message, id: userId
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
        setUserId(selectedUserId)
    },[messages, selectedUserId]);
    console.log({arrMessage});
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
                {userId ? <div className="input-box">
                    <input value={message} type="text" placeholder="Write a message..." onChange={(e) => setMessage(e.target.value)} />
                </div>: ""}
            </div>
        </form>
    )
}

export default RightSide;