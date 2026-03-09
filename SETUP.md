# MAHAGENCO Dashboard - Setup & Installation Guide

Complete guide for setting up the development environment and deploying the application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Manual Setup](#manual-setup)
4. [Database Configuration](#database-configuration)
5. [Integration Setup](#integration-setup)
6. [Running the Application](#running-the-application)
7. [Verification](#verification)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js:** v18.0.0 or higher
  - Download: https://nodejs.org/
  - Verify: `node --version` and `npm --version`

- **PostgreSQL:** v13 or higher
  - Download: https://www.postgresql.org/download/
  - Verify: `psql --version`

- **Redis:** v6 or higher
  - Download: https://redis.io/download
  - Verify: `redis-cli --version`

- **Git:** v2.30+
  - Download: https://git-scm.com/

- **Docker & Docker Compose:** (Optional but recommended)
  - Download: https://www.docker.com/products/docker-desktop

### System Requirements

- **OS:** Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **RAM:** Minimum 8GB (16GB recommended)
- **Disk Space:** 10GB free
- **Processor:** Intel i5 or equivalent

---

## Quick Start (Docker)

### Fastest Way to Get Started

```bash
# 1. Clone repository
git clone https://github.com/mahagenco/centralized-monitoring.git
cd centralized-monitoring

# 2. Copy environment file
cp .env.example .env

# 3. Start all services
docker-compose up -d

# 4. Initialize database
docker-compose exec backend npm run db:setup

# 5. Access application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
# Database UI: http://localhost:8080 (adminer)
```

### Check Status

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

---

## Manual Setup

### 1. Clone Repository

```bash
git clone https://github.com/mahagenco/centralized-monitoring.git
cd centralized-monitoring
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables (important!)
nano .env
# Or use your preferred editor
```

### 3. PostgreSQL Setup

#### On macOS/Linux:

```bash
# Create PostgreSQL user
createuser -P postgres
# Enter password when prompted

# Create database
createdb -O postgres mahagenco_dashboard

# Verify connection
psql -U postgres -d mahagenco_dashboard -c "SELECT version();"
```

#### On Windows (Using pgAdmin):

1. Open pgAdmin (comes with PostgreSQL)
2. Right-click "Servers" > Create > Server
3. Set name to "MAHAGENCO" and hostname to "localhost"
4. Right-click database > Create > Database
5. Name: `mahagenco_dashboard`

### 4. Redis Setup

#### On macOS:

```bash
# Install via Homebrew
brew install redis

# Start Redis
brew services start redis

# Verify
redis-cli ping
# Should return: PONG
```

#### On Linux:

```bash
# Install
sudo apt-get install redis-server

# Start
sudo systemctl start redis-server

# Verify
redis-cli ping
```

#### On Windows:

Use Windows Subsystem for Linux (WSL) or:
1. Download: https://github.com/microsoftarchive/redis/releases
2. Extract and run `redis-server.exe`

### 5. Install Dependencies

```bash
# Install root dependencies
npm install

# Install workspace dependencies
npm install --workspace frontend
npm install --workspace backend

# Verify installation
npm list
```

### 6. Database Migrations

```bash
# Navigate to backend
cd backend

# Run migrations
npm run migrate:latest

# Seed initial data
npm run seed:run

# Verify
npm run migrate:status

# Go back to root
cd ..
```

---

## Database Configuration

### Connection String Format

```
postgresql://username:password@host:port/database_name
```

### Example Configurations

**Local Development:**
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/mahagenco_dashboard
```

**Production (AWS RDS):**
```
DATABASE_URL=postgresql://admin:strong-password@db-instance.c9akciq32.us-east-1.rds.amazonaws.com:5432/mahagenco_prod
```

### Testing Connection

```bash
# Using psql
psql postgresql://postgres:password@localhost:5432/mahagenco_dashboard

# Using Node.js
node -e "require('pg').connect('postgresql://...', (err, client) => { console.log(err ? 'Failed' : 'Connected'); })"
```

### Database Initialization

```bash
# Automatic setup
npm run db:setup

# OR manual steps:
npm run migrate:latest        # Run migrations
npm run seed:run              # Load seed data
npm run migrate:status        # Check status

# Reset database (CAREFUL!)
npm run db:reset
```

---

## Integration Setup

### SCADA/DCS Integration

1. **Configure Connection:**
   ```env
   SCADA_API_URL=http://your-scada-server:port/api
   SCADA_API_KEY=your-api-key
   SCADA_SYNC_INTERVAL_SECONDS=300
   ```

2. **Test Connection:**
   ```bash
   curl -H "Authorization: Bearer YOUR_KEY" http://your-scada-server:port/api/health
   ```

3. **Enable in Backend:**
   - Update `backend/src/integrations/scada.js`
   - Configure data mapping
   - Test data sync

### EFDS Integration

1. **Setup:**
   ```env
   EFDS_API_URL=http://efds-server:8080/api
   EFDS_API_KEY=your-efds-api-key
   ```

2. **Verify:**
   - Check `backend/src/integrations/efds.js`
   - Test API endpoint connectivity

### Email Configuration

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**For Gmail:**
1. Enable 2FA on Gmail
2. Create App Password: https://myaccount.google.com/apppasswords
3. Use generated password

---

## Running the Application

### Start All Services

```bash
# From root directory
npm start

# This runs:
# - Frontend (React) on http://localhost:3000
# - Backend (Express) on http://localhost:5000
```

### Start Individually

```bash
# Terminal 1: Frontend
npm start --workspace frontend

# Terminal 2: Backend
npm start --workspace backend
```

### Development Mode (with hot reload)

```bash
# Frontend with Webpack HMR
npm run dev --workspace frontend

# Backend with Nodemon
npm run dev --workspace backend
```

---

## Verification

### Frontend Checks

```bash
# 1. Access URL
open http://localhost:3000

# 2. Check console for errors
# Press F12 > Console tab

# 3. Test login
# Email: admin@mahagenco.com
# Password: Admin@123

# 4. Verify API calls
# Press F12 > Network tab
# Refresh page
# Should see API calls to http://localhost:5000/api
```

### Backend Checks

```bash
# 1. Health check
curl http://localhost:5000/api/health

# Expected response:
# {"status":"ok","timestamp":"2024-01-15T10:30:00Z"}

# 2. Check database connection
curl http://localhost:5000/api/plants

# 3. View logs
npm logs --workspace backend

# 4. Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mahagenco.com","password":"Admin@123"}'
```

### Database Checks

```bash
# Connect to database
psql postgresql://postgres:password@localhost:5432/mahagenco_dashboard

# Check tables
\dt

# Check migrations
SELECT * FROM knex_migrations;

# Verify data
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM plants;
SELECT COUNT(*) FROM units;
```

---

## Troubleshooting

### Issue: "Cannot connect to PostgreSQL"

**Solution:**
```bash
# Check if PostgreSQL is running
# macOS
brew services list | grep postgres

# Linux
sudo systemctl status postgresql

# Windows
sc query PostgreSQL14

# Test connection
psql -U postgres
```

### Issue: "Port 5000 already in use"

```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or change port in .env
PORT=5001
```

### Issue: "Redis connection refused"

```bash
# Start Redis
redis-server

# OR on macOS with Homebrew
brew services start redis

# Verify
redis-cli ping
# Should return: PONG
```

### Issue: "Migration fails"

```bash
# Check migration status
npm run migrate:status --workspace backend

# Rollback last migration
npm run migrate:rollback --workspace backend

# Run migrations again
npm run migrate:latest --workspace backend
```

### Issue: "npm install fails"

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: "Frontend can't connect to backend"

1. **Check CORS configuration:**
   ```env
   CORS_ORIGIN=http://localhost:3000
   ```

2. **Verify API URL in frontend:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Clear browser cache:** Ctrl+Shift+Delete

### Issue: "Docker container won't start"

```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild containers
docker-compose down
docker-compose up --build

# Remove volumes and restart (CAREFUL - deletes data)
docker-compose down -v
docker-compose up
```

---

## Next Steps

1. **Read Documentation:**
   - [Architecture Overview](docs/ARCHITECTURE.md)
   - [API Specification](docs/API_SPECIFICATION.md)

2. **Configure Integrations:**
   - Setup SCADA connection
   - Configure EFDS integration
   - Setup email notifications

3. **Customize Data:**
   - Add your plant configurations
   - Map data sources
   - Configure alert rules

4. **Deploy:**
   - Follow [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
   - Setup CI/CD pipeline
   - Configure production environment

---

## Getting Help

- **Documentation:** Check `docs/` folder
- **Issues:** Search [GitHub Issues](https://github.com/mahagenco/centralized-monitoring/issues)
- **Contributing:** See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Email:** dashboard-support@mahagenco.com

---

**Last Updated:** March 2026  
**Setup Guide Version:** 1.0
