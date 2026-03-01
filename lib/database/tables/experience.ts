'use server'

import prisma from '@/lib/database/prisma'
import { revalidatePath } from 'next/cache'

export async function getExperiences() {
    return await prisma.experience.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export async function createExperience(data: { company: string, position: string, ubication: string, color: string, achievements: string[], techStack: string[], startDate: Date, endDate: Date }) {
    const experience = await prisma.experience.create({ data })
    revalidatePath('/admin/experience')
    revalidatePath('/')
    return experience
}

export async function updateExperience(id: string, data: any) {
    const experience = await prisma.experience.update({ where: { id }, data })
    revalidatePath('/admin/experience')
    revalidatePath('/')
    return experience
}

export async function deleteExperience(id: string) {
    await prisma.experience.delete({ where: { id } })
    revalidatePath('/admin/experience')
    revalidatePath('/')
}