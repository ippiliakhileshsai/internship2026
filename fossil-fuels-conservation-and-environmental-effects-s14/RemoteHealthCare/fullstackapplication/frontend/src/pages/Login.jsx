import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Lock, Mail, Key, User, Phone, MapPin, Calendar, ShieldCheck, Stethoscope, ClipboardList, CreditCard, Shield } from 'lucide-react';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  
  const [formData, setFormData] = useState({
    role: 'Patient', // Default role
    identifier: '', // Email for staff and login
    password: '',
    // Signup specific fields for Patient
    username: '',
    firstName: '',
    lastName: '',
    contact: '',
    gender: 'Male',
    location: '',
    age: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setFormData(prev => ({
      ...prev,
      role: newRole,
      identifier: '',
      password: ''
    }));
    setMode('login'); // Always switch to login when changing roles
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMsg('');

    try {
      if (mode === 'register' && formData.role === 'Patient') {
        // Handle Patient Registration
        const response = await fetch(`${API_URL}/patientapi/registration`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.identifier,
            password: formData.password,
            contact: formData.contact,
            gender: formData.gender,
            location: formData.location,
            age: parseInt(formData.age, 10)
          })
        });

        if (response.ok) {
          setSuccessMsg('Registration successful! Please sign in.');
          setTimeout(() => {
            setMode('login');
            setSuccessMsg('');
            setIsSubmitting(false);
          }, 2000);
          return;
        } else {
          const text = await response.text();
          throw new Error(text || 'Registration failed');
        }
      } else {
        // Handle Login
        let endpoint = '';
        let payload = {};

        if (formData.role === 'Patient') {
          endpoint = `${API_URL}/patientapi/login`;
          payload = { email: formData.identifier, password: formData.password };
        } else {
          endpoint = `${API_URL}/login`; // Unified auth endpoint for staff
          payload = { email: formData.identifier, password: formData.password, role: formData.role };
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          let data;
          if (formData.role === 'Patient') {
            data = await response.json(); // Patient object directly returned
            sessionStorage.setItem('patient_data', JSON.stringify(data));
            sessionStorage.setItem('patient_id', data.id);
          } else {
            const result = await response.json();
            if (!result.success) throw new Error(result.message);
            data = result.user; // User object embedded in response map
            sessionStorage.setItem('user_data', JSON.stringify(data));
          }

          setSuccessMsg('Authentication successful. Redirecting...');
          setTimeout(() => {
            setIsSubmitting(false);
            onLogin(formData.role);
            
            if (formData.role === 'Admin') navigate('/admin');
            else if (formData.role === 'Accountant') navigate('/accounts');
            else navigate('/medical-records');
          }, 1000);

        } else {
          let errorText = '';
          try {
             const result = await response.json();
             errorText = result.message || 'Invalid credentials';
          } catch(e) {
             errorText = await response.text();
          }
          throw new Error(errorText || 'Invalid credentials. Please try again.');
        }
      }
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Connection to server failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative blurred background nodes */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/10 rounded-full blur-3xl -ml-60 -mt-60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-teal-600/10 rounded-full blur-3xl -mr-40 -mb-40 pointer-events-none" />

      {/* Main Container - unified width similar to Learnyantra */}
      <div className="relative w-full max-w-lg bg-slate-950/60 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Branding */}
        <div className="bg-gradient-to-r from-emerald-950 to-teal-950 p-6 flex flex-col items-center justify-center relative text-white border-b border-slate-800/50">
          <div className="flex items-center gap-3 z-10 mb-2">
            <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 shrink-0 border border-emerald-500/20">
              <HeartPulse className="w-8 h-8 animate-pulse" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              CarePortal
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Remote Healthcare Management System</p>
        </div>

        {/* Form Body */}
        <div className="p-8 flex flex-col justify-center">
          <div className="space-y-1 mb-6 text-center">
            <h3 className="text-xl font-extrabold text-white">
              {mode === 'login' ? 'Sign In' : 'Patient Registration'}
            </h3>
            <p className="text-[11px] text-slate-450 font-semibold">
              {mode === 'login' ? 'Enter your credentials to access your portal' : 'Fill in your details to create a new patient account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-center">
                {successMsg}
              </div>
            )}

            {/* Role Selection - Always visible in login mode */}
            {mode === 'login' && (
              <div className="space-y-1.5">
                <label className="text-slate-450 uppercase tracking-wide">Portal Role</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleRoleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-semibold appearance-none"
                  >
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Manager">Manager</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            )}

            {/* Registration specific fields */}
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-450 uppercase tracking-wide">Username</label>
                  <input
                    type="text" name="username" required value={formData.username} onChange={handleChange} placeholder="johndoe123"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-450 uppercase tracking-wide">Age</label>
                  <input
                    type="number" name="age" required value={formData.age} onChange={handleChange} placeholder="e.g. 35"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-450 uppercase tracking-wide">First Name</label>
                  <input
                    type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="John"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-450 uppercase tracking-wide">Last Name</label>
                  <input
                    type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Doe"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-450 uppercase tracking-wide">Contact No.</label>
                  <input
                    type="tel" name="contact" required value={formData.contact} onChange={handleChange} placeholder="+1 234 567 890"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-450 uppercase tracking-wide">Gender</label>
                  <select
                    name="gender" value={formData.gender} onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-emerald-500 transition-all appearance-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1.5 col-span-2">
                  <label className="text-slate-450 uppercase tracking-wide">Home Address / Location</label>
                  <input
                    type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="123 Health Ave, NY"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-slate-450 uppercase tracking-wide">Email Address / Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="identifier"
                  required
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="name@example.com or username"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-450 uppercase tracking-wide">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <Key className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/15 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer mt-6"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Processing...' : (mode === 'login' ? 'Secure Login' : 'Create Account')}</span>
            </button>
          </form>

          {/* Role specific footers */}
          <div className="mt-6 text-center text-[11px] font-semibold">
            {formData.role === 'Patient' && mode === 'login' && (
              <p className="text-slate-400">
                Don't have a patient account?{' '}
                <button onClick={() => setMode('register')} className="text-emerald-400 hover:underline cursor-pointer">
                  Register here
                </button>
              </p>
            )}
            {formData.role === 'Patient' && mode === 'register' && (
              <p className="text-slate-400">
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-emerald-400 hover:underline cursor-pointer">
                  Sign in here
                </button>
              </p>
            )}
            {formData.role !== 'Patient' && (
              <p className="text-slate-500">
                Staff accounts are provisioned by the System Administrator.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
