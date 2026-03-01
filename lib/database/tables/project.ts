'use server'

import prisma from '@/lib/database/prisma'
import { revalidatePath } from 'next/cache'

export async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export async function createProject(data: { title: string, description: string, image: string, techStack: string[], demoUrl?: string, githubUrl?: string }) {
    const project = await prisma.project.create({ data })
    revalidatePath('/admin/projects')
    revalidatePath('/')
    return project
}

export async function updateProject(id: string, data: any) {
    const project = await prisma.project.update({ where: { id }, data })
    revalidatePath('/admin/projects')
    revalidatePath('/')
    return project
}

export async function deleteProject(id: string) {
    await prisma.project.delete({ where: { id } })
    revalidatePath('/admin/projects')
    revalidatePath('/')
}