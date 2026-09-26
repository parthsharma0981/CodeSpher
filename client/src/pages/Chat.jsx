import React, { useState, useRef, useEffect } from 'react';
import { Search, Info, Users, Bell, ChevronDown, Hash } from 'lucide-react';
import MessageBubble from '../components/chat/MessageBubble';
import ChatInput from '../components/chat/ChatInput';
import ConversationItem from '../components/chat/ConversationItem';
import ChannelItem from '../components/chat/ChannelItem';
import { useAuth } from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';

const CHANNELS = [
  { id: 1, name: 'general', unread: 0 },
  { id: 2, name: 'announcements', unread: 3 },
  { id: 3, name: 'dev-talk', unread: 0 },
  { id: 4, name: 'design-system', unread: 0 },
];

const DMS = [
  { id: 1, name: 'Sarah Drasner', avatar: 'https://i.pravatar.cc/150?u=sarah', online: true, lastMessage: 'The new design looks amazing!', time: '10:42 AM', unread: 2 },
  { id: 2, name: 'Evan You', avatar: 'https://i.pravatar.cc/150?u=evan', online: false, lastMessage: 'Did you check the PR?', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'Dan Abramov', avatar: 'https://i.pravatar.cc/150?u=dan', online: true, lastMessage: "Let's hop on a call later.", time: 'Yesterday', unread: 0 },
];

const INITIAL_MESSAGES = {
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
    { id: 3, sender: 'Sarah Drasner', avatar: 'https://i.pravatar.cc/150?u=sarah', content: 'The new design looks amazing!', timestamp: '10:42 AM', isOwn: false },
  ],
  'dm-2': [
    { id: 21, sender: 'Evan You', avatar: 'https://i.pravatar.cc/150?u=evan', content: 'Did you check the PR?', timestamp: 'Yesterday', isOwn: false },
  ],
  'dm-3': [
    { id: 31, sender: 'Dan Abramov', avatar: 'https://i.pravatar.cc/150?u=dan', content: "Let's hop on a call later.", timestamp: 'Yesterday', isOwn: false },
  ],
};

const Chat = () => {
  const { user } = useAuth();
  const { socket, isConnected, emit, on, off } = useSocket();

  const [activeChannel, setActiveChannel] = useState(1);
  const [activeDm, setActiveDm] = useState(null);
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);
  const [showInfo, setShowInfo] = useState(false);
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

  useEffect(() => {
    const handleIncomingMessage = (msg) => {
      const roomKey = msg.channelId ? `channel-${msg.channelId}` : `dm-${msg.senderId}`;
      setChatMessages((prev) => ({
        ...prev,
        [roomKey]: [
          ...(prev[roomKey] || []),
          {
            id: msg.id || Date.now(),
            sender: msg.senderName || 'Team Member',
            avatar: msg.avatar || 'https://i.pravatar.cc/150',
            content: msg.content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: msg.senderId === user?._id,
          },
        ],
      }));
    };

    on('new_message', handleIncomingMessage);
    return () => off('new_message', handleIncomingMessage);
  }, [on, off, user]);

  const handleSend = (text) => {
    const newMessage = {
      id: Date.now(),
      sender: user?.name || 'You',
      avatar: user?.avatar || 'https://i.pravatar.cc/150?u=you',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setChatMessages((prev) => ({
      ...prev,
      [activeChatKey]: [...(prev[activeChatKey] || []), newMessage],
    }));

    if (isConnected) {
      emit('send_message', {
        content: text,
        channelId: activeChannel,
        receiverId: activeDm,
        senderName: user?.name || 'You',
      });
    }
  };

  const filteredChannels = CHANNELS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDms = DMS.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-5.5rem)] bg-white dark:bg-neutral-900 overflow-hidden text-neutral-900 dark:text-white rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm m-2">
      {/* Sidebar */}
      <div className="w-72 flex flex-col border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
        <div className="p-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          <div className="mb-5">
            <div className="flex items-center justify-between px-2 mb-2 text-neutral-400">
              <h3 className="text-xs font-bold uppercase tracking-wider">Channels</h3>
              <ChevronDown size={14} />
            </div>
            {filteredChannels.map((channel) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                active={activeChannel === channel.id}
                onClick={() => {
                  setActiveChannel(channel.id);
                  setActiveDm(null);
                }}
              />
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between px-2 mb-2 text-neutral-400">
              <h3 className="text-xs font-bold uppercase tracking-wider">Direct Messages</h3>
              <ChevronDown size={14} />
            </div>
            {filteredDms.map((dmUser) => (
              <ConversationItem
                key={dmUser.id}
                user={dmUser}
                active={activeDm === dmUser.id}
                onClick={() => {
                  setActiveDm(dmUser.id);
                  setActiveChannel(null);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-black">
        {/* Chat Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            {activeChannel ? (
              <>
                <Hash className="text-neutral-400" size={20} />
                <h2 className="font-bold text-base text-neutral-900 dark:text-white">
                  {CHANNELS.find((c) => c.id === activeChannel)?.name}
                </h2>
              </>
            ) : (
              <>
                <img
                  src={DMS.find((d) => d.id === activeDm)?.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <h2 className="font-bold text-base text-neutral-900 dark:text-white">
                  {DMS.find((d) => d.id === activeDm)?.name}
                </h2>
              </>
            )}
          </div>
          <div className="flex items-center space-x-3 text-neutral-400">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              <Info size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
          <div className="space-y-4">
            {currentMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.isOwn}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default Chat;
