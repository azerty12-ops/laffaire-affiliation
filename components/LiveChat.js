import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';

export default function LiveChat() {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Messages de démonstration du service client
  const demoResponses = [
    "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    "Merci pour votre message. Je vérifie cette information pour vous.",
    "Bien sûr, je serais ravi de vous aider avec cela.",
    "Avez-vous d'autres questions sur nos produits ?",
    "Je comprends votre préoccupation. Laissez-moi vous expliquer comment cela fonctionne.",
    "N'hésitez pas à me demander si vous avez d'autres questions !",
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (userName.trim() === '' || userEmail.trim() === '') return;
    
    setIsFormSubmitted(true);
    // Ajouter un message de bienvenue
    setMessages([
      {
        id: Date.now(),
        sender: 'agent',
        text: `Bonjour ${userName}, bienvenue sur notre assistance en ligne. Comment puis-je vous aider aujourd'hui ?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    // Simuler la réponse du service client
    setIsTyping(true);
    setTimeout(() => {
      const agentMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        text: demoResponses[Math.floor(Math.random() * demoResponses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prevMessages => [...prevMessages, agentMessage]);
      setIsTyping(false);
      
      if (!isOpen) {
        setUnreadCount(prevCount => prevCount + 1);
      }
    }, 1500 + Math.random() * 1500); // Délai aléatoire entre 1.5 et 3 secondes
  };

  // Effet pour faire défiler vers le bas lorsque de nouveaux messages arrivent
  useEffect(() => {
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className={`live-chat-container ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <h3>Assistance en direct</h3>
          <button className="close-chat" onClick={toggleChat}>&times;</button>
        </div>
        
        {!isFormSubmitted ? (
          <div className="chat-form-container">
            <p>Veuillez remplir ce formulaire pour commencer la conversation.</p>
            <form onSubmit={handleSubmitForm} className="chat-form">
              <div className="form-group">
                <label htmlFor="userName">Nom</label>
                <input 
                  type="text" 
                  id="userName" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="userEmail">Email</label>
                <input 
                  type="email" 
                  id="userEmail" 
                  value={userEmail} 
                  onChange={(e) => setUserEmail(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="start-chat-btn">Démarrer la conversation</button>
            </form>
          </div>
        ) : (
          <>
            <div className="chat-messages">
              {messages.map(message => (
                <div key={message.id} className={`message ${message.sender}`}>
                  {message.sender === 'agent' && (
                    <div className="agent-avatar">
                      <span>CS</span>
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">{message.time}</div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message agent typing">
                  <div className="agent-avatar">
                    <span>CS</span>
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSendMessage} className="chat-input">
              <input 
                type="text" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                placeholder="Tapez votre message ici..." 
              />
              <button type="submit" disabled={newMessage.trim() === ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                </svg>
              </button>
            </form>
          </>
        )}
      </div>
      
      <button 
        className="chat-toggle-button" 
        onClick={toggleChat}
        aria-label="Ouvrir le chat d'assistance"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
        </svg>
        {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
      </button>
      
      <style jsx>{`
        .live-chat-container {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 350px;
          height: 450px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          transition: transform 0.3s, opacity 0.3s;
          transform: translateY(100%);
          opacity: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .live-chat-container.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        
        .chat-header {
          background-color: var(--primary-color);
          color: white;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .chat-header h3 {
          margin: 0;
        }
        
        .close-chat {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          line-height: 1;
        }
        
        .chat-form-container {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .chat-form-container p {
          margin-bottom: 1.5rem;
          color: #666;
        }
        
        .chat-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group label {
          font-weight: 500;
        }
        
        .form-group input {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .start-chat-btn {
          background-color: var(--primary-color);
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 1rem;
          transition: background-color 0.2s;
        }
        
        .start-chat-btn:hover {
          background-color: #3a4e64;
        }
        
        .chat-messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .message {
          display: flex;
          align-items: flex-start;
          max-width: 80%;
        }
        
        .message.user {
          margin-left: auto;
          flex-direction: row-reverse;
        }
        
        .agent-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--primary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 0.5rem;
        }
        
        .message-content {
          background-color: #f1f0f0;
          padding: 0.75rem;
          border-radius: 12px;
          position: relative;
        }
        
        .message.user .message-content {
          background-color: #e3f2fd;
        }
        
        .message-text {
          margin-bottom: 0.25rem;
          word-break: break-word;
        }
        
        .message-time {
          font-size: 0.7rem;
          color: #999;
          text-align: right;
        }
        
        .typing-indicator {
          display: flex;
          gap: 0.25rem;
          padding: 0.5rem 0;
        }
        
        .typing-indicator span {
          width: 8px;
          height: 8px;
          background-color: #aaa;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .chat-input {
          display: flex;
          padding: 1rem;
          border-top: 1px solid #eee;
          background-color: white;
        }
        
        .chat-input input {
          flex-grow: 1;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 50px;
          margin-right: 0.5rem;
          font-size: 1rem;
        }
        
        .chat-input button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--primary-color);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .chat-input button:hover {
          background-color: #3a4e64;
        }
        
        .chat-input button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        .chat-toggle-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--primary-color);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 999;
          transition: transform 0.3s;
        }
        
        .chat-toggle-button:hover {
          transform: scale(1.1);
        }
        
        .unread-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--error-color);
          color: white;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        @media (max-width: 480px) {
          .live-chat-container {
            width: 100%;
            height: 100%;
            bottom: 0;
            right: 0;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  );
}
