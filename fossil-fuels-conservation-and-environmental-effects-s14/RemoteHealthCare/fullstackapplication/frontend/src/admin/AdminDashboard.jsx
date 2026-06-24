import { useEffect, useState } from 'react';
import StatCard from '../components/cards/StatCard';
import PatientActivityChart from '../components/charts/PatientActivityChart';
import EmergencyCasesChart from '../components/charts/EmergencyCasesChart';
import RecentActivityTable from '../components/tables/RecentActivityTable';
import UserManagementTable from '../components/tables/UserManagementTable';
import EmergencyMonitoringList from '../components/tables/EmergencyMonitoringList';
import { ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1999/api';

  // State
  const [emergencies, setEmergencies] = useState([]);
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [analytics, setAnalytics] = useState({
    patientActivityData: [],
    emergencyCasesData: []
  });

  // Notifications banner
  const [dispatchNotification, setDispatchNotification] = useState(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  // Fetch initial data
  useEffect(() => {
    // Fetch Emergencies
    fetch(`${API_URL}/emergencies`)
      .then(res => res.json())
      .then(data => setEmergencies(data))
      .catch(err => console.error('Failed to fetch emergencies', err));

    // Fetch Users
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Failed to fetch users', err));

    // Fetch Activities
    fetch(`${API_URL}/activities`)
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error('Failed to fetch activities', err));

    // Fetch Analytics Dashboard Data
    fetch(`${API_URL}/analytics/dashboard`)
      .then(res => res.json())
      .then(data => {
        setAnalytics({
          patientActivityData: data.patientActivityData || [],
          emergencyCasesData: data.emergencyCasesData || []
        });
      })
      .catch(err => console.error('Failed to fetch analytics', err));
  }, []);

  const activeEmergencyCount = emergencies.filter(e => e.status !== 'Completed').length;
  const stats = [
    { id: 'total-patients', title: 'Total Patients', value: '12,842', change: '+14%', isPositive: true, timeframe: 'vs last month', color: 'blue' },
    { id: 'active-emergencies', title: 'Active Emergencies', value: activeEmergencyCount.toString(), change: '+2 today', isPositive: false, timeframe: 'currently active', color: 'red' },
    { id: 'admins-available', title: 'System Admins', value: '8', change: 'Roster active', isPositive: true, timeframe: 'staff roster', color: 'green' }
  ];

  // Quick Dispatch Handler
  const handleQuickDispatch = () => {
    const sectors = ['Sector 4 (Central)', 'Sector 7 (South-West)', 'Sector 9 (Highways)', 'Sector 2 (Industrial)'];
    const issues = ['Acute Cardiac Event', 'Tachypnea Respiratory Arrest', 'Anaphylactic Stroke Alert', 'Closed Trauma Fracture'];
    const priorities = ['Critical', 'High', 'Medium'];
    
    const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
    const randomIssue = issues[Math.floor(Math.random() * issues.length)];
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
    const unitNumber = Math.floor(Math.random() * 20) + 1;

    const newDispatchId = `em-${Date.now()}`;
    const newEmergency = {
      id: newDispatchId,
      title: randomIssue,
      location: randomSector,
      priority: randomPriority,
      unit: `Ambulance Unit ${unitNumber}`,
      timestamp: 'Just now',
      status: 'Pending'
    };

    setEmergencies(prev => [newEmergency, ...prev]);

    // Add activity log
    const newActivity = {
      id: `act-${Date.now()}`,
      user: `Ambulance Unit ${unitNumber}`,
      avatar: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=150',
      role: 'Emergency Dispatch',
      action: `Dispatched response for ${randomIssue} @ ${randomSector} [Priority: ${randomPriority}]`,
      category: 'Emergency',
      date: 'Just now',
      status: 'active'
    };
    setActivities(prev => [newActivity, ...prev]);

    // Toast Alert
    setDispatchNotification(`Emergency Unit ${unitNumber} Dispatched: ${randomIssue} @ ${randomSector}`);
    setTimeout(() => {
      setDispatchNotification(null);
    }, 6000);
  };

  // Update dispatch status
  const handleUpdateEmergencyStatus = (id, nextStatus) => {
    setEmergencies(prev => prev.map(em => {
      if (em.id === id) {
        // Log action if completed
        if (nextStatus === 'Completed') {
          const resolveAct = {
            id: `act-${Date.now()}`,
            user: em.unit,
            avatar: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=150',
            role: 'Emergency Team',
            action: `Resolved incident response for ${em.title} at ${em.location}`,
            category: 'Emergency',
            date: 'Just now',
            status: 'completed'
          };
          setActivities(prev => [resolveAct, ...prev]);
        }
        return { ...em, status: nextStatus };
      }
      return em;
    }));
  };

  // User Management callbacks
  const handleAddUser = (newUser) => {
    fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: newUser.name, // Mapping from frontend name to backend username
        role: newUser.role,
        email: newUser.email,
        status: newUser.status,
      })
    })
    .then(async (res) => {
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }
      return res.json();
    })
    .then(savedUser => {
      setUsers(prev => [savedUser, ...prev]);
      // Log activity
      const newAct = {
        id: `act-${Date.now()}`,
        user: 'CMD Office',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
        role: 'System Administrator',
        action: `Created new user credentials for ${savedUser.username} [Access: ${savedUser.role}]`,
        category: 'Booking',
        date: 'Just now',
        status: 'completed'
      };
      setActivities(prev => [newAct, ...prev]);
    })
    .catch(err => alert("Failed to add user: " + err.message));
  };

  const handleEditUser = (updatedUser) => {
    fetch(`${API_URL}/users/${updatedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: updatedUser.name,
        role: updatedUser.role,
        email: updatedUser.email,
        status: updatedUser.status,
      })
    })
    .then(res => res.json())
    .then(savedUser => {
      setUsers(prev => prev.map(u => u.id === savedUser.id ? savedUser : u));

      // Log activity
      const newAct = {
        id: `act-${Date.now()}`,
        user: 'CMD Office',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
        role: 'System Administrator',
        action: `Modified user privilege profile for ${savedUser.username} [Access: ${savedUser.role}]`,
        category: 'Booking',
        date: 'Just now',
        status: 'completed'
      };
      setActivities(prev => [newAct, ...prev]);
    })
    .catch(err => alert("Failed to update user: " + err.message));
  };

  const handleDeleteUser = (id) => {
    const user = users.find(u => u.id === id);
    if (user && window.confirm(`Revoke all clinical credentials and system access for ${user.username || user.name}?`)) {
      fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(() => {
        setUsers(prev => prev.filter(u => u.id !== id));

        // Log activity
        const newAct = {
          id: `act-${Date.now()}`,
          user: 'CMD Office',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
          role: 'System Administrator',
          action: `Revoked credentials and deleted account for ${user.username || user.name}`,
          category: 'Booking',
          date: 'Just now',
          status: 'completed'
        };
        setActivities(prev => [newAct, ...prev]);
      })
      .catch(err => alert("Failed to delete user: " + err.message));
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      
      {/* Alert toast notification */}
      {dispatchNotification && (
        <div className="bg-red-600 text-white px-5 py-3.5 rounded-2xl flex items-center justify-between shadow-lg shadow-red-600/15 border border-red-500 animate-in slide-in-from-top-4 duration-300 z-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping mr-1 shrink-0" />
            <span className="font-bold text-xs uppercase tracking-wider">Triage Alert:</span>
            <span className="text-xs font-semibold">{dispatchNotification}</span>
          </div>
          <button 
            onClick={() => setDispatchNotification(null)}
            className="text-white hover:text-red-200 text-xs font-bold cursor-pointer ml-3"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Welcome Panel */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mb-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-500/30">
              Live Monitor Node
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">Chief Medical Dashboard</h2>
            <p className="text-xs text-slate-300 max-w-xl font-medium">
              Portal systems synchronized. Monitoring {activeEmergencyCount} active triage alerts, {stats.find(s=>s.id==='admins-available')?.value} staff on-duty, and active dispatches.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={handleQuickDispatch}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-xs font-bold rounded-xl transition-all shadow-lg shadow-red-500/15 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Quick Dispatch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              Save System Status
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full">
          {analytics.patientActivityData.length > 0 && (
            <PatientActivityChart data={analytics.patientActivityData} />
          )}
        </div>
      </div>

      {/* Triage monitoring & Stacked Emergency Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          {analytics.emergencyCasesData.length > 0 && (
            <EmergencyCasesChart data={analytics.emergencyCasesData} />
          )}
        </div>
        <div className="lg:col-span-2">
          <EmergencyMonitoringList 
            emergencies={emergencies}
            onUpdateStatus={handleUpdateEmergencyStatus}
            onDispatch={handleQuickDispatch}
          />
        </div>
      </div>

      {/* User Management and Incident logs */}
      <div className="space-y-6">
        <UserManagementTable 
          users={users}
          onAddUser={handleAddUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
        
        <RecentActivityTable 
          activities={activities.slice(0, 8)}
          onViewAuditTrail={() => setIsAuditModalOpen(true)}
        />
      </div>

      {/* Audit Trail Modal */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsAuditModalOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[80vh] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Clinical & Dispatch Audit Trail</h3>
                <p className="text-[10px] text-slate-400">Chronological clinical log index of credentials and triage telemetry</p>
              </div>
              <button 
                onClick={() => setIsAuditModalOpen(false)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-[10px] font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close Audit Logs
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto space-y-3">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-start gap-3">
                    <img src={act.avatar} alt="" className="w-8 h-8 rounded-xl object-cover ring-2 ring-slate-100 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-snug">{act.user}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{act.role} • {act.date}</p>
                      <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">{act.action}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-extrabold uppercase shrink-0
                    ${act.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-650 border border-red-100'}
                  `}>
                    {act.status}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="p-5 bg-slate-50/50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setIsAuditModalOpen(false)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
