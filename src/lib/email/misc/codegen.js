import crypto from "crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateVerificationCode(length = 6) {
    const bytes = crypto.randomBytes(length);
    let code = "";

    for (let i = 0; i < length; i++) {
        // Map random byte to one of the allowed characters
        const idx = bytes[i] % ALPHABET.length;
        code += ALPHABET[idx];
    }

    return code;
}
