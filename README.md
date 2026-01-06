  # ZigZag
  A system built to digitize and automate the daily operations of a family retail business.

  This project was born out of a real-world need. My mother manages a retail business and was keeping track of daily operations—sales, stock, and debts—by manually entering data into Google Sheets cells. This workflow was prone to human error, difficult to use on mobile devices, and lacked input validation.

  I developed ZigZag to solve this. It provides a dedicated, mobile-first web interface for her to manage business logic, while retaining Google Sheets as the persistent database. This allows her to maintain ownership and full visibility of her data without the complexity of a raw spreadsheet.

  ## Why Google Sheets?
  I deliberately chose Google Sheets over a traditional SQL database (like PostgreSQL) to prioritize User Experience (UX) and maintainability for the client:

  - **User Autonomy & Error Correction:** The end-user can manually fix typos, adjust prices, or audit data instantly via the Sheets interface. There is no need to build complex admin panels for every possible edge case.

  - **Zero Learning Curve:** My mother is already proficient with spreadsheets. Introducing a new, unfamiliar dashboard would have increased friction and training time.

  - **Transparency:** Data isn't locked in a remote server; it is visible and accessible, giving the business owner full trust in the system.

  # Key Features
  **Streamlined Sales Entry:** A validated form to register sales quickly, replacing error-prone manual row entry.

  **Stock Management:** Simple interface to add new inventory items that automatically syncs with the sheet.

  **Payment Tracking:** Monitors client debts and allows status updates (Pending → Paid) with a single click.

  **Mobile First:** Responsive design optimized for on-the-go usage, solving the usability issues of spreadsheets on phones.

  # System Architecture
  To accommodate the client's existing workflow, I implemented a Headless Architecture using Sheets as the database but completely decoupling the frontend interaction.

  1. **Frontend (Next.js 14):** Provides the UI/UX. Hosted on Vercel.

  2. **Orchestrator (n8n on AWS):** Manages the business logic. When a sale is made, n8n receives the webhook, validates stock, generates IDs, formats timestamps, and safely appends the data to Google Sheets using a queue system to prevent race conditions.

  3. **Database (Google Sheets):** Acts as the persistent storage layer.

  # Tech Stack
  ## Frontend
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Formik + Yup (Validation)
  
  ## Backend & Infrastructure
  - n8n (Self-hosted workflow automation)
  - Docker
  - AWS EC2 (Hosting the n8n instance)