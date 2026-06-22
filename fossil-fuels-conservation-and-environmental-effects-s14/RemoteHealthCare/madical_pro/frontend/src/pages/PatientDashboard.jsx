import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaStar, FaMapMarkerAlt, FaBriefcaseMedical, FaTimes, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Sarah Connor', specialization: 'Cardiology', hospital: 'Apollo Hospitals', experience: '15 Years', rating: 4.8, fee: 50, image: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Dr. James Smith', specialization: 'Neurology', hospital: 'Max Healthcare', experience: '12 Years', rating: 4.9, fee: 60, image: 'https://i.pravatar.cc/150?img=11' },
  { id: 3, name: 'Dr. Emily Chen', specialization: 'Dermatology', hospital: 'Fortis Hospital', experience: '8 Years', rating: 4.7, fee: 40, image: 'https://i.pravatar.cc/150?img=5' },
];

export default function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  const handleBook = (e) => {
    e.preventDefault();
    // Simulate booking and navigating to room
    const roomId = Math.random().toString(36).substring(7);
    navigate(`/consultation/${roomId}`);
  }

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan/20 to-transparent p-8 rounded-2xl border border-cyan/20"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome back, John!</h1>
        <p className="text-gray-300 text-lg">Find and book appointments with top doctors instantly.</p>
      </motion.div>

      {/* Search Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search by specialty, doctor name, or hospital..." 
          className="w-full bg-black/40 border border-gray-700 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </motion.div>

      {/* Doctor Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_DOCTORS.map((doc, idx) => (
          <motion.div 
            key={doc.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-2xl p-6 hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all group"
          >
            <div className="flex items-start gap-4 mb-4">
              <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full border-2 border-transparent group-hover:border-cyan transition-all" />
              <div>
                <h3 className="text-xl font-bold text-white">{doc.name}</h3>
                <p className="text-cyan text-sm">{doc.specialization}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-2"><FaMapMarkerAlt /> {doc.hospital}</span>
              <span className="flex items-center gap-2"><FaBriefcaseMedical /> {doc.experience}</span>
              <span className="flex items-center gap-2 text-yellow-500"><FaStar /> {doc.rating} Rating</span>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-xl font-bold text-white">${doc.fee}</span>
              <button 
                onClick={() => setSelectedDoctor(doc)}
                className="bg-cyan/10 hover:bg-cyan text-cyan hover:text-black border border-cyan px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0A192F] border border-cyan/30 rounded-2xl p-8 max-w-lg w-full relative shadow-[0_0_40px_rgba(0,229,255,0.2)]"
            >
              <button onClick={() => setSelectedDoctor(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <FaTimes className="text-xl" />
              </button>
              <h2 className="text-2xl font-bold mb-2">Book Consultation</h2>
              <p className="text-cyan mb-6">with {selectedDoctor.name}</p>
              
              <form onSubmit={handleBook} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Date</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
                      <input type="date" required className="w-full bg-black/40 border border-gray-700 rounded-lg py-2 pl-10 pr-3 text-white focus:border-cyan outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Time</label>
                    <div className="relative">
                      <FaClock className="absolute left-3 top-3 text-gray-500" />
                      <input type="time" required className="w-full bg-black/40 border border-gray-700 rounded-lg py-2 pl-10 pr-3 text-white focus:border-cyan outline-none" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Health Issue</label>
                  <input type="text" required placeholder="E.g. Chest pain" className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-white focus:border-cyan outline-none" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Symptoms</label>
                  <textarea rows="3" required placeholder="Describe your symptoms..." className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-white focus:border-cyan outline-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-cyan text-black font-bold text-lg py-3 rounded-lg hover:bg-cyan/80 transition-all mt-4 shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                  Confirm Booking (${selectedDoctor.fee})
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
