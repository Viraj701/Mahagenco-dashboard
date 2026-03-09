# MAHAGENCO Centralized Monitoring System

## Overview

A professional-grade, enterprise-scale centralized dashboarding system for MAHAGENCO's thermal power generation assets across 8 locations. This system provides real-time techno-commercial performance monitoring, predictive maintenance, and advanced analytics for C-suite to operations teams.

**Project Type:** Full-Stack Web Application with Real-time Data Integration  
**Target Users:** Executive Management, Plant Managers, Operations Engineers, Commercial Teams  
**Deployment Model:** Cloud-Native (AWS/Azure), On-Premise Ready  
**Tech Stack:** React, Node.js, Python, PostgreSQL, Redis, Docker, Kubernetes  

---

## 📊 Key Features

### Real-Time Monitoring
- Live generation status across 8 thermal power plants
- Unit-wise performance tracking (Running, Outage, Maintenance states)
- SCADA/DCS data integration with 1-5 minute refresh rates
- Grid frequency and voltage monitoring

### Performance Analytics
- **Capacity Factor** tracking (85-90% target)
- **Auxiliary Power Consumption (APC)** optimization (<5.5% target)
- **Heat Rate (HR)** efficiency monitoring
- **Equipment Availability** metrics
- **Forced Outage Rate (FOR)** compliance

### Operations & Maintenance
- Early Fault Detection System (EFDS) integration
- Preventive Maintenance scheduling and compliance tracking
- Equipment health scoring with predictive alerts
- Coal mill, ash handling, and CHP performance monitoring
- MTTR/MTBF trending analysis

### Commercial Intelligence
- Revenue vs. target tracking (₹ basis)
- PPA compliance scorecard
- O&M cost analysis and optimization
- Fuel cost management
- Environmental compliance monitoring

### Alert Management
- Critical alerts (immediate notification)
- Warning alerts (within 1 hour)
- Informational summaries (daily)
- Multi-channel notification (Email, SMS, In-App)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│         User Interface Layer (React)                │
│  ┌──────────────┬──────────────┬──────────────┐   │
│  │ Dashboards   │ Reports      │ Analytics    │   │
│  └──────────────┴──────────────┴──────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────┐
│         API Gateway & Middleware (Node.js)          │
│  ┌──────────────┬──────────────┬──────────────┐   │
│  │ REST API     │ WebSocket    │ Auth/JWT     │   │
│  └──────────────┴──────────────┴──────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────┐
│      Business Logic & Services (Node.js/Python)     │
│  ┌──────────────┬──────────────┬──────────────┐   │
│  │ Data Sync    │ Analytics    │ Alerts       │   │
│  └──────────────┴──────────────┴──────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────┐
│      Data Layer & Integrations                      │
│  ┌──────────────┬──────────────┬──────────────┐   │
│  │ PostgreSQL   │ Redis Cache  │ EFDS/SCADA   │   │
│  └──────────────┴──────────────┴──────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure

```
mahagenco-dashboard/
├── docs/                           # Documentation
│   ├── ARCHITECTURE.md
│   ├── API_SPECIFICATION.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── DATABASE_SCHEMA.md
│   └── USER_GUIDE.md
│
├── frontend/                       # React Application
│   ├── public/
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── Dashboard/
│   │   │   ├── Widgets/
│   │   │   ├── Charts/
│   │   │   ├── Tables/
│   │   │   └── Common/
│   │   ├── pages/                 # Page components
│   │   │   ├── HomePage/
│   │   │   ├── PlantDashboard/
│   │   │   ├── Reports/
│   │   │   └── Analytics/
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── store/                 # Redux state management
│   │   ├── services/              # API services
│   │   ├── styles/                # Global styles
│   │   ├── utils/                 # Utility functions
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── tests/                     # Jest tests
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── backend/                        # Node.js/Express Backend
│   ├── src/
│   │   ├── api/                   # API routes
│   │   │   ├── auth/
│   │   │   ├── generation/
│   │   │   ├── performance/
│   │   │   ├── maintenance/
│   │   │   ├── financial/
│   │   │   └── alerts/
│   │   ├── models/                # Database models
│   │   │   ├── Plant.js
│   │   │   ├── Unit.js
│   │   │   ├── GenerationData.js
│   │   │   ├── Alert.js
│   │   │   └── User.js
│   │   ├── services/              # Business logic
│   │   │   ├── dataSync.js
│   │   │   ├── performanceCalculator.js
│   │   │   ├── alertService.js
│   │   │   └── reportService.js
│   │   ├── middleware/            # Express middleware
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── utils/                 # Utility functions
│   │   │   ├── logger.js
│   │   │   ├── cache.js
│   │   │   └── validators.js
│   │   ├── integrations/          # External system integrations
│   │   │   ├── scada.js
│   │   │   ├── efds.js
│   │   │   └── financeSystem.js
│   │   ├── app.js                 # Express app setup
│   │   └── server.js              # Server entry point
│   ├── tests/                     # Jest/Mocha tests
│   │   ├── unit/
│   │   ├── integration/
│   │   └── fixtures/
│   ├── migrations/                # Database migrations
│   ├── seeds/                     # Seed data
│   ├── package.json
│   ├── .env.example
│   ├── .eslintrc.json
│   └── README.md
│
├── python-workers/                # Python Services (Optional)
│   ├── src/
│   │   ├── analytics/             # Analytics engine
│   │   │   ├── kpi_calculator.py
│   │   │   ├── trend_analysis.py
│   │   │   └── predictions.py
│   │   ├── integrations/          # External integrations
│   │   │   ├── scada_connector.py
│   │   │   ├── efds_connector.py
│   │   │   └── data_sync.py
│   │   ├── models/                # ML models
│   │   │   ├── predictive_maintenance.py
│   │   │   └── anomaly_detection.py
│   │   ├── utils/
│   │   └── main.py
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── infrastructure/                # DevOps & Infrastructure
│   ├── docker/
│   │   ├── Dockerfile.frontend
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.python
│   │   └── docker-compose.yml
│   ├── kubernetes/
│   │   ├── frontend-deployment.yaml
│   │   ├── backend-deployment.yaml
│   │   ├── postgres-deployment.yaml
│   │   ├── redis-deployment.yaml
│   │   ├── ingress.yaml
│   │   ├── service.yaml
│   │   └── configmap.yaml
│   ├── terraform/                 # IaC (AWS/Azure)
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── modules/
│   ├── ci-cd/
│   │   ├── .github/workflows/
│   │   │   ├── ci.yml
│   │   │   ├── deploy-staging.yml
│   │   │   ├── deploy-prod.yml
│   │   │   └── security-scan.yml
│   │   └── scripts/
│   │       ├── build.sh
│   │       ├── test.sh
│   │       └── deploy.sh
│   └── monitoring/
│       ├── prometheus.yml
│       ├── grafana-dashboards/
│       └── alerts.yml
│
├── tests/                         # Integration & E2E tests
│   ├── e2e/
│   │   ├── login.test.js
│   │   ├── dashboard.test.js
│   │   └── reports.test.js
│   ├── load-testing/
│   │   └── performance.js
│   └── security/
│       └── security-audit.js
│
├── .github/                       # GitHub specific
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── documentation.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/                 # (symlink to infrastructure/ci-cd)
│
├── config/                        # Configuration files
│   ├── database.config.js
│   ├── redis.config.js
│   ├── logging.config.js
│   └── env.config.example.json
│
├── .gitignore
├── .eslintignore
├── .env.example
├── docker-compose.yml             # Local development
├── package.json                   # Root package (monorepo)
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
└── VERSION
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.9+ (for analytics workers)
- PostgreSQL 13+
- Redis 6+
- Docker & Docker Compose (optional)

### Local Development Setup

```bash
# Clone repository
git clone https://github.com/mahagenco/centralized-monitoring.git
cd centralized-monitoring

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Start with Docker Compose
docker-compose up -d

# OR Manual setup
cd frontend && npm install && npm start
cd ../backend && npm install && npm start
```

### Database Setup
```bash
cd backend
npm run migrate:latest
npm run seed:data
```

---

## 📊 Dashboard Widgets (Implemented)

### Row 1: Top-Tier Indicators
- [x] Total Generation (Current MW)
- [x] System Capacity Factor (%)
- [x] Overall Equipment Availability
- [x] Grid Frequency/Supply Status

### Row 2: Operational Status
- [x] Unit Status Matrix (8 plants)
- [x] Critical Alerts Summary
- [x] Forced Outage Rate (FOR)
- [x] Maintenance Schedule Overview

### Row 3: Performance & Economics
- [x] Average Heat Rate (AHR) Performance
- [x] Auxiliary Power Consumption (APC)
- [x] Specific Energy Consumption (SEC)
- [x] Fuel Cost per MWh

### Row 4: Coal Handling & Ash
- [x] CHP Loadability & Throughput
- [x] Coal Mill Availability
- [x] Ash Evacuation Status
- [x] Fly Ash Utilization

### Row 5: Reliability & Maintenance
- [x] MTTF/MTBF Trending
- [x] Preventive Maintenance Compliance
- [x] Spare Parts Inventory
- [x] Equipment Health Score

### Row 6: Financial & Compliance
- [x] Revenue vs Target
- [x] PPA Compliance Scorecard
- [x] O&M Cost vs Budget
- [x] Environmental Compliance

---

## 🔌 Integration Points

| System | Type | Frequency | Status |
|--------|------|-----------|--------|
| SCADA/EMS | Real-time Sync | 1-5 min | Planned |
| Early Fault Detection System | Events | Real-time | Planned |
| Maintenance Management System | Data Sync | Real-time | Planned |
| Finance System | Daily Reports | Daily 8AM | Planned |
| Inventory Management | Stock Updates | Real-time | Planned |
| Environmental Monitoring | Emissions | Hourly | Planned |

---

## 🔐 Security Features

- JWT-based authentication
- Role-Based Access Control (RBAC)
- Data encryption (TLS/SSL)
- SQL injection prevention (Prepared statements)
- XSS protection
- CSRF tokens
- Rate limiting
- Audit logging
- Regular security scanning (OWASP)

---

## 📈 Performance Targets

- **Page Load Time:** <2 seconds (dashboard)
- **API Response Time:** <500ms (95th percentile)
- **Real-time Data Latency:** <5 seconds
- **System Availability:** 99.5%
- **Concurrent Users:** 500+
- **Data Points Per Second:** 10,000+

---

## 🧪 Testing Coverage

- **Unit Tests:** 80%+ coverage
- **Integration Tests:** Critical paths covered
- **E2E Tests:** User workflows
- **Load Testing:** 1000+ concurrent users
- **Security Testing:** OWASP top 10

---

## 📋 Development Roadmap

### Phase 1: Foundation (Months 1-2)
- [x] Project setup and scaffolding
- [ ] Core database schema
- [ ] Authentication system
- [ ] SCADA data integration
- [ ] Basic dashboards (Generation, Status)
- [ ] Pilot at 1 plant

### Phase 2: Core Operations (Months 3-4)
- [ ] Full 8-plant deployment
- [ ] Coal Handling & Mill dashboards
- [ ] APC analysis module
- [ ] Alert system implementation
- [ ] Mobile responsiveness
- [ ] Operations team training

### Phase 3: Advanced Analytics (Months 5-6)
- [ ] Predictive maintenance (ML models)
- [ ] Financial impact analysis
- [ ] Environmental compliance module
- [ ] Custom report builder
- [ ] Mobile app (React Native)

### Phase 4: Optimization (Months 7+)
- [ ] AI-powered recommendations
- [ ] Advanced scenario planning
- [ ] Industry benchmark comparisons
- [ ] External data integrations
- [ ] Performance optimization

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Code Style
- JavaScript: ESLint (Airbnb config)
- Python: PEP 8 (Black formatter)
- React: Functional components with Hooks

### Commit Messages
```
[TYPE] Brief description
- TYPE: feat, fix, docs, style, refactor, test, chore
- Use imperative mood ("add feature" not "added feature")
```

### Pull Request Process
1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "[feat] Description"`
3. Push to branch: `git push origin feature/your-feature`
4. Create Pull Request with description
5. Pass CI/CD checks
6. Code review approval
7. Merge to main

---

## 📚 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Specification](docs/API_SPECIFICATION.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [User Guide](docs/USER_GUIDE.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

---

## 🐛 Bug Reports & Feature Requests

- **Bugs:** Use [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md)
- **Features:** Use [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md)
- **Documentation:** Use [Documentation Template](.github/ISSUE_TEMPLATE/documentation.md)

---

## 📞 Support

- **Issues:** GitHub Issues
- **Documentation:** [Wiki](https://github.com/mahagenco/centralized-monitoring/wiki)
- **Email:** dashboard@mahagenco.com
- **Internal Portal:** [Confluence Page](https://confluence.mahagenco.com/dashboard)

---

## 📄 License

This project is licensed under the MAHAGENCO Internal Use License - see [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Project Lead:** [Name] - Strategic oversight
- **Tech Lead:** [Name] - Architecture & Backend
- **Frontend Lead:** [Name] - UI/UX & React
- **DevOps Lead:** [Name] - Infrastructure & Deployment

---

## 🙏 Acknowledgments

Built on top of open-source technologies:
- React, Node.js, Express, PostgreSQL, Redis
- Chart.js, Recharts, Material-UI
- Docker, Kubernetes

---

**Last Updated:** March 2026  
**Version:** 0.1.0-alpha  
**Status:** In Active Development
