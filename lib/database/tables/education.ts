'use server'

import prisma from '@/lib/database/prisma'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/admin'

export async function getEducations() {
    return await prisma.education.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export async function createEducation(data: { degree: string, institution: string, ubication: string, startDate: Date, endDate: Date }) {
    await requireAdmin()
    const education = await prisma.education.create({ data })
    revalidatePath('/admin/education')
    revalidatePath('/')
    return education
}

export async function updateEducation(id: string, data: any) {
    await requireAdmin()
    const education = await prisma.education.update({ where: { id }, data })
    revalidatePath('/admin/education')
    revalidatePath('/')
    return education
}

export async function deleteEducation(id: string) {
    await requireAdmin()
    await prisma.education.delete({ where: { id } })
    revalidatePath('/admin/education')
    revalidatePath('/')
}
