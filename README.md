# ZigZag
A simple sales and stock management system built with Next.js. It connects to Google Sheets (via n8n) to keep track of inventory and pending payments.

## What it does
- Stock Management: Add new products to the inventory.
- Sales Tracking: Register new sales and assign them to clients.
- Payments: Update payment status (Pending -> Paid).
- Integration: Everything syncs with a Google Sheet in the background.

## Tech Stack
- Frontend: Next.js (App Router), TypeScript, Tailwind CSS.
- Forms: Formik + Yup.
- Backend/Automation: n8n (handling Webhooks to Google Sheets).
