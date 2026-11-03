'use server'

import { redirect } from 'next/navigation'
import type { AuthError } from '@supabase/supabase-js'
import { createAuthServerClient } from '@/lib/supabase/auth/server'
import { ADMIN_PATH, LOGIN_PATH, isAdminEmail } from './adminEmail'

export type LoginState = {
    step: 'email' | 'code'
    email: string
    error: string | null
    notice: string | null
    sentAt: number | null
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CODE_PATTERN = /^\d{6,8}$/
const ACCESS_DENIED = 'Access denied. This email is not allowed to sign in.'

export async function login(prev: LoginState, formData: FormData): Promise<LoginState> {
    const intent = formData.get('intent')
    const email = String(formData.get('email') ?? '').trim().toLowerCase()

    if (intent === 'change-email') {
        return { step: 'email', email, error: null, notice: null, sentAt: null }
    }
    if (intent === 'verify') {
        return verifyCode(email, String(formData.get('code') ?? ''), prev)
    }
    return sendCode(email, intent === 'resend', prev)
}

async function sendCode(email: string, isResend: boolean, prev: LoginState): Promise<LoginState> {
    const fail = (error: string): LoginState => isResend
        ? { step: 'code', email, error, notice: null, sentAt: prev.sentAt }
        : { step: 'email', email, error, notice: null, sentAt: null }

    if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
        return fail('Enter a valid email address.')
    }
    if (!isAdminEmail(email)) {
        if (!process.env.ADMIN_EMAIL) console.error('ADMIN_EMAIL is not set; admin sign-in is disabled')
        return { step: 'email', email, error: ACCESS_DENIED, notice: null, sentAt: null }
    }

    try {
        const supabase = await createAuthServerClient()
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { shouldCreateUser: false },
        })
        if (error) {
            console.error('signInWithOtp failed:', error.code ?? error.status, error.message)
            return fail(describeAuthError(error, 'send'))
        }
    } catch (error) {
        console.error('signInWithOtp failed:', error)
        return fail("We couldn't send the code. Please try again.")
    }

    return {
        step: 'code',
        email,
        error: null,
        notice: isResend ? 'A new code is on its way.' : null,
        sentAt: Date.now(),
    }
}

async function verifyCode(email: string, rawCode: string, prev: LoginState): Promise<LoginState> {
    const fail = (error: string): LoginState => ({ step: 'code', email, error, notice: null, sentAt: prev.sentAt })

    if (!isAdminEmail(email)) {
        return { step: 'email', email, error: ACCESS_DENIED, notice: null, sentAt: null }
    }

    const code = rawCode.replace(/\D/g, '')
    if (!CODE_PATTERN.test(code)) {
        return fail('Enter the 6 to 8 digit code from the email.')
    }

    try {
        const supabase = await createAuthServerClient()
        const { data, error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' })
        if (error) return fail(describeAuthError(error, 'verify'))

        if (!isAdminEmail(data.user?.email)) {
            await supabase.auth.signOut()
            return { step: 'email', email, error: ACCESS_DENIED, notice: null, sentAt: null }
        }
    } catch (error) {
        console.error('verifyOtp failed:', error)
        return fail("We couldn't verify the code. Please try again.")
    }

    redirect(ADMIN_PATH)
}

function describeAuthError(error: AuthError, action: 'send' | 'verify'): string {
    if (error.status === 429 || error.code?.startsWith('over_')) {
        const seconds = /after (\d+) seconds?/i.exec(error.message)?.[1]
        return seconds
            ? `Too many requests. Wait ${seconds} seconds and try again.`
            : 'Too many attempts. Wait a few minutes and try again.'
    }
    if (action === 'verify') {
        return 'This code is invalid or has expired. Check it or request a new one.'
    }
    return "We couldn't send the code. Please try again."
}

export async function signOut() {
    try {
        const supabase = await createAuthServerClient()
        await supabase.auth.signOut()
    } catch (error) {
        console.error('Sign-out failed:', error)
    }
    redirect(LOGIN_PATH)
}
