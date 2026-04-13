import React, { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const cannedAnswers = [
  { keywords: ['service', 'services'], answer: 'Our services are listed on the Services page. You can click any service for more details and pricing.' },
  { keywords: ['price', 'pricing', 'cost'], answer: 'Prices vary by service. Visit the Services page or contact us on WhatsApp for a custom quote.' },
  { keywords: ['contact', 'support'], answer: 'You can contact us through the Contact page or use the WhatsApp button for live support.' },
  { keywords: ['order', 'booking'], answer: 'To place an order, go to the Service detail page, select a service, and use the contact options.' },
  { keywords: ['about'], answer: 'Learn all about our company on the About page.' },
  { keywords: ['owner'], answer: 'Bikash Nahak From RIT College is the owner of this website.' },
  { keywords: ['hello', 'hi', 'hey'], answer: 'Hello there! Welcome to CREOVATE. How can I assist you today?' },
  { keywords: ['How it work'], answer: 'Those service want . It order on Whatsapp, then we start the Project, Then i send Watermarked items. After Payment I send the final items.' },
  { keywords: ['Delivery time'], answer: 'Premium take (1-2)days And Premium Pro take 24 Hours. Some Services may quick deliver.' },
];

function getBotReply(message) {
  if (!message || !message.trim()) return 'Please type a question so I can help you.';

  const lower = message.toLowerCase();
  for (const item of cannedAnswers) {
    if (item.keywords.some((word) => lower.includes(word))) {
      return item.answer;
    }
  }

  return 'Great question! Our support team can answer that in more detail. Please use the WhatsApp button or Contact page for urgent help.';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your site assistant. Ask me about services, pricing, or contact.' },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    const reply = getBotReply(userText);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 300);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-label="Chatbot">
          <div className="chatbot-header">
            <span><FaRobot /> Chatbot Helper</span>
            <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat"><FaTimes /></button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.sender}`}>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask me anything about the site..."
              aria-label="Chat message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <button className="chatbot-float" onClick={() => setIsOpen((prev) => !prev)} aria-label="Open chatbot">
        <FaRobot />
      </button>
    </>
  );
}
