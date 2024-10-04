import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import "./ChatPage.css";
import { useTranslation } from "react-i18next";


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';
let socket = '';

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const { chatId } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatPartner, setChatPartner] = useState('');
  const messagesEndRef = useRef(null); 
  const { t } = useTranslation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    socket = io(`${API_URL}`);
    axios.get(`${API_URL}/messages/${chatId}`)
      .then((response) => {
        setMessageList(response.data);
        
        setLoading(false);
        scrollToBottom();
      });

    socket.emit('join_chat', chatId);

    socket.on('receive_message', (data) => {
      setMessageList((prevList) => [...prevList, data]);
      scrollToBottom();
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId]); 

  const handleMessageInput = (e) => {
    setCurrentMessage(e.target.value);
  };


  const sendMessage = async () => {
    const messageContent = {
      chatId: chatId,
      content: {
        sender: user,
        message: currentMessage,
      },
    };


    await socket.emit('send_message', messageContent);


    setMessageList((prevList) => [...prevList, messageContent.content]);
    setCurrentMessage('');
    scrollToBottom();
  };

  function getGermanyTime(){
    const now = new Date();
    const germanyTime = now.toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin' });
    return germanyTime;
  }

  if (loading) {
    return (
      <>
        <Spinner />
        <p>{t('Loading')}</p>
      </>
    );
  }

  return (
    <div className="chat-page">
      <h3>{t('ChatPage')}</h3>
      <div className="chat-container">
        <div className="messages">
          {messageList.map((val, index) => (
            <div
              key={index}
              className={`message ${val.sender.username === user.username ? 'sent' : 'received'}`}
            >
              <div className="message-content">{getGermanyTime()} - {val.sender.username}: {val.message}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="message-inputs">
          <input
            value={currentMessage}
            type="text"
            placeholder="Message..."
            onChange={handleMessageInput}
            className="message-input"
          />
          <button onClick={sendMessage} className="send-button">{t('Send')}</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
