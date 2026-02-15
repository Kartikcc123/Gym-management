import React, { useState, useEffect, useRef } from 'react';
import { 
  HelpCircle, 
  Mail, 
  MessageSquare, 
  Phone, 
  ChevronDown, 
  Send, 
  X,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HelpView = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Support Center</h2>
          <p className="text-zinc-500 text-sm">We are here to help you 24/7.</p>
        </div>
        <div className="flex gap-2">
           <span className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-bold uppercase tracking-wide">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             Support Online
           </span>
        </div>
      </div>

      {/* 1. DIRECT ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionCard 
          icon={MessageSquare} 
          title="Live Chat" 
          sub="Wait time: < 2 min" 
          color="text-blue-500" 
          onClick={() => setIsChatOpen(true)}
        />
        <ActionCard 
          icon={Mail} 
          title="Email Support" 
          sub="support@ironforge.com" 
          color="text-red-500" 
          onClick={() => window.location.href = 'mailto:support@ironforge.com'}
        />
        <ActionCard 
          icon={Phone} 
          title="Call Us" 
          sub="+1 (800) 555-0199" 
          color="text-green-500" 
          onClick={() => window.location.href = 'tel:+18005550199'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. FAQ SECTION */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <HelpCircle className="text-red-600" size={20} /> Frequently Asked Questions
            </h3>
            
            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['general', 'billing', 'training'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'bg-white text-black' 
                      : 'bg-black border border-zinc-800 text-zinc-500 hover:border-zinc-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <FAQItem 
                question="How do I freeze my membership?" 
                answer="You can freeze your membership for up to 3 months for medical or travel reasons. Go to Profile > Membership > Freeze Plan." 
                category="billing" activeCategory={activeCategory}
              />
               <FAQItem 
                question="How do I book a personal trainer?" 
                answer="Navigate to the 'Training' tab and select 'Book Session'. You can filter trainers by specialization." 
                category="training" activeCategory={activeCategory}
              />
              <FAQItem 
                question="What are the gym opening hours?" 
                answer="We are open 24/7 for Platinum members. For Gold/Silver, hours are 5 AM - 11 PM daily." 
                category="general" activeCategory={activeCategory}
              />
               <FAQItem 
                question="Where can I find my invoice history?" 
                answer="All your past payments are available in the 'My Plan' tab under 'Billing History'. You can download PDFs there." 
                category="billing" activeCategory={activeCategory}
              />
            </div>
          </div>
        </div>

        {/* 3. TICKET FORM */}
        <div className="lg:col-span-1">
          <TicketForm />
        </div>
      </div>

      {/* 4. LIVE CHAT WIDGET (Overlay) */}
      <AnimatePresence>
        {isChatOpen && <LiveChatWidget onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>

    </motion.div>
  );
};

// --- SUB COMPONENTS ---

const ActionCard = ({ icon: Icon, title, sub, color, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-600 hover:bg-zinc-800/50 transition-all text-left group w-full"
  >
    <Icon className={`${color} mb-4 group-hover:scale-110 transition-transform`} size={28} />
    <h3 className="text-white font-bold">{title}</h3>
    <p className="text-xs text-zinc-500 mt-1 font-mono">{sub}</p>
  </button>
);

const FAQItem = ({ question, answer, category, activeCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Simple filter logic
  if (activeCategory !== category && activeCategory !== 'all' && category !== 'general') return null;

  return (
    <div className="bg-black border border-zinc-800 rounded-xl overflow-hidden transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-900/50 transition-colors"
      >
        <span className="text-sm font-bold text-zinc-300">{question}</span>
        <ChevronDown 
          size={16} 
          className={`text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-600' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 text-xs text-zinc-500 leading-relaxed border-t border-zinc-800/50 pt-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TicketForm = () => {
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full bg-green-500/10 border border-green-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center"
      >
        <CheckCircle2 className="text-green-500 mb-4" size={48} />
        <h3 className="text-white font-bold text-xl">Ticket Sent!</h3>
        <p className="text-green-400 text-sm mt-2">We will reply within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <FileText className="text-blue-500" size={20} /> Submit Ticket
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase">Subject</label>
          <select className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm text-white mt-1 focus:border-blue-600 outline-none">
            <option>Billing Issue</option>
            <option>Technical Support</option>
            <option>Feedback / Suggestion</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase">Message</label>
          <textarea 
            required
            rows="5"
            placeholder="Describe your issue..."
            className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm text-white mt-1 focus:border-blue-600 outline-none resize-none"
          />
        </div>
        <button 
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === 'sending' ? 'Sending...' : <><Send size={16} /> Submit Ticket</>}
        </button>
      </form>
    </div>
  );
};

const LiveChatWidget = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! Welcome to IronForge Support.", sender: 'bot' },
    { id: 2, text: "How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages([...messages, newMsg]);
    setInput('');

    // Fake bot reply
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Thanks for reaching out! A human agent will join shortly.", 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-6 right-6 w-80 md:w-96 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
      style={{ height: '500px' }}
    >
      {/* Header */}
      <div className="bg-zinc-800 p-4 border-b border-zinc-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-bold text-white text-sm">IronForge Support</span>
        </div>
        <button onClick={onClose} className="text-zinc-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-black p-4 overflow-y-auto space-y-4" ref={scrollRef}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-zinc-800 text-zinc-200 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-black border border-zinc-800 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-600"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
          <Send size={18} />
        </button>
      </form>
    </motion.div>
  );
};

export default HelpView;