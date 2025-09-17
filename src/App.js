import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { CheckCircle, Clock, AlertCircle, Trophy, Star, Plus, Edit, Trash2, X } from 'lucide-react';

const FamilyChoresApp = () => {
  const [familienMitglieder, setFamilienMitglieder] = useState([
    { id: 1, name: 'Mama', avatar: '👩', farbe: '#EC4899', punkte: 145 },
    { id: 2, name: 'Papa', avatar: '👨', farbe: '#3B82F6', punkte: 132 },
    { id: 3, name: 'Alex (ich)', avatar: '👦', farbe: '#10B981', punkte: 128 },
    { id: 4, name: 'Alexandra', avatar: '👧', farbe: '#F59E0B', punkte: 98 }
  ]);

  const [aufgaben, setAufgaben] = useState([
    { id: 1, name: 'Küche putzen', zustaendig: 'Mama', status: 'erledigt', punkte: 15, faellig: '2025-09-17', kategorie: 'Küche', zeitaufwand: '20 min' },
    { id: 2, name: 'Müll rausbringen', zustaendig: 'Papa', status: 'offen', punkte: 5, faellig: '2025-09-18', kategorie: 'Außenbereich', zeitaufwand: '5 min' },
    { id: 3, name: 'Wäsche waschen', zustaendig: 'Alex (ich)', status: 'in_arbeit', punkte: 10, faellig: '2025-09-17', kategorie: 'Waschküche', zeitaufwand: '10 min' },
    { id: 4, name: 'Staubsaugen Wohnzimmer', zustaendig: 'Alexandra', status: 'überfällig', punkte: 12, faellig: '2025-09-15', kategorie: 'Wohnzimmer', zeitaufwand: '15 min' },
    { id: 5, name: 'Badezimmer putzen', zustaendig: 'Papa', status: 'erledigt', punkte: 20, faellig: '2025-09-16', kategorie: 'Badezimmer', zeitaufwand: '25 min' },
    { id: 6, name: 'Geschirrspüler ausräumen', zustaendig: 'Alex (ich)', status: 'offen', punkte: 3, faellig: '2025-09-18', kategorie: 'Küche', zeitaufwand: '5 min' },
    { id: 7, name: 'Fenster putzen', zustaendig: 'Mama', status: 'offen', punkte: 25, faellig: '2025-09-20', kategorie: 'Wohnzimmer', zeitaufwand: '45 min' },
    { id: 8, name: 'Garten gießen', zustaendig: 'Alexandra', status: 'erledigt', punkte: 8, faellig: '2025-09-17', kategorie: 'Garten', zeitaufwand: '10 min' }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showPersonModal, setShowPersonModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingPerson, setEditingPerson] = useState(null);

  const [taskForm, setTaskForm] = useState({
    name: '',
    zustaendig: '',
    status: 'offen',
    punkte: 5,
    faellig: '',
    kategorie: '',
    zeitaufwand: ''
  });

  const [personForm, setPersonForm] = useState({
    name: '',
    avatar: '👤'
  });

  const avatarOptions = ['👩', '👨', '👦', '👧', '👴', '👵', '🧑', '👤'];
  const colorOptions = ['#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4'];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'erledigt': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_arbeit': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'überfällig': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'erledigt': return 'bg-green-100 text-green-800';
      case 'in_arbeit': return 'bg-yellow-100 text-yellow-800';
      case 'überfällig': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const erledigteAufgaben = aufgaben.filter(a => a.status === 'erledigt').length;
  const offeneAufgaben = aufgaben.filter(a => a.status === 'offen').length;
  const überfälligeAufgaben = aufgaben.filter(a => a.status === 'überfällig').length;

  const punkteChart = familienMitglieder.map(member => ({
    name: member.name,
    punkte: member.punkte
  }));

  const statusData = [
    { name: 'Erledigt', value: aufgaben.filter(a => a.status === 'erledigt').length, color: '#10B981' },
    { name: 'Offen', value: aufgaben.filter(a => a.status === 'offen').length, color: '#6B7280' },
    { name: 'In Arbeit', value: aufgaben.filter(a => a.status === 'in_arbeit').length, color: '#F59E0B' },
    { name: 'Überfällig', value: aufgaben.filter(a => a.status === 'überfällig').length, color: '#EF4444' }
  ];

  const wöchentlicheAktivität = [
    { tag: 'Mo', erledigt: 6 },
    { tag: 'Di', erledigt: 4 },
    { tag: 'Mi', erledigt: 8 },
    { tag: 'Do', erledigt: 5 },
    { tag: 'Fr', erledigt: 7 },
    { tag: 'Sa', erledigt: 9 },
    { tag: 'So', erledigt: 3 }
  ];

  const aufgabeAbschließen = (aufgabenId) => {
    setAufgaben(prev => prev.map(aufgabe => 
      aufgabe.id === aufgabenId 
        ? { ...aufgabe, status: 'erledigt' }
        : aufgabe
    ));
  };

  const openTaskModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTaskForm(task);
    } else {
      setEditingTask(null);
      setTaskForm({
        name: '',
        zustaendig: familienMitglieder[0]?.name || '',
        status: 'offen',
        punkte: 5,
        faellig: '',
        kategorie: '',
        zeitaufwand: ''
      });
    }
    setShowTaskModal(true);
  };

  const openPersonModal = (person = null) => {
    if (person) {
      setEditingPerson(person);
      setPersonForm({ name: person.name, avatar: person.avatar });
    } else {
      setEditingPerson(null);
      setPersonForm({ name: '', avatar: '👤' });
    }
    setShowPersonModal(true);
  };

  const saveTask = () => {
    if (editingTask) {
      setAufgaben(prev => prev.map(a => a.id === editingTask.id ? { ...taskForm, id: editingTask.id } : a));
    } else {
      const newTask = { ...taskForm, id: Date.now() };
      setAufgaben(prev => [...prev, newTask]);
    }
    setShowTaskModal(false);
  };

  const savePerson = () => {
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    
    if (editingPerson) {
      setFamilienMitglieder(prev => prev.map(p => 
        p.id === editingPerson.id 
          ? { ...p, name: personForm.name, avatar: personForm.avatar }
          : p
      ));
    } else {
      const newPerson = { 
        ...personForm, 
        id: Date.now(), 
        farbe: randomColor, 
        punkte: 0 
      };
      setFamilienMitglieder(prev => [...prev, newPerson]);
    }
    setShowPersonModal(false);
  };

  const deleteTask = (taskId) => {
    setAufgaben(prev => prev.filter(a => a.id !== taskId));
  };

  const deletePerson = (personId) => {
    setFamilienMitglieder(prev => prev.filter(p => p.id !== personId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Haushalts-Organizer</h1>
              <p className="text-sm text-gray-600">Aufgaben-Verwaltung für die Familie</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('aufgaben')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'aufgaben'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Alle Aufgaben
            </button>
            <button
              onClick={() => setActiveTab('familie')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'familie'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Familie
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Heute erledigt</p>
                    <p className="text-2xl font-bold text-green-600">{erledigteAufgaben}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Noch offen</p>
                    <p className="text-2xl font-bold text-gray-900">{offeneAufgaben}</p>
                  </div>
                  <Clock className="h-8 w-8 text-gray-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Überfällig</p>
                    <p className="text-2xl font-bold text-red-600">{überfälligeAufgaben}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Wochenfortschritt</p>
                    <p className="text-2xl font-bold text-blue-600">78%</p>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Familien-Ranking</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={punkteChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="punkte" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Aufgaben Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Wöchentliche Aktivität</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={wöchentlicheAktivität}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tag" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="erledigt" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dringende Aufgaben</h3>
              <div className="space-y-3">
                {aufgaben.filter(a => a.status === 'überfällig' || a.status === 'in_arbeit').map((aufgabe) => (
                  <div key={aufgabe.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(aufgabe.status)}
                      <div>
                        <p className="font-medium text-gray-900">{aufgabe.name}</p>
                        <p className="text-sm text-gray-500">
                          {aufgabe.zustaendig} • {aufgabe.kategorie}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(aufgabe.status)}`}>
                        {aufgabe.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'aufgaben' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Alle Aufgaben</h2>
              <button 
                onClick={() => openTaskModal()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Neue Aufgabe
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aufgabe</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zuständig</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategorie</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Punkte</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fällig</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {aufgaben.map((aufgabe) => (
                    <tr key={aufgabe.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(aufgabe.status)}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{aufgabe.name}</p>
                            <p className="text-xs text-gray-500">{aufgabe.zeitaufwand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{familienMitglieder.find(m => m.name === aufgabe.zustaendig)?.avatar}</span>
                          <span className="text-sm text-gray-900">{aufgabe.zustaendig}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(aufgabe.status)}`}>
                          {aufgabe.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {aufgabe.kategorie}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm font-medium">{aufgabe.punkte}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {aufgabe.faellig}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {aufgabe.status !== 'erledigt' && (
                            <button 
                              onClick={() => aufgabeAbschließen(aufgabe.id)}
                              className="text-green-600 hover:text-green-900 text-sm font-medium"
                            >
                              Erledigt
                            </button>
                          )}
                          <button 
                            onClick={() => openTaskModal(aufgabe)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deleteTask(aufgabe.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'familie' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Familie</h2>
              <button 
                onClick={() => openPersonModal()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Person hinzufügen
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {familienMitglieder.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-center">
                    <div className="flex justify-end mb-2">
                      <button 
                        onClick={() => openPersonModal(member)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {familienMitglieder.length > 1 && (
                        <button 
                          onClick={() => deletePerson(member.id)}
                          className="text-red-600 hover:text-red-900 ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="text-4xl mb-3">{member.avatar}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="text-xl font-bold" style={{color: member.farbe}}>{member.punkte} Punkte</span>
                    </div>
                    
                    <div className="text-left space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Aktuelle Aufgaben:</h4>
                      {aufgaben
                        .filter(a => a.zustaendig === member.name && a.status !== 'erledigt')
                        .slice(0, 3)
                        .map((aufgabe) => (
                          <div key={aufgabe.id} className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">{aufgabe.name}</span>
                            <span className={`px-2 py-1 rounded ${getStatusColor(aufgabe.status)}`}>
                              {aufgabe.status}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingTask ? 'Aufgabe bearbeiten' : 'Neue Aufgabe'}
              </h3>
              <button onClick={() => setShowTaskModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aufgabe</label>
                <input
                  type="text"
                  value={taskForm.name}
                  onChange={(e) => setTaskForm({...taskForm, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="z.B. Küche putzen"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zuständig</label>
                <select
                  value={taskForm.zustaendig}
                  onChange={(e) => setTaskForm({...taskForm, zustaendig: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {familienMitglieder.map(member => (
                    <option key={member.id} value={member.name}>{member.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={taskForm.status}
                  onChange={(e) => setTaskForm({...taskForm, status: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="offen">Offen</option>
                  <option value="in_arbeit">In Arbeit</option>
                  <option value="erledigt">Erledigt</option>
                  <option value="überfällig">Überfällig</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategorie</label>
                <input
                  type="text"
                  value={taskForm.kategorie}
                  onChange={(e) => setTaskForm({...taskForm, kategorie: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="z.B. Küche"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Punkte</label>
                <input
                  type="number"
                  value={taskForm.punkte}
                  onChange={(e) => setTaskForm({...taskForm, punkte: parseInt(e.target.value)})}
                  className="w-full border rounded-lg px-3 py-2"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zeitaufwand</label>
                <input
                  type="text"
                  value={taskForm.zeitaufwand}
                  onChange={(e) => setTaskForm({...taskForm, zeitaufwand: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="z.B. 20 min"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fällig am</label>
                <input
                  type="date"
                  value={taskForm.faellig}
                  onChange={(e) => setTaskForm({...taskForm, faellig: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Abbrechen
              </button>
              <button 
                onClick={saveTask}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {editingTask ? 'Speichern' : 'Hinzufügen'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showPersonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingPerson ? 'Person bearbeiten' : 'Neue Person'}
              </h3>
              <button onClick={() => setShowPersonModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={personForm.name}
                  onChange={(e) => setPersonForm({...personForm, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="z.B. Maria"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar wählen</label>
                <div className="grid grid-cols-4 gap-3">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setPersonForm({...personForm, avatar})}
                      className={`text-2xl p-3 rounded-lg border ${
                        personForm.avatar === avatar 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowPersonModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Abbrechen
              </button>
              <button 
                onClick={savePerson}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {editingPerson ? 'Speichern' : 'Hinzufügen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyChoresApp;