# ZigZag
A web platform built to digitize operations for a family retail business. It combines a public-facing product catalog with a secured administration panel for inventory management.

The system addresses the need for a mobile-first interface to manage sales, stock, and debts, replacing manual data entry while keeping Google Sheets as the persistent database to maintain owner autonomy.

This project was born out of a real-world need. My mother manages a retail business and was keeping track of daily operations—sales, stock, and debts—by manually entering data into Google Sheets cells. This workflow was prone to human error, difficult to use on mobile devices, and lacked input validation.

I developed ZigZag to solve this. It provides a dedicated, mobile-first web interface for her to manage business logic, while retaining Google Sheets as the persistent database. This allows her to maintain ownership and full visibility of her data without the complexity of a raw spreadsheet.

## Why Google Sheets?
I deliberately chose Google Sheets over a traditional SQL database (like PostgreSQL) to prioritize User Experience (UX) and maintainability for the client:

- **User Autonomy & Error Correction:** The end-user can manually fix typos, adjust prices, or audit data instantly via the Sheets interface. There is no need to build complex admin panels for every possible edge case.

- **Zero Learning Curve:** My mother is already proficient with spreadsheets. Introducing a new, unfamiliar dashboard would have increased friction and training time.

- **Transparency:** Data isn't locked in a remote server; it is visible and accessible, giving the business owner full trust in the system.

# Key Features
- **Public Catalog (Vidriera):** A customer-facing view of available stock with direct integration to WhatsApp for inquiries.
- **Secured Admin Panel:** Authenticated route protection (NextAuth) ensures only authorized users can access sensitive business logic.
- **Streamlined Sales Entry:** Validated forms to register sales and automatically update stock levels.
- **Image Management:** Integrated Cloudinary widget for uploading product photos, which are automatically linked to the Google Sheet records.
- **Mobile First:** Responsive design optimized for on-the-go usage.

# System Architecture
To accommodate the client's existing workflow, I implemented a Headless Architecture using Sheets as the database but completely decoupling the frontend interaction.

1. **Frontend (Next.js 14):** Provides the UI/UX for both the public catalog and private admin dashboard. Hosted on Vercel.
2. **Authentication:** NextAuth.js handles session management and route protection.
3. **Media Storage (Cloudinary):** Handles image hosting and optimization. Google Sheets only stores the image URLs, keeping the spreadsheet lightweight.
4. **Orchestrator (n8n on AWS):** Manages business logic (webhooks, validation, and appending data to Sheets).
5. **Database (Google Sheets):** Acts as the persistent storage layer for text-based data.

# Tech Stack
## Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js (Authentication)
- Cloudinary (Image Management)
- Formik + Yup (Validation)

## Backend & Infrastructure
- n8n (Self-hosted workflow automation)
- Docker
- AWS EC2 (Hosting the n8n instance)

```mermaid
graph LR
    subgraph Client [📱 Client Side]
        User((👤 User))
    end

    subgraph Vercel [☁️ Vercel Cloud]
        NextJS[🖥️ Next.js UI]
        API[🛡️ API Routes / Proxy]
    end

    subgraph AWS [☁️ AWS EC2]
        Docker[🐳 Docker Container]
        n8n[⚡ n8n Orchestrator]
    end

    subgraph Google [☁️ Google Cloud]
        Sheets[(📗 Google Sheets)]
    end

    %% Flujo de datos
    User -->|Interacts| NextJS
    NextJS -->|Secure Fetch| API
    API -->|Webhook POST| n8n
    Docker -.-> n8n
    n8n -->|Validate & Append| Sheets
    Sheets -.->|Return Data| n8n
    n8n -.->|Response JSON| API
    API -.->|Update UI| NextJS

    style Client fill:#fff,stroke:#333,stroke-width:2px
    style Vercel fill:#000,stroke:#fff,stroke-width:2px,color:#fff
    style AWS fill:#FF9900,stroke:#232F3E,stroke-width:2px,color:#fff
    style Google fill:#34A853,stroke:#fff,stroke-width:2px,color:#fff
    ```

# Local Setup
Create a `.env.local` file with the following variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=zigzag_uploads
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# API
NEXT_PUBLIC_API_BASE_URL=your_n8n_webhook_url
```
    
