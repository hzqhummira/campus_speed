# CAMPUSPEED Dashboard

A modern React + Vite prototype for:

**CAMPUSPEED: Cost-Optimized IoT-Based Speed Monitoring and Warning System**

## Included pages
- Overview
- Live Monitoring
- Violations
- Vehicle Records
- Analytics
- Cost Optimization
- System Health
- Settings

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Build for deployment

```bash
npm run build
```

The production files will be created in `dist/`.

## Important
The current dashboard uses mock/sample data so that the FYP UI can be developed before the Raspberry Pi/AWS backend is complete.

Later integration points:
- Raspberry Pi/OpenCV/EasyOCR -> AWS IoT Core
- AWS Lambda -> event processing
- Amazon RDS -> violation metadata
- Amazon S3 -> captured evidence images
- Amazon CloudWatch -> system/resource metrics
- API on EC2 -> frontend REST endpoints

Suggested future API routes:
- GET /api/dashboard/summary
- GET /api/violations
- GET /api/violations/:id
- GET /api/vehicles
- GET /api/analytics
- GET /api/cost-optimization
- GET /api/system-health
- PATCH /api/settings
