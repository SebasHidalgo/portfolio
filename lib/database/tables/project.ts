'use server'

import prisma from '@/lib/database/prisma'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/admin'

import { Project } from '@/types'

export async function getProjects(): Promise<Project[]> {
    const projects = await prisma.project.findMany({
        orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }, { id: 'asc' }]
    })
    return projects as any;
}

export async function reorderProjects(orderedIds: string[]) {
    await requireAdmin()
    await prisma.$transaction(
        orderedIds.map((id, index) =>
            prisma.project.update({ where: { id }, data: { displayOrder: index + 1 } })
        )
    )
    revalidatePath('/admin/projects')
    revalidatePath('/')
}

export async function createProject(data: { title: string, description: string, image: string, techStack: string[], demoUrl?: string, githubUrl?: string, githubUrls?: any, displayOrder?: number }) {
    await requireAdmin()
    const project = await prisma.project.create({ data })
    revalidatePath('/admin/projects')
    revalidatePath('/')
    return project
}

export async function updateProject(id: string, data: any) {
    await requireAdmin()
    const project = await prisma.project.update({ where: { id }, data })
    revalidatePath('/admin/projects')
    revalidatePath('/')
    return project
}

export async function deleteProject(id: string) {
    await requireAdmin()
    await prisma.project.delete({ where: { id } })
    revalidatePath('/admin/projects')
    revalidatePath('/')
}