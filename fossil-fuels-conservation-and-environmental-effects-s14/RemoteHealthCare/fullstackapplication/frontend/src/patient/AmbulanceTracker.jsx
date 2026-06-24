import React, { useState, useEffect } from 'react';
import { ShieldAlert, MapPin, Navigation, Truck, PhoneCall, CheckCircle2 } from 'lucide-react';

export default function AmbulanceTracker() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1999/api';
  const [ambulances, setAmbulances] = useState([]);
  const [requestStatus, setRequestStatus] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [location, setLocation] = useState('');
  const [reason, setReason] = useState('');

  const fetchAmbulances = () => {
    fetch(`${API_URL}/ambulances`)
      .then(res => res.json())
      .then(data => setAmbulances(data))
      .catch(err => console.error("Failed to fetch ambulances", err));
  };

  useEffect(() => {
    fetchAmbulances();
    const interval = setInterval(fetchAmbulances, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [API_URL]);

  const handleRequestEmergency = async (e) => {
    e.preventDefault();
    if (!location || !reason) return;
    
    setIsRequesting(true);
    const newEmergency = {
      title: reason,
      location: location,
      priority: 'Critical',
      unit: 'Pending Unit Assignment',
      timestamp: 'Just now',
      status: 'Pending'
    };

    try {
      const response = await fetch(`${API_URL}/emergencies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmergency)
      });
      if (response.ok) {
        setRequestStatus('success');
        setLocation('');
        setReason('');
      } else {
        setRequestStatus('error');
      }
    } catch (err) {
      console.error(err);
      setRequestStatus('error');
    } finally {
      setIsRequesting(false);
      setTimeout(() => setRequestStatus(null), 5000);
    }
  };

  const activeAmbulances = ambulances.filter(a => a.status === 'Dispatched' || a.status === 'In Progress');

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto font-sans">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-100 text-red-600 p-3 rounded-2xl">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Emergency Rescue Tracker</h1>
          <p className="text-sm text-slate-500 font-medium">Request immediate ambulance assistance and track dispatched units.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request Ambulance Form */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-red-500" /> SOS Request
          </h2>
          
          <form onSubmit={handleRequestEmergency} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Emergency Type / Reason</label>
              <input 
                type="text"
                placeholder="e.g. Cardiac Arrest, Trauma..."
                className="w-full bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                value={reason}
                onChange={e => setReason(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Current Location</label>
              <input 
                type="text"
                placeholder="Sector / Full Address"
                className="w-full bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit"
              disabled={isRequesting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isRequesting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ShieldAlert className="w-5 h-5" />}
              {isRequesting ? 'Dispatching...' : 'Request Ambulance Now'}
            </button>

            {requestStatus === 'success' && (
              <div className="p-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Ambulance request dispatched! A unit will be assigned shortly.
              </div>
            )}
            {requestStatus === 'error' && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-100 rounded-xl text-xs font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                Failed to dispatch request. Please call 911 immediately.
              </div>
            )}
          </form>
        </div>

        {/* Live Tracking Map / List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 relative overflow-hidden text-white shadow-xl min-h-[300px] flex flex-col justify-end">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-20 grayscale mix-blend-overlay" />
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">Live Telemetry Active</span>
            </div>
            
            <div className="relative z-10 space-y-3 mt-16">
              {activeAmbulances.length === 0 ? (
                <div className="text-center py-10">
                  <Navigation className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">No active ambulances en-route to your location.</p>
                </div>
              ) : (
                activeAmbulances.map(amb => (
                  <div key={amb.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-500/20 text-red-400 flex items-center justify-center rounded-xl border border-red-500/30">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white flex items-center gap-2">
                          Ambulance Unit {amb.id}
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[9px] uppercase tracking-wider">{amb.status}</span>
                        </h4>
                        <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> GPS Tracking Enabled
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-bold">ETA</p>
                      <p className="text-xl font-black text-white">4 min</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
