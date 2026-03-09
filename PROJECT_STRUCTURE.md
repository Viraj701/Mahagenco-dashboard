# MAHAGENCO Dashboard - Project Structure

Complete directory structure and file descriptions for the GitHub project.

## Root Level Files

```
mahagenco-dashboard/
├── README.md                      # Main project documentation
├── SETUP.md                       # Installation and setup guide
├── CONTRIBUTING.md               # Contribution guidelines
├── CODE_OF_CONDUCT.md           # Community standards
├── LICENSE                       # MAHAGENCO internal license
├── VERSION                       # Current version (0.1.0-alpha)
├── .gitignore                   # Git ignore patterns
├── .env.example                 # Environment variables template
├── package.json                 # Root monorepo config
├── docker-compose.yml           # Local development setup
└── jest.config.js              # Jest configuration

```

---

## Directory Structure

### `/frontend` - React Application

```
frontend/
├── package.json                 # Frontend dependencies
├── .env.example                # Frontend environment template
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── index.jsx               # React entry point
│   ├── App.jsx                 # Main app component
│   ├── components/
│   │   ├── Layout/             # Main layout wrapper
│   │   ├── Dashboard/          # Dashboard components
│   │   │   ├── HomePage.jsx
│   │   │   ├── PlantDashboard.jsx
│   │   │   └── WidgetLayout.jsx
│   │   ├── Widgets/            # Individual widget components
│   │   │   ├── GenerationWidget.jsx
│   │   │   ├── CapacityFactorWidget.jsx
│   │   │   ├── APCWidget.jsx
│   │   │   ├── AlertWidget.jsx
│   │   │   ├── EquipmentHealthWidget.jsx
│   │   │   └── ... (more widgets)
│   │   ├── Charts/             # Chart components
│   │   │   ├── LineChart.jsx
│   │   │   ├── BarChart.jsx
│   │   │   ├── GaugeChart.jsx
│   │   │   └── PieChart.jsx
│   │   ├── Tables/             # Table components
│   │   │   ├── DataTable.jsx
│   │   │   ├── PlantTable.jsx
│   │   │   └── AlertTable.jsx
│   │   ├── Common/             # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Card.jsx
│   │   └── Forms/
│   │       ├── LoginForm.jsx
│   │       ├── FilterForm.jsx
│   │       └── ConfigForm.jsx
│   ├── pages/                  # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── PlantDashboard.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── ReportsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── NotFound.jsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   ├── useSocket.js
│   │   ├── useForm.js
│   │   └── useLocalStorage.js
│   ├── store/                  # Redux state management
│   │   ├── index.js
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── dashboardSlice.js
│   │   │   ├── generationSlice.js
│   │   │   ├── alertsSlice.js
│   │   │   └── uiSlice.js
│   │   └── middleware/
│   ├── services/               # API services
│   │   ├── api.js              # Axios instance
│   │   ├── auth.service.js
│   │   ├── generation.service.js
│   │   ├── performance.service.js
│   │   ├── alerts.service.js
│   │   └── reports.service.js
│   ├── styles/                 # Global styles
│   │   ├── index.css
│   │   ├── variables.css
│   │   ├── animations.css
│   │   └── responsive.css
│   ├── utils/                  # Utility functions
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   ├── constants.js
│   │   ├── date.utils.js
│   │   └── localStorage.utils.js
│   └── assets/                 # Static assets
│       ├── images/
│       ├── icons/
│       └── fonts/
└── tests/                      # Test files
    ├── unit/
    │   ├── components.test.js
    │   ├── hooks.test.js
    │   └── services.test.js
    └── integration/
        └── dashboard.test.js
```

### `/backend` - Node.js/Express Backend

```
backend/
├── package.json                # Backend dependencies
├── .env.example               # Backend environment template
├── .eslintrc.json            # ESLint configuration
├── knexfile.js               # Knex configuration
├── src/
│   ├── server.js             # Server entry point
│   ├── app.js                # Express app setup
│   ├── api/                  # API routes
│   │   ├── auth/
│   │   │   ├── routes.js
│   │   │   ├── controller.js
│   │   │   └── middleware.js
│   │   ├── generation/
│   │   │   ├── routes.js
│   │   │   ├── controller.js
│   │   │   └── queries.js
│   │   ├── performance/
│   │   │   ├── routes.js
│   │   │   └── controller.js
│   │   ├── maintenance/
│   │   │   ├── routes.js
│   │   │   └── controller.js
│   │   ├── financial/
│   │   │   ├── routes.js
│   │   │   └── controller.js
│   │   ├── alerts/
│   │   │   ├── routes.js
│   │   │   ├── controller.js
│   │   │   └── handlers.js
│   │   ├── reports/
│   │   │   ├── routes.js
│   │   │   └── controller.js
│   │   └── health/
│   │       └── routes.js
│   ├── models/               # Database models
│   │   ├── User.js
│   │   ├── Plant.js
│   │   ├── Unit.js
│   │   ├── GenerationData.js
│   │   ├── Alert.js
│   │   ├── MaintenanceTask.js
│   │   ├── Report.js
│   │   └── Audit.js
│   ├── services/             # Business logic
│   │   ├── AuthService.js
│   │   ├── GenerationService.js
│   │   ├── PerformanceCalculator.js
│   │   ├── AlertService.js
│   │   ├── MaintenanceService.js
│   │   ├── ReportService.js
│   │   ├── EmailService.js
│   │   ├── NotificationService.js
│   │   ├── CacheService.js
│   │   └── DataSyncService.js
│   ├── middleware/           # Express middleware
│   │   ├── auth.js          # JWT authentication
│   │   ├── authorization.js # Role-based access
│   │   ├── validation.js    # Input validation
│   │   ├── errorHandler.js  # Error handling
│   │   ├── logger.js        # Request logging
│   │   ├── rateLimit.js     # Rate limiting
│   │   └── cors.js          # CORS configuration
│   ├── integrations/         # External system integrations
│   │   ├── scada.js         # SCADA/EMS integration
│   │   ├── efds.js          # Early Fault Detection System
│   │   ├── financeSystem.js # Finance system integration
│   │   ├── mms.js           # Maintenance Management System
│   │   └── dataSync.js      # Data synchronization
│   ├── utils/                # Utility functions
│   │   ├── logger.js        # Winston logger
│   │   ├── cache.js         # Redis cache utilities
│   │   ├── validators.js    # Business logic validators
│   │   ├── formatters.js    # Data formatters
│   │   ├── constants.js     # Application constants
│   │   ├── errors.js        # Custom error classes
│   │   └── helpers.js       # Helper functions
│   └── websocket/            # WebSocket handlers
│       ├── handlers.js
│       └── events.js
├── tests/                    # Test files
│   ├── unit/
│   │   ├── services.test.js
│   │   ├── models.test.js
│   │   ├── utils.test.js
│   │   └── middleware.test.js
│   ├── integration/
│   │   ├── api.test.js
│   │   ├── auth.test.js
│   │   ├── database.test.js
│   │   └── integrations.test.js
│   └── fixtures/
│       ├── users.json
│       ├── plants.json
│       └── mockData.js
├── migrations/               # Database migrations
│   ├── 001_create_users_table.js
│   ├── 002_create_plants_table.js
│   ├── 003_create_generation_data.js
│   ├── 004_create_alerts_table.js
│   └── ... (more migrations)
├── seeds/                    # Database seeds
│   ├── seed_users.js
│   ├── seed_plants.js
│   ├── seed_units.js
│   └── seed_alerts.js
└── config/                   # Configuration
    ├── env.config.js
    ├── database.config.js
    ├── redis.config.js
    └── logging.config.js
```

### `/python-workers` - Python Services (Analytics & ML)

```
python-workers/
├── requirements.txt          # Python dependencies
├── .env.example             # Environment variables
├── Dockerfile              # Docker image
├── src/
│   ├── main.py            # Entry point
│   ├── analytics/          # Analytics engine
│   │   ├── __init__.py
│   │   ├── kpi_calculator.py    # KPI calculations
│   │   ├── trend_analysis.py    # Trend analysis
│   │   ├── predictive.py        # Predictive models
│   │   └── anomaly_detection.py # Anomaly detection
│   ├── integrations/       # External integrations
│   │   ├── __init__.py
│   │   ├── scada_connector.py
│   │   ├── efds_connector.py
│   │   └── database_sync.py
│   ├── models/             # ML models
│   │   ├── __init__.py
│   │   ├── predictive_maintenance.py
│   │   ├── equipment_health.py
│   │   └── optimization.py
│   ├── utils/              # Utilities
│   │   ├── __init__.py
│   │   ├── logger.py
│   │   ├── config.py
│   │   ├── validators.py
│   │   └── formatters.py
│   └── tasks/              # Background tasks
│       ├── __init__.py
│       ├── sync_data.py
│       ├── calculate_kpi.py
│       └── generate_alerts.py
└── tests/
    ├── unit/
    ├── integration/
    └── fixtures/
```

### `/infrastructure` - DevOps & Infrastructure

```
infrastructure/
├── docker/                 # Docker configuration
│   ├── Dockerfile.backend  # Backend container
│   ├── Dockerfile.frontend # Frontend container
│   ├── Dockerfile.python   # Python workers
│   ├── docker-compose.yml  # Local development
│   ├── nginx.conf         # Nginx web server config
│   └── nginx-frontend.conf # Frontend nginx config
├── kubernetes/            # Kubernetes manifests
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secrets.yaml
│   ├── postgres-deployment.yaml
│   ├── redis-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-service.yaml
│   ├── ingress.yaml
│   ├── hpa.yaml          # Horizontal Pod Autoscaler
│   └── pdb.yaml          # Pod Disruption Budget
├── terraform/            # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── vpc.tf
│   ├── security.tf
│   ├── rds.tf
│   ├── elasticache.tf
│   ├── ecs.tf
│   └── modules/
│       ├── vpc/
│       ├── rds/
│       ├── ecs/
│       └── networking/
├── ci-cd/                # CI/CD pipeline
│   ├── .github/workflows/
│   │   ├── ci.yml       # Continuous Integration
│   │   ├── deploy-staging.yml
│   │   ├── deploy-prod.yml
│   │   ├── security-scan.yml
│   │   └── performance-test.yml
│   └── scripts/
│       ├── build.sh     # Build script
│       ├── test.sh      # Test script
│       └── deploy.sh    # Deploy script
└── monitoring/          # Monitoring & logging
    ├── prometheus.yml   # Prometheus config
    ├── alerts.yml      # Alert rules
    ├── grafana-dashboards/
    │   ├── overview.json
    │   ├── backend.json
    │   ├── database.json
    │   └── kubernetes.json
    └── fluent-bit.conf # Log forwarding
```

### `/tests` - Integration & E2E Tests

```
tests/
├── e2e/                   # End-to-end tests
│   ├── login.test.js
│   ├── dashboard.test.js
│   ├── reports.test.js
│   ├── alerts.test.js
│   └── navigation.test.js
├── load-testing/         # Performance tests
│   ├── k6-script.js      # K6 load testing
│   └── gatling/
├── security/            # Security tests
│   ├── auth.test.js
│   ├── sql-injection.test.js
│   ├── xss.test.js
│   └── csrf.test.js
└── fixtures/
    ├── test-data.json
    └── mock-responses.js
```

### `/docs` - Documentation

```
docs/
├── ARCHITECTURE.md          # System architecture
├── API_SPECIFICATION.md     # API endpoints
├── DATABASE_SCHEMA.md       # Database design
├── DEPLOYMENT_GUIDE.md      # Deployment steps
├── USER_GUIDE.md           # End-user documentation
├── DEVELOPER_GUIDE.md      # Development guidelines
├── TROUBLESHOOTING.md      # Common issues
├── INTEGRATIONS.md         # Integration setup
├── SECURITY.md             # Security guidelines
├── PERFORMANCE.md          # Performance tuning
├── MONITORING.md           # Monitoring setup
└── diagrams/               # Architecture diagrams
    ├── system-architecture.svg
    ├── data-flow.svg
    └── deployment-diagram.svg
```

### `/.github` - GitHub Specific

```
.github/
├── workflows/              # (links to infrastructure/ci-cd)
│   ├── ci.yml
│   ├── deploy-staging.yml
│   └── deploy-prod.yml
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   ├── feature_request.md
│   └── documentation.md
├── PULL_REQUEST_TEMPLATE.md
└── dependabot.yml         # Dependency updates
```

### `/config` - Configuration Files

```
config/
├── database.config.js      # Database configuration
├── redis.config.js        # Redis configuration
├── logging.config.js      # Logging setup
├── env.config.example.json # Environment template
└── constants.json         # Application constants
```

---

## Key Files Summary

| File/Folder | Purpose |
|-------------|---------|
| `README.md` | Main project documentation |
| `SETUP.md` | Installation guide |
| `CONTRIBUTING.md` | Contribution guidelines |
| `docker-compose.yml` | Local development setup |
| `.env.example` | Environment variables template |
| `frontend/` | React application |
| `backend/` | Node.js/Express API |
| `infrastructure/docker/` | Docker configuration |
| `infrastructure/kubernetes/` | K8s manifests |
| `docs/` | Technical documentation |
| `.github/workflows/` | CI/CD pipelines |

---

## File Statistics

- **Total Directories:** 50+
- **Configuration Files:** 15+
- **Documentation Files:** 12+
- **Source Code Files:** 100+
- **Test Files:** 30+
- **Docker Files:** 5
- **Kubernetes Manifests:** 10
- **GitHub Workflows:** 4

---

## Getting Started

1. **Review:** Start with `README.md`
2. **Setup:** Follow `SETUP.md`
3. **Understand:** Read `docs/ARCHITECTURE.md`
4. **Contribute:** Check `CONTRIBUTING.md`
5. **Deploy:** Use `docs/DEPLOYMENT_GUIDE.md`

---

**Project Structure Version:** 1.0  
**Last Updated:** March 2026
