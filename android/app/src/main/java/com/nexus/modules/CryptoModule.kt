package com.nexus.modules

// CryptoModule — Kotlin JSI native module (New Architecture)
// Phase 1 implementation.
//
// Responsibilities:
//   - generateKeyPair(): Ed25519 keypair via Android Keystore (hardware-backed where available)
//   - sign(payload): sign with stored private key
//   - verify(payload, signature, pubkey): verify against any public key
//   - getSafetyNumber(pubkeyA, pubkeyB): deterministic 60-digit safety number
//   - destroyKeys(): DELETE private key from Android Keystore (PANIC WIPE — must be < 100ms)
//   - getPublicKey(): retrieve stored public key

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.security.KeyStore

class CryptoModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "CryptoModule"

    @ReactMethod
    fun generateKeyPair(promise: Promise) {
        // TODO Phase 1: generate Ed25519 keypair in Android Keystore, return base64 pubkey
        promise.reject("NOT_IMPLEMENTED", "Phase 1")
    }

    @ReactMethod
    fun sign(payloadBase64: String, promise: Promise) {
        // TODO Phase 1: sign with private key from Android Keystore
        promise.reject("NOT_IMPLEMENTED", "Phase 1")
    }

    @ReactMethod
    fun verify(payloadBase64: String, signatureBase64: String, pubkeyBase64: String, promise: Promise) {
        // TODO Phase 1: verify signature against public key
        promise.reject("NOT_IMPLEMENTED", "Phase 1")
    }

    @ReactMethod
    fun getSafetyNumber(pubkeyA: String, pubkeyB: String, promise: Promise) {
        // TODO Phase 1: derive deterministic 60-digit safety number from two pubkeys
        promise.reject("NOT_IMPLEMENTED", "Phase 1")
    }

    @ReactMethod
    fun destroyKeys(promise: Promise) {
        // CRITICAL: panic wipe — must delete Keystore entry in < 100ms
        // This renders ALL SQLCipher data permanently unreadable.
        try {
            val keyStore = KeyStore.getInstance("AndroidKeyStore")
            keyStore.load(null)
            keyStore.deleteEntry("nexus_master_key")
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("WIPE_FAILED", e.message)
        }
    }

    @ReactMethod
    fun getPublicKey(promise: Promise) {
        // TODO Phase 1: retrieve stored public key from Keystore
        promise.reject("NOT_IMPLEMENTED", "Phase 1")
    }
}
