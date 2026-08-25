import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_EVENTS = [
 { id: 1, title: 'Sprint Planning', date: 15, type: 'meeting', time: '10:00 AM' },
 { id: 2, title: 'Release v2.0', date: 18, type: 'deadline', time: '5:00 PM' },
 { id: 3, title: 'Company Holiday', date: 22, type: 'holiday', time: 'All Day' },
 { id: 4, title: 'Code Review', date: 15, type: 'reminder', time: '2:00 PM' },
];

const Calendar = () => {
 const [events, setEvents] = useState(INITIAL_EVENTS);
 const [selectedDate, setSelectedDate] = useState(15);
 const [showEventModal, setShowEventModal] = useState(false);

 // Form states
 const [title, setTitle] = useState('');
 const [dateInput, setDateInput] = useState('');
 const [timeInput, setTimeInput] = useState('');
 const [typeInput, setTypeInput] = useState('meeting');

 const daysInMonth = 31;
 const firstDayOfMonth = 3; // e.g. Wed

 const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
 const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

 const getTypeColor = (type) => {
 switch (type) {
 case 'meeting': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
 case 'deadline': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
 case 'holiday': return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-emerald-500/30';
 case 'reminder': return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-amber-500/30';
 default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
 }
 };

 const handleAddEvent = (e) => {
 e.preventDefault();
 if (!title.trim()) return;

 // Parse the day from the HTML date picker input (yyyy-mm-dd)
 let parsedDate = selectedDate;
 if (dateInput) {
 const dateParts = dateInput.split('-');
 if (dateParts.length === 3) {
 parsedDate = parseInt(dateParts[2], 10);
 }
 }

 // Format time for presentation
 let formattedTime = 'All Day';
 if (timeInput) {
 const [hours, minutes] = timeInput.split(':');
 const hourNum = parseInt(hours, 10);
 const ampm = hourNum >= 12 ? 'PM' : 'AM';
 const formattedHour = hourNum % 12 || 12;
 formattedTime = `${formattedHour}:${minutes} ${ampm}`;
 }

 const newEvent = {
 id: Date.now(),
 title,
 date: parsedDate,
 type: typeInput,
 time: formattedTime,
 };

 setEvents(prev => [...prev, newEvent]);
 setShowEventModal(false);

 // Reset Form
 setTitle('');
 setDateInput('');
 setTimeInput('');
 setTypeInput('meeting');
 };

 return (
 <div className="p-6 md:p-8 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col text-black dark:text-white">
 {/* Header */}
 <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
 <div>
 <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-neutral-500">
 Calendar
 </h1>
 <p className="text-gray-400 mt-1">Manage your team schedule and deadlines</p>
 </div>
 <div className="flex items-center space-x-3">
 <div className="flex items-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-1 backdrop-blur-md">
 <button className="px-4 py-1.5 bg-white/10 rounded text-sm font-medium shadow">Month</button>
 <button className="px-4 py-1.5 text-gray-400 hover:text-black dark:text-white rounded text-sm font-medium transition-colors">Week</button>
 </div>
 <button
 onClick={() => setShowEventModal(true)}
 className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-black dark:text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/25"
 >
 <Plus size={18} />
 <span>Add Event</span>
 </button>
 </div>
 </div>

 <div className="flex gap-6 flex-1 min-h-0">
 {/* Main Calendar */}
 <div className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col overflow-hidden">
 <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-white/5">
 <h2 className="text-xl font-semibold flex items-center">
 November 2023
 </h2>
 <div className="flex items-center space-x-2">
 <button className="p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors text-gray-400 hover:text-black dark:text-white">
 <ChevronLeft size={20} />
 </button>
 <button className="px-3 py-1 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
 Today
 </button>
 <button className="p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors text-gray-400 hover:text-black dark:text-white">
 <ChevronRight size={20} />
 </button>
 </div>
 </div>
 
 <div className="grid grid-cols-7 border-b border-neutral-200 dark:border-neutral-800 text-center py-3 bg-black/20 text-sm font-medium text-gray-400">
 <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
 </div>
 
 <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-hidden">
 {blanks.map((_, i) => (
 <div key={`blank-${i}`} className="border-r border-b border-white/5 bg-white/[0.02] p-2" />
 ))}
 {days.map(day => {
 const dayEvents = events.filter(e => e.date === day);
 const isSelected = selectedDate === day;
 
 return (
 <motion.div
 key={day}
 whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
 onClick={() => setSelectedDate(day)}
 className={`border-r border-b border-white/5 p-2 cursor-pointer transition-colors relative overflow-hidden group ${isSelected ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
 >
 <div className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1 ${day === 15 ? 'bg-indigo-500 text-black dark:text-white' : 'text-gray-300 group-hover:text-black dark:text-white'}`}>
 {day}
 </div>
 <div className="space-y-1">
 {dayEvents.map(event => (
 <div key={event.id} className={`text-xs px-1.5 py-0.5 rounded truncate border ${getTypeColor(event.type)}`}>
 {event.title}
 </div>
 ))}
 </div>
 </motion.div>
 );
 })}
 </div>
 </div>

 {/* Sidebar */}
 <div className="w-80 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
 <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 ">
 <h3 className="text-lg font-semibold mb-4">Events for Nov {selectedDate}</h3>
 <div className="space-y-4">
 {events.filter(e => e.date === selectedDate).length > 0 ? (
 events.filter(e => e.date === selectedDate).map(event => (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 key={event.id}
 className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
 >
 <div className="flex items-center justify-between mb-2">
 <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getTypeColor(event.type)} uppercase tracking-wider`}>
 {event.type}
 </span>
 <span className="text-xs text-gray-400 flex items-center"><Clock size={12} className="mr-1"/> {event.time}</span>
 </div>
 <h4 className="font-medium text-[15px]">{event.title}</h4>
 </motion.div>
 ))
 ) : (
 <p className="text-gray-400 text-sm italic">No events scheduled for this day.</p>
 )}
 </div>
 </div>
 
 <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex-1">
 <h3 className="text-lg font-semibold mb-4">Upcoming</h3>
 <div className="space-y-3">
 {events.map(event => (
 <div key={`up-${event.id}`} className="flex items-start space-x-3 group cursor-pointer">
 <div className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
 <span className="text-xs text-gray-400">Nov</span>
 <span className="text-sm font-bold">{event.date}</span>
 </div>
 <div>
 <h4 className="text-sm font-medium group-hover:text-neutral-600 dark:text-neutral-400 transition-colors">{event.title}</h4>
 <p className="text-xs text-gray-500 mt-0.5">{event.time}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 
 {/* Add Event Modal */}
 <AnimatePresence>
 {showEventModal && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.95 }}
 className="bg-[#1E293B] border border-neutral-200 dark:border-neutral-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
 >
 <form onSubmit={handleAddEvent}>
 <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-white/5">
 <h3 className="text-xl font-semibold text-black dark:text-white">Add New Event</h3>
 <button
 type="button"
 onClick={() => setShowEventModal(false)}
 className="text-gray-400 hover:text-black dark:text-white"
 >
 <X size={20} />
 </button>
 </div>
 <div className="p-5 space-y-4">
 <div>
 <label className="block text-sm font-medium text-gray-400 mb-1">Event Title *</label>
 <input
 type="text"
 required
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-black dark:text-white focus:outline-none focus:border-indigo-500"
 placeholder="e.g. Weekly Standup"
 />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
 <input
 type="date"
 value={dateInput}
 onChange={(e) => setDateInput(e.target.value)}
 className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-black dark:text-white focus:outline-none focus:border-indigo-500"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
 <input
 type="time"
 value={timeInput}
 onChange={(e) => setTimeInput(e.target.value)}
 className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-black dark:text-white focus:outline-none focus:border-indigo-500"
 />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
 <select
 value={typeInput}
 onChange={(e) => setTypeInput(e.target.value)}
 className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-black dark:text-white focus:outline-none focus:border-indigo-500"
 >
 <option value="meeting">Meeting</option>
 <option value="deadline">Deadline</option>
 <option value="holiday">Holiday</option>
 <option value="reminder">Reminder</option>
 </select>
 </div>
 <button
 type="submit"
 className="w-full bg-indigo-600 hover:bg-indigo-500 text-black dark:text-white font-medium py-2 rounded-lg mt-4 transition-colors"
 >
 Save Event
 </button>
 </div>
 </form>
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 </div>
 );
};

export default Calendar;
