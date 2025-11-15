import './main.css'
import { io } from 'socket.io-client'
import LeftSidebar from './left-side.jsx';
import RightSidebar from './right-side.jsx';
import {useEffect, useState} from "react";

function Main() {
    const [myData, setMyData] = useState({});
    const [messages, setMessages] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [socket, setSocket] = useState(null); // пока нет сокета

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return ;
        fetch(`${import.meta.env.VITE_TEST_API_URL}/api/profile/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => response.json()).then((data) => {
            setMyData(data);
        })
        const newSocket = io(`${import.meta.env.VITE_TEST_API_URL}/chat`, {
            autoConnect:false,
            auth: { token }
        });
        setSocket(newSocket);
        newSocket.connect()
        newSocket.on('connect', () => {
            console.log("Connected urrraaa: ", newSocket.id);
        });
        newSocket.on('message', (data) => {
            console.log('💬 New message:', data);
        });
        return () => {
            newSocket.off('message');
            newSocket.disconnect(); // отключаем, если пользователь закрыл приложение
        };

    },[])
    return (
      <div className="main-card">
         <LeftSidebar setMessages={setMessages} setSelectedUserId={setSelectedUserId} />
          {socket && <RightSidebar messages={messages} selectedUserId={selectedUserId} socket={socket} myData={myData} />}
      </div>
    )
}

export default Main;
