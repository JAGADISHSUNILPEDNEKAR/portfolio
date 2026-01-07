'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactState = {
    success?: boolean;
    error?: string;
    fieldErrors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
};

export async function sendContactEmail(prevState: ContactState, formData: FormData): Promise<ContactState> {
    // 1. Validate input
    const validatedFields = contactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            error: 'Validation failed',
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, message } = validatedFields.data;

    // 2. Send email
    try {
        const { error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Use default resend sender for testing
            to: ['jsphere16@gmail.com'],
            subject: `New Message from ${name} (Portfolio)`,
            text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
            replyTo: email,
        });

        if (error) {
            console.error('Resend Error:', error);
            // More specific error handling if needed
            return { success: false, error: 'Failed to send message. Please try again or contact directly via email.' };
        }

        return { success: true };
    } catch (err) {
        console.error('Server Error:', err);
        return { success: false, error: 'Internal server error. Please try again later.' };
    }
}
