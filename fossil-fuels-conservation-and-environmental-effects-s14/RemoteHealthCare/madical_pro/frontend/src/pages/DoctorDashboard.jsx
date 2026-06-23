import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes, FaCalendarAlt, FaFileMedical, FaPrescription } from 'react-icons/fa';

const MOCK_REQUESTS = [
  { id: 1, patientName: 'John Doe', age: 35, issue: 'Chest Pain', symptoms: 'Sharp pain when breathing', time: '10:00 AM', priority: 'High' },
  { id: 2, patientName: 'Alice Smith', age: 28, issue: 'Regular Checkup', symptoms: 'None', time: '11:30 AM', priority: 'Low' },
];

export default function DoctorDashboard() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const handleAccept = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  const handleReject = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan/20 to-transparent p-8 rounded-2xl border border-cyan/20"
      >
        <h1 className="text-4xl font-bold mb-4">Doctor Dashboard</h1>
        <p className="text-gray-300 text-lg">Manage your appointments, reports, and prescriptions.</p>
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><FaCalendarAlt className="text-cyan" /> Appointment Requests</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {requests.map((req, idx) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-2xl p-6 relative"
              >
                {req.priority === 'High' && (
                  <span className="absolute top-4 right-4 bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-xs font-bold border border-red-500/30">
                    HIGH PRIORITY
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{req.patientName}, {req.age}</h3>
                <p className="text-cyan text-sm mb-4 font-semibold">{req.time}</p>
                
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <p><span className="text-gray-500">Issue:</span> {req.issue}</p>
                  <p><span className="text-gray-500">Symptoms:</span> {req.symptoms}</p>
                </div>

                <div className="flex gap-4 mt-auto">
                  <button 
                    onClick={() => handleAccept(req.id)}
                    className="flex-1 bg-green-500/20 hover:bg-green-500 text-green-500 hover:text-white border border-green-500 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <FaCheck /> Accept
                  </button>
                  <button 
                    onClick={() => handleReject(req.id)}
                    className="flex-1 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white border border-red-500 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {requests.length === 0 && (
            <div className="col-span-full p-8 text-center text-gray-500 bg-black/20 rounded-2xl border border-gray-800">
               No pending appointment requests.
            </div>
          )}
        </div>
      </div>
      
      {/* Additional Doctor Tools (Quick Links) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
         <div className="bg-black/30 p-6 rounded-2xl border border-gray-800 flex items-center justify-between hover:border-cyan transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-cyan/10 rounded-xl text-cyan text-2xl"><FaFileMedical /></div>
              <div>
                <h4 className="text-lg font-bold text-white">Upload Reports</h4>
                <p className="text-sm text-gray-400">Add lab results and diagnoses</p>
              </div>
            </div>
         </div>
         <div className="bg-black/30 p-6 rounded-2xl border border-gray-800 flex items-center justify-between hover:border-cyan transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-cyan/10 rounded-xl text-cyan text-2xl"><FaPrescription /></div>
              <div>
                <h4 className="text-lg font-bold text-white">Write Prescriptions</h4>
                <p className="text-sm text-gray-400">Generate e-prescriptions for patients</p>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
