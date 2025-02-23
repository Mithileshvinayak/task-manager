import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, Trash2, ClipboardList, Calendar, Flag, Tag, Clock, Filter } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');

  const categories = ['personal', 'work', 'shopping', 'health'];
  const priorities = ['low', 'medium', 'high'];

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        category,
        priority,
        dueDate
      }]);
      setNewTask('');
      setDueDate('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return task.category === filter;
  });

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-blue-100 text-blue-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-red-100 text-red-700'
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <div 
      className="min-h-screen py-8 px-4 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=2000&q=80)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 md:p-8 animate-fade-in border border-purple-100">
          <div className="flex items-center gap-3 mb-8">
            <ClipboardList className="w-10 h-10 text-indigo-600 animate-float" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Task Manager Pro
            </h1>
          </div>

          <form onSubmit={addTask} className="mb-8 space-y-4">
            <div className="flex gap-3 flex-wrap md:flex-nowrap">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 bg-white/50 backdrop-blur-sm border border-purple-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 bg-white/50 border border-purple-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="px-4 py-2 bg-white/50 border border-purple-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {priorities.map(p => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)} Priority
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-4 py-2 bg-white/50 border border-purple-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Task</span>
              </button>
            </div>
          </form>

          <div className="mb-6 flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === 'completed'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === cat
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12 text-gray-500 animate-fade-in">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No tasks found. Add some tasks to get started!</p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg animate-slide-in border border-purple-50"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 transition-all duration-300 transform ${
                      task.completed 
                        ? 'text-green-500 scale-110 rotate-0' 
                        : 'text-purple-400 rotate-0 hover:rotate-180 hover:text-indigo-500'
                    }`}
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`flex-1 transition-all duration-300 ${
                          task.completed
                            ? 'text-gray-400 line-through'
                            : 'text-gray-900'
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        <Flag className="w-3 h-3 inline mr-1" />
                        {task.priority}
                      </span>
                      <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full text-xs font-medium">
                        <Tag className="w-3 h-3 inline mr-1" />
                        {task.category}
                      </span>
                      {task.dueDate && (
                        <span className="text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 transition-all duration-200 transform hover:scale-110 hover:rotate-12"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {tasks.length > 0 && (
            <div className="mt-8 flex items-center justify-between text-sm text-gray-600 animate-fade-in">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{tasks.filter(t => !t.completed).length} tasks remaining</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>{tasks.filter(t => t.completed).length} of {tasks.length} completed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;