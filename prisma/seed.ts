import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.$transaction([
    prisma.project.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.education.deleteMany(),
    prisma.skill.deleteMany(),
  ])

  // ---------------- SKILLS ----------------
  console.log('Creating skills...')

  const skills = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express', category: 'Backend' },
    { name: 'NestJS', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Prisma', category: 'Database' },
    { name: 'Supabase', category: 'Database' },
    { name: 'Docker', category: 'DevOps & Tools' },
    { name: 'Git', category: 'DevOps & Tools' },
    { name: 'Vercel', category: 'DevOps & Tools' },
    { name: 'C#', category: 'Languages' },
    { name: 'Java', category: 'Languages' },
    { name: 'Python', category: 'Languages' },
    { name: 'TypeScript', category: 'Languages' },
    { name: 'SQL', category: 'Languages' },
  ]

  await prisma.skill.createMany({ data: skills })

  // ---------------- EDUCATION ----------------
  console.log('Creating education...')

  await prisma.education.createMany({
    data: [
      {
        degree: 'Bachelor of Science in Computer Engineering',
        institution: 'National University',
        ubication: 'San José, Costa Rica',
        startDate: new Date('2018-09-01'),
        endDate: new Date('2022-06-15'),
      },
      {
        degree: 'Full Stack Web Development Certification',
        institution: 'Tech Institute',
        ubication: 'Remote',
        startDate: new Date('2022-09-01'),
        endDate: new Date('2023-06-15'),
      },
    ],
  })

  // ---------------- EXPERIENCE ----------------
  console.log('Creating work experience...')

  await prisma.experience.createMany({
    data: [
      {
        company: 'Innovate Solutions',
        position: 'Frontend Developer',
        ubication: 'Remote',
        color: '#3b82f6',
        achievements: [
          'Developed responsive user interfaces with React and Tailwind CSS.',
          'Improved web performance by 30% with code splitting and lazy loading.',
          'Collaborated closely with UI/UX designers.'
        ],
        startDate: new Date('2022-03-01'),
        endDate: new Date('2023-08-31'),
      },
      {
        company: 'Tech Agency Hub',
        position: 'Full Stack Developer',
        ubication: 'Madrid, Spain',
        color: '#10b981',
        achievements: [
          'Built REST APIs using Node.js and Express.',
          'Managed relational databases with PostgreSQL.',
          'Migrated legacy systems to Next.js App Router.'
        ],
        startDate: new Date('2023-09-01'),
        endDate: new Date('2024-07-01'),
      },
      {
        company: 'Digital Startup Labs',
        position: 'Backend Developer',
        ubication: 'Remote',
        color: '#f59e0b',
        achievements: [
          'Designed scalable backend services using NestJS.',
          'Implemented authentication and role-based access control.',
          'Integrated third-party services including Stripe and Supabase.'
        ],
        startDate: new Date('2024-07-01'),
        endDate: new Date('2025-04-01'),
      },
      {
        company: 'Freelance',
        position: 'Full Stack Developer',
        ubication: 'Remote',
        color: '#8b5cf6',
        achievements: [
          'Developed custom web applications for small businesses.',
          'Built e-commerce solutions with Stripe payments.',
          'Delivered SEO optimized websites with modern UI/UX.'
        ],
        startDate: new Date('2025-04-01'),
        endDate: new Date('2026-03-01'),
      },
    ],
  })

  // ---------------- PROJECTS ----------------
  console.log('Creating projects...')

  await prisma.project.createMany({
    data: [
      {
        title: 'E-commerce Platform',
        description:
          'Full stack e-commerce platform with product management, payments, and admin dashboard.',
        image:
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
        techStack: [
          'Next.js',
          'TypeScript',
          'Prisma',
          'PostgreSQL',
          'Tailwind CSS',
          'Stripe',
        ],
        demoUrl: 'https://ecommerce-demo.vercel.app',
        githubUrls: {
          frontend: 'https://github.com/example/ecommerce-frontend',
          backend: 'https://github.com/example/ecommerce-backend',
        },
      },
      {
        title: 'Task Tracker App',
        description:
          'Progressive web app for task management with offline support and notifications.',
        image:
          'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop',
        techStack: ['Next.js', 'Tailwind CSS', 'PostgreSQL'],
        demoUrl: 'https://task-tracker-demo.vercel.app',
        githubUrl: 'https://github.com/example/task-tracker',
      },
      {
        title: 'AI Resume Analyzer',
        description:
          'AI powered resume analyzer that evaluates resumes and provides structured feedback.',
        image:
          'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop',
        techStack: ['Next.js', 'TypeScript', 'Prisma', 'OpenAI API'],
        demoUrl: 'https://resume-analyzer-demo.vercel.app',
        githubUrl: 'https://github.com/example/resume-analyzer',
      },
      {
        title: 'Portfolio Website',
        description:
          'Modern developer portfolio built with Next.js, featuring admin dashboard and dynamic content.',
        image:
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
        demoUrl: 'https://portfolio-demo.vercel.app',
        githubUrl: 'https://github.com/example/portfolio',
      },
      {
        title: 'SaaS Analytics Dashboard',
        description:
          'Analytics dashboard for SaaS platforms showing user metrics, revenue charts, and usage insights.',
        image:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'Chart.js'],
        demoUrl: 'https://saas-dashboard-demo.vercel.app',
        githubUrl: 'https://github.com/example/saas-dashboard',
      },
    ],
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
