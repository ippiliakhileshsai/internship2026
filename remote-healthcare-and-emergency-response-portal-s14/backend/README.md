# Ambulance Tracker Backend

Spring Boot backend for the ambulance tracking and emergency response portal.

## Features

- Smart ambulance allocation API
- Emergency request tracking API
- Ambulance GPS location updates
- WebSocket broadcasts for live tracking
- Dashboard statistics endpoint
- MySQL schema and seed SQL

## Run locally

1. Set MySQL connection env vars or edit `src/main/resources/application.yml`.
2. Run `mvn spring-boot:run` from the `backend` folder.
3. Connect the frontend to `http://localhost:8080`.

### MySQL setup

- Create a database for the app, e.g. `ambulance_tracker`:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS ambulance_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

- Provide connection details via environment variables or edit `src/main/resources/application.yml`:

```
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/ambulance_tracker
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
```

- The project includes `schema.sql` and `data.sql` in `src/main/resources` which are loaded on startup (see `application.yml`).

## Main endpoints

- `POST /api/emergency/request`
- `GET /api/emergency/track/{requestId}`
- `POST /api/ambulance/update-location`
- `GET /api/ambulance/nearest`
- `PUT /api/emergency/status`
- `GET /api/dashboard/statistics`
