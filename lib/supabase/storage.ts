'use server'

import { randomUUID } from 'node:crypto'
import { requireAdmin } from '@/lib/auth/admin'
import { getSupabaseAdmin } from '@/lib/supabase/server'
import {
    IMAGE_EXTENSIONS,
    PROJECT_IMAGES_BUCKET,
    getProjectImagePath,
    validateImage,
} from '@/lib/supabase/imageRules'

type UploadTicket =
    | { ok: true; path: string; token: string; publicUrl: string }
    | { ok: false; error: string }

function projectImagesBucket() {
    return getSupabaseAdmin().storage.from(PROJECT_IMAGES_BUCKET)
}

export async function createProjectImageUpload(file: { type: string; size: number }): Promise<UploadTicket> {
    await requireAdmin()

    const invalid = validateImage(file)
    if (invalid) return { ok: false, error: invalid }

    let bucket: ReturnType<typeof projectImagesBucket>
    try {
        bucket = projectImagesBucket()
    } catch (error) {
        console.error(error)
        return { ok: false, error: 'Image uploads are not configured on the server.' }
    }

    const path = `${randomUUID()}.${IMAGE_EXTENSIONS.get(file.type)}`

    const { data, error } = await bucket.createSignedUploadUrl(path)
    if (error) {
        console.error('createSignedUploadUrl failed:', error.message)
        return { ok: false, error: 'Could not prepare the upload. Please try again.' }
    }

    const { data: { publicUrl } } = bucket.getPublicUrl(data.path)
    return { ok: true, path: data.path, token: data.token, publicUrl }
}

export async function deleteProjectImage(imageUrl: string): Promise<void> {
    await requireAdmin()

    const path = getProjectImagePath(imageUrl)
    if (!path) return

    const { error } = await projectImagesBucket().remove([path])
    if (error) {
        console.error('Project image delete failed:', error.message)
        throw new Error('Could not delete image')
    }
}
