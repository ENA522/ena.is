import { prisma } from '$lib/server/prisma';
import { generateVerificationCode } from './misc/codegen.js';
import { sendVerificationEmail } from './email_verification_email.js';
import crypto from 'crypto';

const CODE_EXPIRATION_MINUTES = 5;

/**
 * Generate and send a verification code to a user's email
 * @param {string} userId - The user ID
 * @param {string} email - Email address to verify
 * @param {string} username - Username for email template
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendVerificationCode({ userId, email, username }) {
    try {
        // Generate a secure verification code
        const code = generateVerificationCode(6);

        // Hash the code for storage (security best practice)
        const hashedCode = crypto
            .createHash('sha256')
            .update(code)
            .digest('hex');

        // Calculate expiration time
        const expiresAt = new Date(Date.now() + CODE_EXPIRATION_MINUTES * 60 * 1000);

        // Store in database
        await prisma.verification.create({
            data: {
                id: crypto.randomUUID(),
                identifier: `email:${userId}:${email}`,
                value: hashedCode,
                expiresAt,
                updatedAt: new Date()
            }
        });

        // Send email with plaintext code
        await sendVerificationEmail({
            to: email,
            username,
            code
        });

        return { success: true };

    } catch (error) {
        console.error('Error sending verification code:', error);
        return {
            success: false,
            error: 'Failed to send verification code'
        };
    }
}

/**
 * Verify a code submitted by the user
 * @param {string} userId - The user ID
 * @param {string} email - Email address being verified
 * @param {string} code - Code submitted by user
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function verifyCode({ userId, email, code }) {
    try {
        // Hash the submitted code
        const hashedCode = crypto
            .createHash('sha256')
            .update(code.toUpperCase())
            .digest('hex');

        const identifier = `email:${userId}:${email}`;

        // Find matching verification record
        const verification = await prisma.verification.findFirst({
            where: {
                identifier,
                value: hashedCode
            }
        });

        if (!verification) {
            return {
                success: false,
                error: 'Invalid verification code'
            };
        }

        // Check if expired
        if (new Date() > verification.expiresAt) {
            // Clean up expired code
            await prisma.verification.delete({
                where: { id: verification.id }
            });

            return {
                success: false,
                error: 'Verification code has expired'
            };
        }

        // Code is valid! Mark email as verified
        await prisma.$transaction([
            // Update User.emailVerified if this is their primary email
            prisma.user.updateMany({
                where: {
                    id: userId,
                    email: email
                },
                data: { emailVerified: true }
            }),

            // Update UserEmail.verified if this is an alias
            prisma.userEmail.updateMany({
                where: {
                    userId,
                    email
                },
                data: { verified: true }
            }),

            // Delete the used verification code
            prisma.verification.delete({
                where: { id: verification.id }
            })
        ]);

        return { success: true };

    } catch (error) {
        console.error('Error verifying code:', error);
        return {
            success: false,
            error: 'Failed to verify code'
        };
    }
}

/**
 * Clean up expired verification codes
 * Should be run periodically (e.g., via cron job)
 */
export async function cleanupExpiredCodes() {
    try {
        const result = await prisma.verification.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date()
                }
            }
        });

        console.log(`Cleaned up ${result.count} expired verification codes`);
        return result.count;

    } catch (error) {
        console.error('Error cleaning up expired codes:', error);
        return 0;
    }
}
