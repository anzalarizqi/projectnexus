// JS wrapper for the native CryptoModule Kotlin JSI module.
// Native module handles: keypair generation (Android Keystore), sign, verify,
// Safety Number derivation, destroyKeys() for panic wipe.

import {NativeModules} from 'react-native';

const {CryptoModule: Native} = NativeModules;

export const CryptoModule = {
  // Generate Ed25519 keypair, store private key in Android Keystore.
  // Returns: { pubkey: string (base64) }
  generateKeyPair: () => Native.generateKeyPair(),

  // Sign a payload with the stored private key.
  // Returns: signature string (base64)
  sign: (payloadBase64) => Native.sign(payloadBase64),

  // Verify a signature against a public key.
  // Returns: boolean
  verify: (payloadBase64, signatureBase64, pubkeyBase64) =>
    Native.verify(payloadBase64, signatureBase64, pubkeyBase64),

  // Derive a 60-digit Safety Number from two public keys (for in-person verification).
  getSafetyNumber: (pubkeyA, pubkeyB) => Native.getSafetyNumber(pubkeyA, pubkeyB),

  // PANIC WIPE — destroy private key in Android Keystore.
  // All SQLCipher data becomes permanently unreadable. Must complete in < 100ms.
  destroyKeys: () => Native.destroyKeys(),

  // Get the stored public key (or null if not yet generated).
  getPublicKey: () => Native.getPublicKey(),
};
