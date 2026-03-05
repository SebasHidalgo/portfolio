# 🚀 Guillermo Hidalgo's Developer Portfolio

A modern, dynamic, and fully responsive personal portfolio website built to showcase projects, skills, and experience. This project includes a custom-built Admin Dashboard tailored for seamless content management.

## ✨ Key Features

- Dynamic content powered by PostgreSQL
- Custom Admin Dashboard for content management
- Secure authentication with Clerk
- Image uploads with Supabase Storage
- Fully responsive UI
- Modern App Router architecture with Next.js
- EmailJS integration for contact form

## 🛠️ Tech Stack

### Frontend

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State/Data Management:** [TanStack React Query](https://tanstack.com/query/latest)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

### Backend & Infrastructure

- **Database:** PostgreSQL
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Storage:** [Supabase](https://supabase.com/)
- **Email Service:** [EmailJS](https://www.emailjs.com/)

## 📂 Project Structure

```text
portfolio/
├── app/
│   ├── admin/            # Admin Dashboard layout, pages, and components
│   ├── api/              # Next.js API Routes (Serverless Functions)
│   ├── auth/             # Authentication pages (e.g., Login/Sign-in)
│   ├── components/       # Public-facing UI components (Hero, About, Projects, etc.)
│   └── page.tsx          # Main portfolio landing page
├── lib/
│   ├── database/         # Prisma DB access methods and queries
│   ├── emailjs.ts        # EmailJS configuration
│   └── supabaseServer.ts # Supabase client configuration
├── prisma/
│   └── schema.prisma     # Database models and schema declarations
└── public/               # Static assets
```

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (version 18+ recommended)
- A PostgreSQL database (e.g., Supabase, Neon, or local PostgreSQL)
- Accounts for Clerk, Supabase, and EmailJS.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add all the necessary variables. Reference the services to get your keys. An example structure could be:

```env
# Database configuration (Prisma)
DATABASE_URL=
DIRECT_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=

# Supabase Storage
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

### 4. Setup the Database

Generate Prisma client and push the schema to your database:

```bash
# Generate the Prisma client
npx prisma generate

# Apply the schema to your database
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio. To access the admin dashboard, navigate to `/admin` (a valid Clerk session is required).

## 📝 License

This project is for portfolio and demonstration purposes only.

All rights reserved.  
You may not copy, reproduce, distribute, or use any part of this code without explicit permission.
