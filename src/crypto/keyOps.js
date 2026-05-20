// Key operations helpers.
// Wraps CryptoModule for common patterns used across the app.

import {CryptoModule} from '../modules/CryptoModule';

// Sign and base64-encode a JS object (for message signing).
export async function signObject(obj) {
  const payload = Buffer.from(JSON.stringify(obj)).toString('base64');
  return CryptoModule.sign(payload);
}

// Verify a signed JS object against a sender's public key.
export async function verifyObject(obj, signature, senderPubkey) {
  const payload = Buffer.from(JSON.stringify(obj)).toString('base64');
  return CryptoModule.verify(payload, signature, senderPubkey);
}
