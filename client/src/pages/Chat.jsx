import React, { useState, useRef, useEffect } from 'react';
import { Search, Info, Users, Bell, ChevronDown, Hash, Phone, Video, X, CheckCheck } from 'lucide-react';
import MessageBubble from '../components/chat/MessageBubble';
import ChatInput from '../components/chat/ChatInput';
import ConversationItem from '../components/chat/ConversationItem';
import ChannelItem from '../components/chat/ChannelItem';
import { useAuth } from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';
import { chatService } from '../services/api';
import { AnimatePresence, motion } from 'framer-motion';

const INITIAL_CHANNELS = [
  { id: 1, name: 'general', unread: 0, topic: 'General discussion and company-wide watercooler chat' },
  { id: 2, name: 'announcements', unread: 3, topic: 'Official product milestones, releases, and deadlines' },
  { id: 3, name: 'dev-talk', unread: 0, topic: 'Engineering, architecture, pull requests, and bug reports' },
  { id: 4, name: 'design-system', unread: 0, topic: 'UI/UX specs, Figma libraries, and design review' },
];

const INITIAL_DMS = [
  {
    id: 1,
    name: 'Sarah Drasner',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    online: true,
    lastMessage: 'The new design looks amazing!',
    time: '10:42 AM',
    unread: 2,
    role: 'Lead UI/UX Designer',
    email: 'sarah@codesphere.io',
  },
  {
    id: 2,
    name: 'Evan You',
    avatar: 'https://i.pravatar.cc/150?u=evan',
    online: false,
    lastMessage: 'Did you check the PR?',
    time: 'Yesterday',
    unread: 0,
    role: 'Core Architect & Tech Lead',
    email: 'evan@codesphere.io',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    avatar: 'https://i.pravatar.cc/150?u=dan',
    online: true,
    lastMessage: "Let's hop on a call later.",
    time: 'Yesterday',
    unread: 0,
    role: 'Staff Frontend Engineer',
    email: 'dan@codesphere.io',
  },
];

const INITIAL_MESSAGES = {
  'channel-1': [
    { id: 101, sender: 'Dan Abramov', avatar: 'https://i.pravatar.cc/150?u=dan', content: 'Welcome to the #general channel!', timestamp: '9:00 AM', isOwn: false },
    { id: 102, sender: 'You', avatar: 'https://i.pravatar.cc/150?u=you', content: 'Thanks Dan! Excited to collaborate on CodeSphere.', timestamp: '9:05 AM', isOwn: true },
  ],
  'channel-2': [
    {
      id: 201,
      sender: 'Evan You',
      avatar: 'https://i.pravatar.cc/150?u=evan',
      content: 'CodeSphere Beta release scheduled for next Monday!',
      timestamp: '8:30 AM',
      isOwn: false,
    },
    {
      id: 202,
      sender: 'Evan You',
      avatar: 'https://i.pravatar.cc/150?u=evan',
      content: 'Please make sure all sprint tasks in Kanban are moved to Review or Completed by Friday 5:00 PM.',
      timestamp: '8:32 AM',
      isOwn: false,
    },
    {
      id: 203,
      sender: 'Evan You',
      avatar: 'https://i.pravatar.cc/150?u=evan',
      content: 'We have updated the design tokens and dark mode palette. Check out the latest Figma file in #design-system! 🚀',
      timestamp: '8:35 AM',
      isOwn: false,
    },
  ],
  'channel-3': [
    { id: 301, sender: 'Mike Smith', avatar: 'https://i.pravatar.cc/150?u=3', content: 'Anyone else seeing memory leaks in the dev build?', timestamp: 'Yesterday', isOwn: false },
    { id: 302, sender: 'You', avatar: 'https://i.pravatar.cc/150?u=you', content: 'Tested with Node 22 and memory footprint looks normal so far.', timestamp: 'Yesterday', isOwn: true },
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
    { id: 22, sender: 'You', avatar: 'https://i.pravatar.cc/150?u=you', content: 'Reviewing the changes now, looking solid.', timestamp: 'Yesterday', isOwn: true },
  ],
  'dm-3': [
    { id: 31, sender: 'Dan Abramov', avatar: 'https://i.pravatar.cc/150?u=dan', content: "Let's hop on a call later.", timestamp: 'Yesterday', isOwn: false },
  ],
};

const Chat = () => {
  const { user } = useAuth();
  const { socket, isConnected, emit, on, off } = useSocket();

  const [channels, setChannels] = useState(INITIAL_CHANNELS);
  const [dms, setDms] = useState(INITIAL_DMS);
  const [activeChannel, setActiveChannel] = useState(2); // Default to announcements to show the 3 messages
  const [activeDm, setActiveDm] = useState(null);
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);
  const [showInfo, setShowInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const activeChatKey = activeChannel ? `channel-${activeChannel}` : `dm-${activeDm}`;
  const currentMessages = chatMessages[activeChatKey] || [];
  const activeChannelData = channels.find((c) => c.id === activeChannel);
  const activeDmUser = dms.find((d) => d.id === activeDm);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, activeChatKey, isTyping]);

  // Clear unread badge on current channel when active
  useEffect(() => {
    if (activeChannel) {
      setChannels((prev) =>
        prev.map((c) => (c.id === activeChannel ? { ...c, unread: 0 } : c))
      );
    }
  }, [activeChannel]);

  // Clear unread badge on current DM when active
  useEffect(() => {
    if (activeDm) {
      setDms((prev) =>
        prev.map((d) => (d.id === activeDm ? { ...d, unread: 0 } : d))
      );
    }
  }, [activeDm]);

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

  const handleSelectChannel = (id) => {
    setActiveChannel(id);
    setActiveDm(null);
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  const handleSelectDm = (id) => {
    setActiveDm(id);
    setActiveChannel(null);
    setDms((prev) =>
      prev.map((d) => (d.id === id ? { ...d, unread: 0 } : d))
    );
  };

  const handleSend = (text, attachment) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: Date.now(),
      sender: user?.name || 'You',
      avatar: user?.avatar || 'https://i.pravatar.cc/150?u=you',
      content: text,
      attachment,
      timestamp: nowTime,
      isOwn: true,
    };

    setChatMessages((prev) => ({
      ...prev,
      [activeChatKey]: [...(prev[activeChatKey] || []), newMessage],
    }));

    // Update last message in DM sidebar
    if (activeDm) {
      setDms((prev) =>
        prev.map((d) =>
          d.id === activeDm
            ? {
                ...d,
                lastMessage: text ? `You: ${text}` : 'You sent an attachment',
                time: 'Just now',
                unread: 0,
              }
            : d
        )
      );

      // Simulate a responsive, smart DM reply after 1.5 seconds
      const targetUser = dms.find((d) => d.id === activeDm);
      if (targetUser) {
        setTimeout(() => {
          setIsTyping(true);
        }, 600);

        setTimeout(() => {
          setIsTyping(false);
          const replyMap = {
            1: "Got it! Thanks for the update, will check that out now 👍",
            2: "Awesome, let's make sure we include this in the release milestone.",
            3: "Sounds great! Let's sync up on this during standup.",
          };
          const replyText = replyMap[activeDm] || "Thanks for your message! Taking a look now.";

          const replyMessage = {
            id: Date.now() + 1,
            sender: targetUser.name,
            avatar: targetUser.avatar,
            content: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: false,
          };

          setChatMessages((prev) => ({
            ...prev,
            [`dm-${activeDm}`]: [...(prev[`dm-${activeDm}`] || []), replyMessage],
          }));

          setDms((prev) =>
            prev.map((d) =>
              d.id === activeDm
                ? {
                    ...d,
                    lastMessage: replyText,
                    time: 'Just now',
                  }
                : d
            )
          );
        }, 2200);
      }
    }

    if (isConnected) {
      emit('send_message', {
        content: text,
        channelId: activeChannel,
        receiverId: activeDm,
        senderName: user?.name || 'You',
      });
    }

    try {
      chatService.sendMessage({
        content: text,
        receiverId: activeDm ? String(activeDm) : undefined,
        type: attachment ? (attachment.type?.includes('image') ? 'image' : 'file') : 'text',
        fileUrl: attachment?.url,
      }).catch(() => {});
    } catch (err) {
      // Ignore network errors
    }
  };

  const filteredChannels = channels.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDms = dms.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-5.5rem)] bg-white dark:bg-neutral-900 overflow-hidden text-neutral-900 dark:text-white rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm m-2">
      {/* Left Sidebar */}
      <div className="w-72 flex flex-col border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex-shrink-0">
        <div className="p-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input
              type="text"
              placeholder="Search channels & DMs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          {/* Channels Section */}
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
                onClick={() => handleSelectChannel(channel.id)}
              />
            ))}
          </div>

          {/* Direct Messages Section */}
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
                onClick={() => handleSelectDm(dmUser.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-black">
        {/* Chat Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            {activeChannel ? (
              <>
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 text-neutral-500">
                  <Hash size={18} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-base text-neutral-900 dark:text-white truncate">
                    #{activeChannelData?.name}
                  </h2>
                  <p className="text-xs text-neutral-400 truncate">
                    {activeChannelData?.topic}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="relative flex-shrink-0">
                  <img
                    src={activeDmUser?.avatar}
                    alt={activeDmUser?.name}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-800"
                  />
                  {activeDmUser?.online ? (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-black" />
                  ) : (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neutral-400 rounded-full border-2 border-white dark:border-black" />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-base text-neutral-900 dark:text-white truncate">
                    {activeDmUser?.name}
                  </h2>
                  <p className="text-xs text-neutral-400 flex items-center gap-1.5 truncate">
                    {activeDmUser?.online ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Active now</span>
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                        <span>Offline • Last active yesterday</span>
                      </>
                    )}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Action icons */}
          <div className="flex items-center space-x-2 text-neutral-400">
            {activeDm && (
              <>
                <button
                  type="button"
                  title="Voice call"
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <Phone size={17} />
                </button>
                <button
                  type="button"
                  title="Video call"
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <Video size={17} />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => setShowInfo(!showInfo)}
              title="Conversation details"
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                showInfo
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
              }`}
            >
              <Info size={18} />
            </button>
          </div>
        </div>

        {/* Message feed */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
          <div className="space-y-4 max-w-4xl mx-auto">
            {currentMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.isOwn}
              />
            ))}

            {/* Typing Indicator */}
            {isTyping && activeDm && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs text-neutral-400 pl-11"
              >
                <span>{activeDmUser?.name} is typing</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <ChatInput
          onSend={handleSend}
          placeholder={
            activeChannel
              ? `Message #${activeChannelData?.name || 'channel'}...`
              : `Message ${activeDmUser?.name || 'team member'}...`
          }
        />
      </div>

      {/* Right Info Drawer (Toggled by Info button) */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-l border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex flex-col overflow-hidden flex-shrink-0"
          >
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Details</h3>
              <button
                type="button"
                onClick={() => setShowInfo(false)}
                className="p-1 text-neutral-400 hover:text-black dark:hover:text-white rounded-lg"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-5 custom-scrollbar text-xs">
              {activeChannel ? (
                <>
                  <div>
                    <h4 className="font-semibold text-neutral-400 uppercase tracking-wider text-[10px] mb-1">About</h4>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">{activeChannelData?.topic}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-400 uppercase tracking-wider text-[10px] mb-2">Channel Members (4)</h4>
                    <div className="space-y-2">
                      {dms.map((m) => (
                        <div key={m.id} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                          <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-medium">{m.name}</span>
                          {m.online && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-auto" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center py-2">
                    <img
                      src={activeDmUser?.avatar}
                      alt={activeDmUser?.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto mb-2 ring-2 ring-neutral-200 dark:ring-neutral-800"
                    />
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{activeDmUser?.name}</h4>
                    <p className="text-neutral-400 text-[11px] mt-0.5">{activeDmUser?.role}</p>
                    <span
                      className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        activeDmUser?.online
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                      }`}
                    >
                      {activeDmUser?.online ? 'Online' : 'Offline'}
                    </span>
                  </div>

                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 space-y-2">
                    <h4 className="font-semibold text-neutral-400 uppercase tracking-wider text-[10px]">Contact Info</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">{activeDmUser?.email}</p>
                  </div>

                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 space-y-2">
                    <h4 className="font-semibold text-neutral-400 uppercase tracking-wider text-[10px]">Shared Workspace</h4>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">CodeSphere Team</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
