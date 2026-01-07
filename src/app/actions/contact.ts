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
        console.log('Attempting to send email with Resend...');
        if (!process.env.RESEND_API_KEY) {
            console.error('CRITICAL: RESEND_API_KEY is missing in environment variables');
            return { success: false, error: 'Configuration Error: API Key missing' };
        }

        console.log(`Sending from: onboarding@resend.dev to: jsphere16@gmail.com`);

        const { data, error } = await resend.emails.send({
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
            console.error('Resend API Returned Error:', JSON.stringify(error, null, 2));
            return { success: false, error: error.message || 'Failed to send message.' };
        }

        console.log('Email sent successfully:', data);
        return { success: true };
    } catch (err) {
        console.error('Unexpected Server Error during email send:', err);
        return { success: false, error: 'Internal server error. Please try again later.' };
    }
}
