import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';

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
      case 'meeting':
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700';
      case 'deadline':
        return 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50';
      case 'holiday':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50';
      case 'reminder':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50';
      default:
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700';
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    let parsedDate = selectedDate;
    if (dateInput) {
      const dateParts = dateInput.split('-');
      if (dateParts.length === 3) {
        parsedDate = parseInt(dateParts[2], 10);
      }
    }

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

    setEvents((prev) => [...prev, newEvent]);
    setShowEventModal(false);

    setTitle('');
    setDateInput('');
    setTimeInput('');
    setTypeInput('meeting');
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col text-neutral-900 dark:text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Calendar
          </h1>
          <p className="text-neutral-500 mt-1">Manage your team schedule and deadlines</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-1">
            <button className="px-4 py-1.5 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg text-sm font-medium shadow-sm">
              Month
            </button>
            <button className="px-4 py-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg text-sm font-medium transition-colors">
              Week
            </button>
          </div>
          <Button
            onClick={() => setShowEventModal(true)}
            icon={Plus}
          >
            Add Event
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Main Calendar */}
        <div className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col overflow-hidden shadow-sm">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              November 2023
            </h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-colors text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
                <ChevronLeft size={20} />
              </button>
              <button className="px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-neutral-900 dark:text-white shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                Today
              </button>
              <button className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-colors text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b border-neutral-200 dark:border-neutral-800 text-center py-3 bg-neutral-100 dark:bg-neutral-950 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>

          <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-hidden">
            {blanks.map((_, i) => (
              <div
                key={`blank-${i}`}
                className="border-r border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 p-2 min-h-[90px]"
              />
            ))}
            {days.map((day) => {
              const dayEvents = events.filter((e) => e.date === day);
              const isSelected = selectedDate === day;

              return (
                <motion.div
                  key={day}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                  onClick={() => setSelectedDate(day)}
                  className={`border-r border-b border-neutral-200 dark:border-neutral-800 p-2 cursor-pointer transition-colors relative overflow-hidden group min-h-[90px] ${
                    isSelected ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-white dark:bg-neutral-900'
                  }`}
                >
                  <div
                    className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full mb-1 ${
                      day === 15
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                        : 'text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white'
                    }`}
                  >
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs px-2 py-1 rounded-md truncate border font-medium ${getTypeColor(
                          event.type,
                        )}`}
                      >
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
        <div className="w-full lg:w-80 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
              Events for Nov {selectedDate}
            </h3>
            <div className="space-y-3">
              {events.filter((e) => e.date === selectedDate).length > 0 ? (
                events
                  .filter((e) => e.date === selectedDate)
                  .map((event) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={event.id}
                      className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${getTypeColor(
                            event.type,
                          )} uppercase tracking-wider`}
                        >
                          {event.type}
                        </span>
                        <span className="text-xs text-neutral-500 flex items-center">
                          <Clock size={12} className="mr-1" /> {event.time}
                        </span>
                      </div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">
                        {event.title}
                      </h4>
                    </motion.div>
                  ))
              ) : (
                <p className="text-neutral-500 text-sm italic">
                  No events scheduled for this day.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm flex-1">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
              Upcoming
            </h3>
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={`up-${event.id}`}
                  className="flex items-start space-x-3 group cursor-pointer p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-neutral-500 uppercase font-semibold">Nov</span>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">{event.date}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                      {event.title}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-0.5">{event.time}</p>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleAddEvent}>
                <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-white dark:bg-neutral-900">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Add New Event
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-5 space-y-4 bg-white dark:bg-neutral-900">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-1">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                      placeholder="e.g. Weekly Standup"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={dateInput}
                        onChange={(e) => setDateInput(e.target.value)}
                        className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        value={timeInput}
                        onChange={(e) => setTimeInput(e.target.value)}
                        className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-1">
                      Type
                    </label>
                    <select
                      value={typeInput}
                      onChange={(e) => setTypeInput(e.target.value)}
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    >
                      <option value="meeting">Meeting</option>
                      <option value="deadline">Deadline</option>
                      <option value="holiday">Holiday</option>
                      <option value="reminder">Reminder</option>
                    </select>
                  </div>
                  <div className="pt-2">
                    <Button type="submit" fullWidth>
                      Save Event
                    </Button>
                  </div>
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
