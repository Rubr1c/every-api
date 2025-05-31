/**
 * @module lib/encryption
 *
 * Functions to encrypt and dycrypt data.
 * 
 *
 * Exports:
 *  - encrypt(text)
 *  - decrypt(data)
 *
 * Uses aes-256-cbc.
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
// Normalize to 32 bytes
const key = crypto.createHash('sha256').update(process.env.ENCRYPTION_KEY!).digest();
const ivLength = 16;

/**
 * Encrypts text using aes-256-cbc.
 *
 * @param text
 *   Text to encrypt (string).
 * @returns
 *   Encrypted text formatted as iv:encrypted.
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * Decrypts text using aes-256-cbc.
 *
 * @param data
 *   Encrypted data to decrypt (string).
 * @returns
 *   Decrypted text (string).
 */
export function decrypt(data: string): string {
  const [ivHex, encryptedHex] = data.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}
