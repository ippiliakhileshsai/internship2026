import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MonitorUp, Send, User, MessageSquare, Settings, Users, X } from 'lucide-react';

export default function ConsultationRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const messagesEndRef = useRef(null);

  // WebRTC Stubs
  useEffect(() => {
    let stream = null;
    async function setupMedia() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices", err);
      }
    }
    setupMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages([...messages, { 
      id: Date.now(), 
      text: inputMessage, 
      sender: 'me', 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    }]);
    setInputMessage('');
  };

  const endCall = () => {
    navigate('/medical-records');
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-slate-950 flex flex-col font-sans overflow-hidden animate-in fade-in duration-500 relative">
      
      {/* Header Bar */}
      <header className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-gradient-to-b from-slate-950/80 to-transparent z-20">
          <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
              <h1 className="text-white font-bold tracking-wide drop-shadow-md">
                  Consultation #{id || '1024'}
              </h1>
          </div>
          <div className="text-emerald-400 text-sm font-semibold bg-emerald-500/10 px-3 py-1 rounded-lg backdrop-blur-sm border border-emerald-500/20">
              Connected Securely
          </div>
      </header>

      {/* Main Video Area */}
      <main className={`flex-1 flex relative transition-all duration-300 ${isChatOpen ? 'lg:pr-[360px]' : ''}`}>
          
          {/* Remote Video (Full Screen Background) */}
          <div className="absolute inset-0 bg-slate-900 overflow-hidden flex items-center justify-center">
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover opacity-80" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700 shadow-2xl mb-4 relative">
                      <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping"></div>
                      <User className="w-12 h-12 text-slate-400" />
                  </div>
                  <p className="text-slate-400 font-medium">Waiting for participant video...</p>
              </div>

              <div className="absolute top-20 left-6 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm font-bold border border-slate-800">
                  Specialist
              </div>
          </div>

          {/* Local Video (Self - Floating PIP) */}
          <div className={`absolute z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] 
              ${isChatOpen 
                  ? 'bottom-6 right-[384px] w-48 h-32' 
                  : 'bottom-6 right-6 w-64 h-40 shadow-2xl'
              } 
              bg-slate-800 rounded-2xl overflow-hidden border-2 border-emerald-500/50`}>
              <video 
                  ref={localVideoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className={`w-full h-full object-cover scale-x-[-1] ${isVideoOff ? 'hidden' : 'block'}`}
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-sm px-2.5 py-1 rounded-lg text-white text-xs font-bold">
                  You
              </div>
              {isVideoOff && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                          <VideoOff className="text-slate-400 w-5 h-5" />
                      </div>
                  </div>
              )}
          </div>

          {/* Slide-out Chat Panel */}
          <div className={`absolute top-0 right-0 h-full w-[360px] bg-white flex flex-col transition-transform duration-300 z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.2)] ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4" />
                      </div>
                      <h2 className="text-slate-800 font-bold">Meeting Chat</h2>
                  </div>
                  <button onClick={() => setIsChatOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors">
                      <X className="w-5 h-5" />
                  </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
                  {messages.length === 0 && (
                      <div className="text-center text-slate-400 text-xs mt-10 font-medium">
                          No messages yet. Say hello!
                      </div>
                  )}
                  {messages.map((msg) => (
                      <div key={msg.id} className={`flex flex-col animate-in slide-in-from-bottom-2 ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                          <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm max-w-[85%] ${msg.sender === 'me' ? 'bg-emerald-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'}`}>
                              {msg.text}
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1.5 font-semibold px-1">{msg.time}</span>
                      </div>
                  ))}
                  <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white">
                  <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all p-1.5">
                      <input 
                          type="text" 
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 bg-transparent py-2.5 pl-4 pr-12 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                      />
                      <button 
                          type="submit" 
                          disabled={!inputMessage.trim()}
                          className="absolute right-2.5 w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white transition-colors cursor-pointer"
                      >
                          <Send className="w-4 h-4 -ml-0.5" />
                      </button>
                  </div>
              </form>
          </div>
      </main>

      {/* Bottom Control Bar */}
      <div className="h-24 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-6 lg:px-12 z-30">
          
          <div className="hidden md:flex w-1/3 items-center text-slate-400 font-medium text-sm">
              <span className="truncate">CarePortal Secure Session</span>
          </div>
          
          <div className="flex flex-1 md:w-1/3 justify-center items-center space-x-4 sm:space-x-6">
              <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
              >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              
              <button 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isVideoOff ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
              >
                  {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
              </button>

              <button className="hidden sm:flex w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 items-center justify-center transition-all">
                  <MonitorUp className="w-6 h-6" />
              </button>

              <button 
                  onClick={endCall}
                  className="w-20 h-14 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/20 transition-all hover:scale-105"
              >
                  <PhoneOff className="w-6 h-6" />
              </button>
          </div>

          <div className="w-1/3 flex justify-end items-center space-x-2 sm:space-x-4">
              <button className="hidden lg:flex p-3 text-slate-400 hover:text-white transition rounded-xl hover:bg-slate-800">
                  <Users className="w-5 h-5" />
              </button>
              <button 
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className={`p-3 transition rounded-xl relative ${isChatOpen ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                  <MessageSquare className="w-5 h-5" />
                  {/* Mock notification dot */}
                  {!isChatOpen && messages.length > 0 && (
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
                  )}
              </button>
              <button className="hidden lg:flex p-3 text-slate-400 hover:text-white transition rounded-xl hover:bg-slate-800">
                  <Settings className="w-5 h-5" />
              </button>
          </div>
      </div>

    </div>
  );
}
