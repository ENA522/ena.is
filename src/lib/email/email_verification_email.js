import { sendEmail } from '../email_engine.js';
import { enaLayout } from '../layout/base_template.js';

export function sendVerificationEmail({
    to,
    username,
    code,
    logoUrl = "https://ena.is/favicon.svg"
}) {

    return sendEmail({
        to,
        subject: "Email Verification",
        meta: { username, logoUrl, code },
        template: verificationTemplate
    });
}

await sendVerificationEmail({
    to: "sangonkim1998@gmail.com",
    username: "Moses",
    code: "143728"
});

// -------------------------

function verificationTemplate(meta) {
    return {
        html: enaLayout(meta, `
            <h2 style="margin-bottom:10px">Verify your email</h2>

            <p>Hello ${meta.username},</p>

            <p>Your verification code:</p>

            <div style="
                font-size:32px;
                letter-spacing:6px;
                font-weight:600;
                margin:18px 0;
            ">
                ${meta.code}
            </div>

            <p style="color:#64748b">
                This code expires in 5 minutes.  
                Do not share this code with anyone.
            </p>
        `),

        text: `
Hello ${meta.username},

Your verification code: ${meta.code}

This code expires in 5 minutes.
`
    };
}
