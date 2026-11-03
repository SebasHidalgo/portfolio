'use server'

import prisma from '@/lib/database/prisma'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/admin'

export async function getSkills() {
    return await prisma.skill.findMany({
        orderBy: { category: 'desc' }
    })
}

export async function createSkill(data: { name: string; category: string }) {
    await requireAdmin()
    const skill = await prisma.skill.create({ data })
    revalidatePath('/admin/skills')
    revalidatePath('/')
    return skill
}

export async function updateSkill(id: string, data: { name: string; category: string }) {
    await requireAdmin()
    const skill = await prisma.skill.update({ where: { id }, data })
    revalidatePath('/admin/skills')
    revalidatePath('/')
    return skill
}

export async function deleteSkill(id: string) {
    await requireAdmin()
    await prisma.skill.delete({ where: { id } })
    revalidatePath('/admin/skills')
    revalidatePath('/')
}
