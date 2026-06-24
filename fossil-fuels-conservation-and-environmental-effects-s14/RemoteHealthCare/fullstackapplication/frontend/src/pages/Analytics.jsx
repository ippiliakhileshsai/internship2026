import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Activity, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

// Emerald/Teal Theme Colors
const COLORS = ['#10B981', '#14B8A6', '#0EA5E9', '#F59E0B'];

export default function Analytics() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1999/api';
  const [data, setData] = useState({
    recoveryData: [],
    diseaseDistribution: [],
    treatmentStatus: []
  });

  useEffect(() => {
    fetch(`${API_URL}/analytics/dashboard`)
      .then(res => res.json())
      .then(json => {
        setData({
          recoveryData: json.recoveryData || [],
          diseaseDistribution: json.diseaseDistribution || [],
          treatmentStatus: json.treatmentStatus || []
        });
      })
      .catch(err => console.error('Failed to fetch analytics', err));
  }, []);
  return (
    <div className="p-4 md:p-6 space-y-8 bg-slate-50 min-h-screen animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 rounded-3xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-center shadow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
        
        <div className="z-10 mb-6 md:mb-0 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Clinical Analytics</h1>
          </div>
          <p className="text-emerald-100 text-sm font-medium pl-1">Track patient recovery progress and facility health metrics.</p>
        </div>

        <div className="z-10 text-center bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-inner">
           <div className="text-4xl font-extrabold text-white mb-1 drop-shadow-sm">90/100</div>
           <div className="text-emerald-100 uppercase tracking-widest text-[10px] font-bold">Overall Health Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-800">Recovery Trend</h3>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.recoveryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '12px', color: '#1e293b', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} dot={{ r: 5, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey="recovery" stroke="#0EA5E9" strokeWidth={3} dot={{ r: 5, fill: '#0EA5E9', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <PieChartIcon className="w-5 h-5 text-teal-500" />
            <h3 className="text-lg font-bold text-slate-800">Disease Distribution</h3>
          </div>
          <div style={{ width: '100%', height: 260 }} className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.diseaseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.diseaseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '12px', color: '#1e293b', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center flex-wrap gap-4 mt-2">
             {data.diseaseDistribution.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                   <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                   {entry.name}
                </div>
             ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-slate-800">Treatment Status Overview</h3>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.treatmentStatus} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 12, fontWeight: 600 }} />
                <RechartsTooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '12px', color: '#1e293b', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar dataKey="count" fill="#14B8A6" radius={[0, 8, 8, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
