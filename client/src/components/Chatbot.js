import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

// TODO: Connect to a real chatbot API (e.g., Dialogflow, OpenAI, Botpress)
// Currently uses predefined responses as a demo
const responses = {
  greet: ['Hello! Welcome to Golden River Perfume. How can I assist you today?', 'Welcome! I\'m here to help you find your perfect scent. What are you looking for?'],
  bestseller: ['Our bestseller is "Oud Amber Royale" — a majestic blend of rare Cambodian oud and warm amber. Would you like to know more?'],
  price: ['Our fragrances range from $155 to $265. Each bottle is handcrafted and uses only the finest botanicals.'],
  shipping: ['We offer free shipping on orders over $150. Standard delivery takes 3–5 business days, and express is available too!'],
  return: ['We have a 30-day return policy for unopened items. Your satisfaction is our priority.'],
  default: ['That\'s a great question! For detailed information, feel free to contact our team at hello@goldenriverperfume.com or visit our Contact page.'],
};

const getResponse = (msg) => {
  const m = msg.toLowerCase();
  if (m.match(/hi|hello|hey|greet/))       return responses.greet[Math.floor(Math.random() * responses.greet.length)];
  if (m.match(/best|popular|top|sell/))    return responses.bestseller[0];
  if (m.match(/price|cost|how much|\$/))   return responses.price[0];
  if (m.match(/ship|deliver|track/))       return responses.shipping[0];
  if (m.match(/return|refund|exchange/))   return responses.return[0];
  return responses.default[0];
};

const Chatbot = () => {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! Welcome to Golden River Perfume. ✨ How can I help you today?' }
  ]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const bottomRef             = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userMsg }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getResponse(userMsg) }]);
    }, 900 + Math.random() * 500);
  };

  const handleKey = (e) => { if (e.key === 'Enter') sendMessage(); };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold-500 text-charcoal-900 shadow-lg shadow-gold-900/40 flex items-center justify-center transition-all duration-300 hover:bg-gold-400 hover:scale-110`}
        aria-label="Open chat"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 bg-charcoal-800 border border-charcoal-600 shadow-2xl shadow-black/60 transition-all duration-500 flex flex-col ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ height: '420px', borderRadius: '2px' }}
      >
        {/* Header */}
        <div className="bg-charcoal-700 px-4 py-3 flex items-center gap-3 border-b border-charcoal-600">
          <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
            <Bot size={14} className="text-gold-400" />
          </div>
          <div>
            <p className="font-body text-xs font-medium text-cream-100 tracking-wide">GR Assistant</p>
            <p className="font-body text-[10px] text-green-400">● Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] px-3 py-2 text-xs font-body leading-relaxed ${
                  msg.from === 'user'
                    ? 'bg-gold-500 text-charcoal-900 font-medium'
                    : 'bg-charcoal-700 text-cream-100 border border-charcoal-600'
                }`}
                style={{ borderRadius: '2px' }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-charcoal-700 border border-charcoal-600 px-3 py-2" style={{ borderRadius: '2px' }}>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-charcoal-600 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about our fragrances..."
            className="flex-1 bg-charcoal-700 border border-charcoal-600 text-cream-100 text-xs px-3 py-2 focus:outline-none focus:border-gold-500 placeholder-cream-200/30 font-body"
            style={{ borderRadius: '1px' }}
          />
          <button
            onClick={sendMessage}
            className="bg-gold-500 text-charcoal-900 px-3 py-2 hover:bg-gold-400 transition-colors flex items-center justify-center"
            style={{ borderRadius: '1px' }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
