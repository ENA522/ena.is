import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com.au',
    port: 465,
    secure: true,
    auth: {
        user: 'admin@ena.is',
        pass: process.env.ZOHO_EMAIL_PASSWORD
    }
});

// ------------------------
// Core Send Function
// ------------------------
export async function sendEmail({
    from = '"Project ENA" <support@ena.is>',
    to,
    subject,
    template,
    meta = {}
}) {
    if (typeof template !== 'function') {
        throw new Error('sendEmail requires a template(meta) function');
    }

    // ✅ Render the template using metadata
    const { html, text } = await template(meta);

    return transporter.sendMail({
        from,
        to,
        subject,
        html,
        text
    });
}

// ------------------------
// Debug / Health Check
// ------------------------
export async function testEmail(to) {
    return sendEmail({
        to,
        subject: 'Email Engine Test',
        text: 'ENA email system is operational.',
        html: '<strong>ENA email system is operational.</strong>'
    });
}
