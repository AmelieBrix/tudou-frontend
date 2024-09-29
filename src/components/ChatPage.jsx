import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';
let socket = '';

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  console.log("user",user);
  const { chatId } = useParams(); // Use the useParams hook to get chatId from the URL
  const [loading, setLoading] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef(null); // For scrolling to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Setup the WebSocket connection
    socket = io(`${API_URL}`);

    // Fetch the messages for this chat using the chatId
    axios.get(`${API_URL}/messages/${chatId}`)
      .then((response) => {
        setMessageList(response.data);
        setLoading(false);
        scrollToBottom();
      });

    // Join the specific chat room via WebSocket
    socket.emit('join_chat', chatId);

    // Handle receiving new messages via WebSocket
    socket.on('receive_message', (data) => {
      setMessageList((prevList) => [...prevList, data]);
      scrollToBottom();
    });

    // Cleanup when component unmounts (disconnect socket)
    return () => {
      socket.disconnect();
    };
  }, [chatId]); // Re-run this effect when chatId changes

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

    // Send message via WebSocket
    await socket.emit('send_message', messageContent);

    // Optimistically update the message list
    setMessageList((prevList) => [...prevList, messageContent.content]);
    setCurrentMessage('');
    scrollToBottom();
  };

  if (loading) {
    return <p>Loading all messages...</p>;
  }

  return (
    <div>
      <h3>You're in the Chat Page</h3>
      <div className="chatContainer">
        <div className="messages">
          {messageList.map((val) => (
            <div key={val._id} className="messageContainer" id={val.sender.username === user.username ? 'You' : 'Other'}>
              <div className="messageIndividual">
                {val.sender.username}: {val.message}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} style={{ float: 'left', clear: 'both' }} />
        </div>
        <div className="messageInputs">
          <input
            value={currentMessage}
            type="text"
            placeholder="Message..."
            onChange={handleMessageInput}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
