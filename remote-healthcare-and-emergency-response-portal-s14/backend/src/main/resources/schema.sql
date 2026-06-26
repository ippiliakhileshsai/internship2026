CREATE TABLE IF NOT EXISTS ambulances (
  ambulance_id VARCHAR(36) PRIMARY KEY,
  vehicle_number VARCHAR(50) NOT NULL,
  driver_name VARCHAR(100) NOT NULL,
  driver_phone VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL
);

CREATE TABLE IF NOT EXISTS emergency_requests (
  request_id VARCHAR(36) PRIMARY KEY,
  patient_name VARCHAR(120) NOT NULL,
  patient_phone VARCHAR(20) NOT NULL,
  patient_address VARCHAR(255) NOT NULL,
  emergency_type VARCHAR(120) NOT NULL,
  priority VARCHAR(20) NOT NULL,
  ambulance_id VARCHAR(36),
  request_time TIMESTAMP NOT NULL,
  status VARCHAR(40) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  estimated_distance_km DOUBLE NOT NULL DEFAULT 0,
  estimated_eta_minutes INT NOT NULL DEFAULT 0,
  response_minutes INT NOT NULL DEFAULT 0,
  allocation_score DOUBLE NOT NULL DEFAULT 0,
  hospital_id VARCHAR(36),
  hospital_name VARCHAR(120)
);

CREATE TABLE IF NOT EXISTS location_history (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  ambulance_id VARCHAR(36) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  timestamp TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS hospitals (
  hospital_id VARCHAR(36) PRIMARY KEY,
  hospital_name VARCHAR(120) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL
);
