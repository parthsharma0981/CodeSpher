import React, { useState, useRef, useEffect } from 'react';
import { Search, Info, Users, Bell, ChevronDown, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import MessageBubble from '../components/chat/MessageBubble';
import ChatInput from '../components/chat/ChatInput';
import ConversationItem from '../components/chat/ConversationItem';
import ChannelItem from '../components/chat/ChannelItem';

const MOCK_CHANNELS = [
  { id: 1, name: 'general', unread: 0 },
  { id: 2, name: 'announcements', unread: 3 },
  { id: 3, name: 'dev-talk', unread: 0 },
  { id: 4, name: 'design-system', unread: 12 },
];

const MOCK_DMS = [
  { id: 1, name: 'Sarah Drasner', avatar: 'https://i.pravatar.cc/150?u=sarah', online: true, lastMessage: 'The new designs look great!', time: '10:42 AM', unread: 2 },
  { id: 2, name: 'Evan You', avatar: 'https://i.pravatar.cc/150?u=evan', online: false, lastMessage: 'Did you check the PR?', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'Dan Abramov', avatar: 'https://i.pravatar.cc/150?u=dan', online: true, lastMessage: 'Let\'s hop on a call later.', time: 'Yesterday', unread: 0 },
];

const INITIAL_MESSAGES_BY_CHAT = {
  'channel-1': [
    { id: 101, sender: 'Dan Abramov', avatar: 'https://i.pravatar.cc/150?u=dan', content: 'Welcome to the #general channel!', timestamp: '9:00 AM', isOwn: false },
    { id: 102, sender: 'You', avatar: 'https://i.pravatar.cc/150?u=you', content: 'Thanks Dan! Happy to be here.', timestamp: '9:05 AM', isOwn: true },
  ],
  'channel-2': [
    { id: 201, sender: 'Evan You', avatar: 'https://i.pravatar.cc/150?u=evan', content: 'CodeSphere Beta release scheduled for next Monday!', timestamp: '8:30 AM', isOwn: false },
  ],
  'channel-3': [
    { id: 301, sender: 'Mike Smith', avatar: 'https://i.pravatar.cc/150?u=3', content: 'Anyone else seeing memory leaks in the dev build?', timestamp: 'Yesterday', isOwn: false },
  ],
  'channel-4': [
    { id: 401, sender: 'Sarah Drasner', avatar: 'https://i.pravatar.cc/150?u=sarah', content: 'Need feedback on the new landing page gradients.', timestamp: 'Yesterday', isOwn: false },
  ],
  'dm-1': [
    { id: 1, sender: 'Sarah Drasner', avatar: 'https://i.pravatar.cc/150?u=sarah', content: 'Hey! Did you get a chance to look at the new Figma files?', timestamp: '10:30 AM', isOwn: false },
    { id: 2, sender: 'You', avatar: 'https://i.pravatar.cc/150?u=you', content: 'Yes! They look amazing. Especially the dark mode palette.', timestamp: '10:35 AM', isOwn: true },
    { id: 3, sender: 'Sarah Drasner', avatar: 'https://i.pravatar.cc/150?u=sarah', content: 'Awesome. I was thinking we could use a bit more of the cyan accent on the dashboard.', timestamp: '10:40 AM', isOwn: false },
    { id: 4, sender: 'Sarah Drasner', avatar: 'https://i.pravatar.cc/150?u=sarah', content: 'The new designs look great!', timestamp: '10:42 AM', isOwn: false },
  ],
  'dm-2': [
    { id: 21, sender: 'Evan You', avatar: 'https://i.pravatar.cc/150?u=evan', content: 'Did you check the PR?', timestamp: 'Yesterday', isOwn: false },
  ],
  'dm-3': [
    { id: 31, sender: 'Dan Abramov', avatar: 'https://i.pravatar.cc/150?u=dan', content: 'Let\'s hop on a call later.', timestamp: 'Yesterday', isOwn: false },
  ],
};

const Chat = () => {
  const [activeChannel, setActiveChannel] = useState(1);
  const [activeDm, setActiveDm] = useState(null);
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES_BY_CHAT);
  const [showInfo, setShowInfo] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const activeChatKey = activeChannel ? `channel-${activeChannel}` : `dm-${activeDm}`;
  const currentMessages = chatMessages[activeChatKey] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, activeChatKey]);

  const handleSend = (text) => {
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      avatar: 'https://i.pravatar.cc/150?u=you',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };
    
    setChatMessages(prev => ({
      ...prev,
      [activeChatKey]: [...(prev[activeChatKey] || []), newMessage]
    }));
  };

  const handleChannelClick = (id) => {
    setActiveChannel(id);
    setActiveDm(null);
  };

  const handleDmClick = (id) => {
    setActiveDm(id);
    setActiveChannel(null);
  };

  const filteredChannels = MOCK_CHANNELS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDms = MOCK_DMS.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] bg-slate-900 overflow-hidden text-white rounded-2xl border border-white/10 m-4">
      {/* Sidebar */}
      <div className="w-72 flex flex-col border-r border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          <div className="mb-6">
            <div className="flex items-center justify-between px-2 mb-2 group cursor-pointer text-gray-400 hover:text-white transition-colors">
              <h3 className="text-xs font-bold uppercase tracking-wider">Channels</h3>
              <ChevronDown size={14} className="opacity-0 group-hover:opacity-100" />
            </div>
            {filteredChannels.map(channel => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                active={activeChannel === channel.id}
                onClick={() => handleChannelClick(channel.id)}
              />
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between px-2 mb-2 group cursor-pointer text-gray-400 hover:text-white transition-colors">
              <h3 className="text-xs font-bold uppercase tracking-wider">Direct Messages</h3>
              <ChevronDown size={14} className="opacity-0 group-hover:opacity-100" />
            </div>
            {filteredDms.map(user => (
              <ConversationItem
                key={user.id}
                user={user}
                active={activeDm === user.id}
                onClick={() => handleDmClick(user.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0F172A]">
        {/* Chat Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            {activeChannel ? (
              <>
                <Hash className="text-gray-400" size={24} />
                <h2 className="font-semibold text-lg">{MOCK_CHANNELS.find(c => c.id === activeChannel)?.name}</h2>
              </>
            ) : (
              <>
                <img src={MOCK_DMS.find(d => d.id === activeDm)?.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                <h2 className="font-semibold text-lg">{MOCK_DMS.find(d => d.id === activeDm)?.name}</h2>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4 text-gray-400">
            <button className="hover:text-white transition-colors"><Bell size={20} /></button>
            <button className="hover:text-white transition-colors"><Users size={20} /></button>
            <button onClick={() => setShowInfo(!showInfo)} className={`transition-colors ${showInfo ? 'text-indigo-400' : 'hover:text-white'}`}>
              <Info size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
          <div className="flex justify-center mb-6">
            <span className="text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">Today</span>
          </div>
          {currentMessages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} isOwn={msg.isOwn} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={handleSend} />
      </div>

      {/* Right Sidebar (Info) */}
      {showInfo && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          className="border-l border-white/10 bg-slate-900/80 backdrop-blur-xl flex flex-col"
        >
          <div className="p-6 border-b border-white/10 text-center">
            {activeChannel ? (
              <>
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                  <Hash size={32} className="text-indigo-400" />
                </div>
                <h3 className="font-bold text-xl mb-1">#{MOCK_CHANNELS.find(c => c.id === activeChannel)?.name}</h3>
                <p className="text-sm text-gray-400">Channel description goes here.</p>
              </>
            ) : (
              <>
                <img src={MOCK_DMS.find(d => d.id === activeDm)?.avatar} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-indigo-500 object-cover" />
                <h3 className="font-bold text-xl mb-1">{MOCK_DMS.find(d => d.id === activeDm)?.name}</h3>
                <p className="text-sm text-emerald-400 font-medium">Online</p>
              </>
            )}
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <h4 className="text-sm font-semibold text-gray-400 uppercase mb-4">Members</h4>
            <div className="space-y-3">
              {MOCK_DMS.map(member => (
                <div key={member.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                    {member.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-900"></div>}
                  </div>
                  <span className="text-sm font-medium">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chat;
