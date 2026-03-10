# ⚡ PowerAI — Asset Intelligence Dashboard

AI-powered asset health monitoring dashboard for power plant operations. Covers **7 systems**: Turbine, Boiler, CHP, AHP, ESP/FGD, APC, and MOD Prediction.

---

## 🚀 Quick Start (Local)

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/powerai-dashboard.git
cd powerai-dashboard

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
```
Open http://localhost:3000

---

## 🐳 Run with Docker Locally

```bash
docker build -t powerai-dashboard .
docker run -p 8080:8080 powerai-dashboard
```
Open http://localhost:8080

---

## ☁️ Deploy to Google Cloud Run (Manual)

### Prerequisites
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) installed
- A GCP project created

### Steps

```bash
# 1. Login and set project
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# 2. Enable required APIs
gcloud services enable run.googleapis.com containerregistry.googleapis.com

# 3. Build and push image
docker build -t gcr.io/YOUR_PROJECT_ID/powerai-dashboard .
docker push gcr.io/YOUR_PROJECT_ID/powerai-dashboard

# 4. Deploy to Cloud Run
gcloud run deploy powerai-dashboard \
  --image gcr.io/YOUR_PROJECT_ID/powerai-dashboard \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

Your app will be live at a URL like:
```
https://powerai-dashboard-xxxx-uc.a.run.app
```

---

## 🤖 Auto-Deploy via GitHub Actions (CI/CD)

Every push to `main` automatically builds and deploys to Cloud Run.

### Setup GitHub Secrets

Go to your GitHub repo → **Settings → Secrets and variables → Actions** → Add:

| Secret Name | Value |
|---|---|
| `GCP_PROJECT_ID` | Your Google Cloud project ID |
| `GCP_SA_KEY` | Service account JSON key (see below) |

### Create a Service Account Key

```bash
# Create service account
gcloud iam service-accounts create github-actions \
  --display-name "GitHub Actions"

# Grant permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Download the key
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com

# Copy the contents of key.json into the GCP_SA_KEY secret
cat key.json
```

Now push to `main` and GitHub Actions will deploy automatically! 🎉

---

## 📁 Project Structure

```
powerai-dashboard/
├── src/
│   ├── main.jsx          # React entry point
│   └── App.jsx           # All 7 dashboards
├── index.html            # HTML shell
├── vite.config.js        # Vite config
├── package.json          # Dependencies
├── Dockerfile            # Container build
├── nginx.conf            # nginx for Cloud Run
├── .dockerignore
├── .gitignore
└── .github/
    └── workflows/
        └── deploy.yml    # CI/CD pipeline
```

---

## 📊 Dashboards Included

| Dashboard | Key Features |
|---|---|
| ⚙️ Turbine | Vibration trends, component health gauges, efficiency degradation |
| 🔥 Boiler | Metal temp monitoring, coal mill health, APH fouling |
| ⛏️ CHP | Conveyor performance, belt wear prediction, equipment status |
| 💧 AHP | Slurry pump wear, silo level forecasting, water consumption |
| 🌿 ESP/FGD | ESP efficiency, emission compliance, breach prediction |
| ⚡ APC | APC real-time, auxiliary breakdown, seasonal impact |
| 📈 MOD | MOD rate, coal matrix simulation, stack loss prediction |
