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
- Docker Desktop (or Docker Engine) for running the local database
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

Copy `.env.example` to `.env` and fill in your keys. It has this structure:

```env
# Database configuration (Docker & Prisma)
POSTGRES_USER='root'
POSTGRES_PASSWORD='password123'
POSTGRES_HOST='localhost'
POSTGRES_PORT='5433'
POSTGRES_DB='portfolio'
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}"
DIRECT_URL="${DATABASE_URL}"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase Storage & Assets
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_RESUME_URL=

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

`DATABASE_URL` is the connection the app uses at runtime. `DIRECT_URL` is the one Prisma uses for migrations. Locally both point to the Docker database. On Supabase, set `DATABASE_URL` to the transaction pooler (port `6543`, with `?pgbouncer=true`) and `DIRECT_URL` to the session pooler (port `5432`), because migrations hang on the transaction pooler.

`SUPABASE_SERVICE_ROLE_KEY` (Supabase → Project Settings → API Keys) is used only on the server, by the admin actions that sign image uploads and delete images. It bypasses all storage policies, so never expose it with a `NEXT_PUBLIC_` prefix.

### 4. Start the Database (Docker)

Ensure Docker is running, then start the PostgreSQL container using Docker Compose:

```bash
docker-compose up -d
```

### 5. Setup the Database

Generate the Prisma client, apply the migrations, and seed the mock data:

```bash
# Generate the Prisma client
npx prisma generate

# Apply the migrations in prisma/migrations to your database
npx prisma migrate deploy

# Seed the initial mock data
npm run seed
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio. To access the admin dashboard, navigate to `/admin` (a valid Clerk session is required).

## 📝 License

This project is for portfolio and demonstration purposes only.

All rights reserved.  
You may not copy, reproduce, distribute, or use any part of this code without explicit permission.
