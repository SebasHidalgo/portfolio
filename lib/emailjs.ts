import emailjs from "@emailjs/browser";

interface SendEmailParams {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export async function sendContactEmail({
    name,
    email,
    subject,
    message,
}: SendEmailParams) {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    if (!serviceId || !templateId || !publicKey) {
        throw new Error("Missing EmailJS environment variables");
    }

    return emailjs.send(
        serviceId,
        templateId,
        {
            from_name: name,
            reply_to: email,
            subject,
            message,
        },
        publicKey
    );
}
