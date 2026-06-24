import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Stethoscope, FileText, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

const availableSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "04:00 PM", "05:00 PM"
];

const BookConsultation = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1999/api';
    const navigate = useNavigate();
    const [doctorsList, setDoctorsList] = useState([]);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        doctorId: '',
        date: '',
        time: '',
        symptoms: '',
        reason: '',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/doctors`)
            .then(res => res.json())
            .then(data => {
                const mapped = data.map(doc => ({
                    id: doc.id,
                    name: `Dr. ${doc.firstName} ${doc.lastName}`.trim(),
                    specialization: doc.specialization || "General",
                    fee: "$100" // Default mock fee since backend lacks pricing
                }));
                setDoctorsList(mapped);
            })
            .catch(err => console.error("Failed to fetch doctors", err));
    }, [API_URL]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDoctorSelect = (docId) => {
        setFormData({ ...formData, doctorId: docId });
    };

    const handleTimeSelect = (time) => {
        setFormData({ ...formData, time });
    };

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const patientId = sessionStorage.getItem('patient_id') || 1; // Fallback to 1 if not logged in correctly

        const bookingPayload = {
            patient: { id: parseInt(patientId, 10) },
            doctor: { id: parseInt(formData.doctorId, 10) },
            scheduledTime: `${formData.date}T${formData.time.replace(' AM', ':00').replace(' PM', ':00')}`, // Approximate mapping
            notes: formData.symptoms + (formData.reason ? `\nReason: ${formData.reason}` : '') + (formData.notes ? `\nNotes: ${formData.notes}` : '')
        };

        try {
            const response = await fetch(`${API_URL}/consultations/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload)
            });

            if (response.ok) {
                setBookingConfirmed(true);
            } else {
                alert("Failed to book consultation");
            }
        } catch (err) {
            console.error("Booking error:", err);
            alert("Error connecting to server");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (bookingConfirmed) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-6 animate-in fade-in duration-500">
                <div className="bg-white border border-slate-100 p-12 rounded-3xl max-w-md w-full text-center shadow-premium relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">Booking Confirmed!</h2>
                    <p className="text-slate-500 mb-8 font-medium leading-relaxed">Your video consultation request has been sent. A confirmation email will be dispatched shortly.</p>
                    <button 
                        onClick={() => navigate('/medical-records')}
                        className="bg-slate-900 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-slate-800 transition-colors w-full shadow-lg shadow-slate-900/20"
                    >
                        Go to My Records
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                <div className="text-center mb-10 animate-in slide-in-from-top-4 duration-500">
                    <h1 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Book a Consultation</h1>
                    <p className="text-slate-500 font-medium">Schedule a secure, real-time video session with our top specialists.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm animate-in fade-in duration-500">
                    
                    {/* Stepper */}
                    <div className="flex justify-between items-center mb-12 relative px-2 sm:px-10">
                        <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-slate-100 -z-10 -translate-y-1/2 rounded-full"></div>
                        <div className="absolute top-1/2 left-[10%] h-1 bg-emerald-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${(step - 1) * 40}%` }}></div>
                        
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all duration-300 ${step >= 1 ? 'bg-emerald-500 text-white ring-4 ring-emerald-50' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>1</div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all duration-300 ${step >= 2 ? 'bg-emerald-500 text-white ring-4 ring-emerald-50' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>2</div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all duration-300 ${step >= 3 ? 'bg-emerald-500 text-white ring-4 ring-emerald-50' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>3</div>
                    </div>

                    {/* Step 1: Select Doctor */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                            <h2 className="text-xl font-bold mb-6 flex items-center text-slate-800">
                                <Stethoscope className="mr-3 w-6 h-6 text-emerald-500" /> Select a Specialist
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {doctorsList.map(doc => (
                                    <div 
                                        key={doc.id} 
                                        onClick={() => handleDoctorSelect(doc.id)}
                                        className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-200 relative overflow-hidden ${formData.doctorId === doc.id ? 'bg-emerald-50/50 border-emerald-500 shadow-md' : 'bg-white border-slate-100 hover:border-emerald-200 hover:bg-slate-50 hover:shadow-sm'}`}
                                    >
                                        {formData.doctorId === doc.id && (
                                            <div className="absolute top-4 right-4 text-emerald-500 animate-in zoom-in">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                        )}
                                        <div className="w-16 h-16 bg-slate-100 rounded-2xl mb-4 flex items-center justify-center shadow-inner">
                                            <User size={30} className="text-slate-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-1">{doc.name}</h3>
                                        <p className="text-emerald-600 text-sm font-bold mb-4 bg-emerald-50 inline-block px-3 py-1 rounded-lg">{doc.specialization}</p>
                                        <div className="text-slate-500 text-sm font-medium pt-4 border-t border-slate-100 flex justify-between items-center">
                                            <span>Consultation Fee</span>
                                            <span className="text-slate-800 font-bold">{doc.fee}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 flex justify-end">
                                <button 
                                    onClick={nextStep} 
                                    disabled={!formData.doctorId}
                                    className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                                >
                                    Continue to Schedule <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Date & Time */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                            <h2 className="text-xl font-bold mb-6 flex items-center text-slate-800">
                                <Calendar className="mr-3 w-6 h-6 text-emerald-500" /> Select Date & Time
                            </h2>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <label className="block text-slate-700 font-bold mb-3">Preferred Date</label>
                                    <input 
                                        type="date" 
                                        name="date"
                                        min={getTodayDate()}
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium shadow-sm"
                                    />
                                    <p className="text-xs text-slate-500 mt-3 font-medium flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Please select a future date</p>
                                </div>

                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <label className="block text-slate-700 font-bold mb-3">Available Slots</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {availableSlots.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => handleTimeSelect(time)}
                                                className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-all flex items-center justify-center ${formData.time === time ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'}`}
                                            >
                                                <Clock size={16} className={`mr-2 ${formData.time === time ? 'text-emerald-100' : 'text-slate-400'}`} /> {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex justify-between items-center border-t border-slate-100 pt-6">
                                <button onClick={prevStep} className="text-slate-500 font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2">
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                                <button 
                                    onClick={nextStep} 
                                    disabled={!formData.date || !formData.time}
                                    className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                                >
                                    Continue to Details <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Patient Details & Reason */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                            <h2 className="text-xl font-bold mb-6 flex items-center text-slate-800">
                                <FileText className="mr-3 w-6 h-6 text-emerald-500" /> Consultation Details
                            </h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">Reason for Consultation</label>
                                    <input 
                                        type="text" 
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        placeholder="e.g., Routine Checkup, Persistent Cough"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">Detailed Symptoms</label>
                                    <textarea 
                                        name="symptoms"
                                        value={formData.symptoms}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Describe your symptoms in detail..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium resize-none"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">Additional Notes <span className="text-slate-400 font-normal">(Optional)</span></label>
                                    <textarea 
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows="2"
                                        placeholder="Any prior medical history or ongoing medications?"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-10 flex justify-between items-center border-t border-slate-100 pt-6">
                                <button onClick={prevStep} className="text-slate-500 font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2">
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                                <button 
                                    onClick={handleSubmit} 
                                    disabled={!formData.reason || !formData.symptoms || isSubmitting}
                                    className="bg-emerald-600 text-white font-bold py-3 px-10 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/30"
                                >
                                    {isSubmitting ? (
                                        <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
                                    ) : 'Confirm Booking'}
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default BookConsultation;
