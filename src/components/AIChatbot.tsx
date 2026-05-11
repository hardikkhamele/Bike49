"use client";

import { useState, useRef, useEffect } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm the Bike49 AI Assistant. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const faqs = [
    { q: "How do I sell my bike?", a: "To sell your bike, click on the 'Sell' tab, fill out the details including your RC and vehicle images, and submit. Our team will verify and approve it." },
    { q: "How is the expected price calculated?", a: "Our AI price predictor estimates the price based on your vehicle's brand, model year, and kilometers driven." },
    { q: "Are the vehicles verified?", a: "Yes, we verify the RC, Insurance, and physical condition of the vehicles before listing them with a 'Verified' badge." },
    { q: "Do you offer financing?", a: "Yes, you can use our EMI calculator to estimate your monthly payments. We partner with leading banks for two-wheeler loans." }
  ];

  const handleFAQClick = (faq: {q: string, a: string}) => {
    const userMsg = { id: Date.now(), text: faq.q, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: faq.a, isBot: true }]);
    }, 600);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text: input, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "I can certainly help you with that! Are you looking to buy or sell?",
        "That's a great choice. We have several options in that category.",
        "Our AI price predictor can give you the best estimate for that.",
        "Could you provide a few more details so I can assist you better?",
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: randomResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 sm:w-96 h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Bike49 AI Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.isBot 
                      ? "bg-slate-800 text-gray-200 rounded-tl-sm border border-slate-700" 
                      : "bg-yellow-500 text-slate-900 rounded-tr-sm font-medium"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQs */}
          <div className="px-4 pb-3 pt-2 bg-slate-900 flex gap-2 overflow-x-auto custom-scrollbar border-t border-slate-800">
            {faqs.map((faq, i) => (
              <button 
                key={i}
                onClick={() => handleFAQClick(faq)}
                className="whitespace-nowrap px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-yellow-500 border border-yellow-500/30 rounded-full text-xs font-medium transition-colors"
              >
                {faq.q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button 
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-yellow-500 hover:bg-yellow-400 rounded-full shadow-lg shadow-yellow-500/20 flex items-center justify-center transition-transform hover:scale-105"
        >
          <svg className="w-7 h-7 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}
    </div>
  );
}
