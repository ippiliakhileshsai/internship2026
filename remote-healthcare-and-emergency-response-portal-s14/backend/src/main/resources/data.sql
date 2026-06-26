INSERT INTO ambulances (ambulance_id, vehicle_number, driver_name, driver_phone, status, latitude, longitude) VALUES
('AMB-101', 'KA-05-ND-101', 'Ravi Kumar', '+91 98765 11011', 'AVAILABLE', 12.9719, 77.5943),
('AMB-102', 'KA-05-ND-205', 'Suresh Patel', '+91 98765 11022', 'BUSY', 12.9635, 77.5874),
('AMB-103', 'KA-05-ND-334', 'Anita Sharma', '+91 98765 11033', 'AVAILABLE', 12.9842, 77.6051),
('AMB-104', 'KA-05-ND-447', 'Mohan Das', '+91 98765 11044', 'BUSY', 12.9526, 77.5734),
('AMB-105', 'KA-05-ND-501', 'Farah Khan', '+91 98765 11055', 'AVAILABLE', 12.9923, 77.5792);

INSERT INTO hospitals (hospital_id, hospital_name, latitude, longitude) VALUES
('HOS-1', 'City General Hospital', 12.9766, 77.5993),
('HOS-2', 'Carewell Heart Center', 12.9608, 77.5829),
('HOS-3', 'Metro Emergency Clinic', 12.9876, 77.6211);

INSERT INTO emergency_requests (request_id, patient_name, patient_phone, patient_address, emergency_type, priority, ambulance_id, request_time, status, latitude, longitude, estimated_distance_km, estimated_eta_minutes, response_minutes, allocation_score, hospital_id, hospital_name) VALUES
('REQ-9001', 'Asha Reddy', '+91 99000 45001', 'Benz Circle, Vijayawada', 'Cardiac Arrest', 'CRITICAL', 'AMB-103', TIMESTAMP '2026-06-19 10:05:00', 'ASSIGNED', 12.9684, 77.7502, 1.9, 7, 5, 2.6, 'HOS-1', 'City General Hospital'),
('REQ-9002', 'Rohit Shah', '+91 99000 45002', 'Governorpet, Vijayawada', 'Major Accident', 'HIGH', 'AMB-101', TIMESTAMP '2026-06-19 09:45:00', 'ON_THE_WAY', 12.9706, 77.6412, 2.1, 9, 6, 3.4, 'HOS-1', 'City General Hospital'),
('REQ-9003', 'Lakshmi Devi', '+91 99000 45003', 'Eluru Road, Vijayawada', 'Stroke', 'MEDIUM', NULL, TIMESTAMP '2026-06-19 09:20:00', 'REQUESTED', 12.9678, 77.6418, 0, 0, 0, 0, NULL, NULL);
