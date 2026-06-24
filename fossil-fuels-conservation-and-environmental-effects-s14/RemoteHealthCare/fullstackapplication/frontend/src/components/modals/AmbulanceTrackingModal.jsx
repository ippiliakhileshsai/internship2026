import React, { useEffect, useState, useMemo } from 'react';
import { X, Navigation, MapPin, Hospital, Clock, Activity } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ambulanceIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const patientIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to dynamically adjust map bounds
const MapBounds = ({ locations }) => {
  const map = useMap();
  useEffect(() => {
    if (locations && locations.length > 0) {
      const bounds = L.latLngBounds(locations);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, locations]);
  return null;
};

export default function AmbulanceTrackingModal({ emergency, onClose }) {
  // Hospital is fixed at city center
  const hospitalLocation = [40.7128, -74.0060];
  
  // Generate a random patient location near the hospital based on the emergency ID or name to keep it consistent
  const patientLocation = useMemo(() => {
    const seed = emergency && emergency.id ? emergency.id.charCodeAt(emergency.id.length - 1) : 0;
    const offsetLat = (seed % 10) * 0.005 - 0.025;
    const offsetLng = ((seed * 3) % 10) * 0.005 - 0.025;
    return [hospitalLocation[0] + offsetLat, hospitalLocation[1] + offsetLng];
  }, [emergency]);

  // Initial ambulance location (starts further away, simulates coming from dispatch)
  const initialAmbulanceLocation = useMemo(() => {
    return [patientLocation[0] + 0.015, patientLocation[1] + 0.02];
  }, [patientLocation]);

  const [ambulanceLocation, setAmbulanceLocation] = useState(initialAmbulanceLocation);
  const [eta, setEta] = useState(8);
  const [distance, setDistance] = useState(3.2);

  // Simulate ambulance movement towards patient
  useEffect(() => {
    if (!emergency || emergency.status === 'Completed') return;

    const interval = setInterval(() => {
      setAmbulanceLocation(prev => {
        const latDiff = patientLocation[0] - prev[0];
        const lngDiff = patientLocation[1] - prev[1];
        
        // If it's very close to the patient, snap to patient
        if (Math.abs(latDiff) < 0.0005 && Math.abs(lngDiff) < 0.0005) {
          clearInterval(interval);
          setEta(0);
          setDistance(0);
          return patientLocation;
        }

        // Move 5% of the remaining distance every tick
        const newLat = prev[0] + latDiff * 0.05;
        const newLng = prev[1] + lngDiff * 0.05;
        
        // Update stats
        setEta(prevEta => Math.max(1, prevEta - 0.1).toFixed(1));
        setDistance(prevDist => Math.max(0.1, prevDist - 0.05).toFixed(1));
        
        return [newLat, newLng];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [emergency, patientLocation]);

  if (!emergency) return null;

  const locationsForBounds = [hospitalLocation, patientLocation, ambulanceLocation];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-800 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Navigation className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-none mb-1">Live Tracking: {emergency.unit}</h2>
              <p className="text-slate-400 text-xs flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${emergency.status === 'Completed' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></span>
                {emergency.title} • {emergency.status}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row h-[600px]">
          
          {/* Map Area */}
          <div className="flex-1 bg-slate-100 relative">
            <MapContainer 
              center={hospitalLocation} 
              zoom={13} 
              style={{ height: '100%', width: '100%', zIndex: 10 }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <MapBounds locations={locationsForBounds} />
              
              {/* Markers */}
              <Marker position={hospitalLocation} icon={hospitalIcon}>
                <Popup>
                  <div className="font-bold">Central Care Hospital</div>
                  <div className="text-xs text-slate-500">Destination Facility</div>
                </Popup>
              </Marker>
              
              <Marker position={patientLocation} icon={patientIcon}>
                <Popup>
                  <div className="font-bold">Patient Location</div>
                  <div className="text-xs text-slate-500">{emergency.location}</div>
                </Popup>
              </Marker>
              
              <Marker position={ambulanceLocation} icon={ambulanceIcon}>
                <Popup>
                  <div className="font-bold">{emergency.unit}</div>
                  <div className="text-xs text-slate-500">Speed: 45 mph</div>
                </Popup>
              </Marker>

              {/* Route Line */}
              <Polyline 
                positions={[ambulanceLocation, patientLocation]} 
                color="#3b82f6" 
                weight={4}
                dashArray="10, 10"
                opacity={0.7}
              />
            </MapContainer>

            {/* Overlay Status */}
            <div className="absolute top-4 left-4 right-4 z-20 flex gap-2 pointer-events-none">
              <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 pointer-events-auto">
                <MapPin className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Destination</div>
                  <div className="text-sm font-bold text-slate-800">{emergency.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="w-full md:w-72 bg-white border-l border-slate-100 p-6 flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-4">Telemetry Details</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
                  <div className="mt-0.5"><Clock className="w-4 h-4 text-blue-500" /></div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Estimated Arrival</div>
                    <div className="text-xl font-black text-slate-800">{eta} <span className="text-sm font-semibold text-slate-500">mins</span></div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
                  <div className="mt-0.5"><Navigation className="w-4 h-4 text-emerald-500" /></div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Distance to Patient</div>
                    <div className="text-xl font-black text-slate-800">{distance} <span className="text-sm font-semibold text-slate-500">mi</span></div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
                  <div className="mt-0.5"><Activity className="w-4 h-4 text-red-500" /></div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Patient Priority</div>
                    <div className="text-sm font-bold text-slate-800">{emergency.priority} - {emergency.title}</div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
                  <div className="mt-0.5"><Hospital className="w-4 h-4 text-indigo-500" /></div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Receiving Facility</div>
                    <div className="text-sm font-bold text-slate-800">Central Care Hospital</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <button 
                onClick={onClose}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors text-sm cursor-pointer"
              >
                Close Tracking
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
