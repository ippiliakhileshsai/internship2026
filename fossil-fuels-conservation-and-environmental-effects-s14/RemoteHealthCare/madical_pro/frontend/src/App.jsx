import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import ConsultationRoom from './pages/ConsultationRoom';
import MedicalReports from './pages/MedicalReports';
import Analytics from './pages/Analytics';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PatientDashboard />} />
          <Route path="doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="reports" element={<MedicalReports />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="consultation/:id" element={<ConsultationRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
