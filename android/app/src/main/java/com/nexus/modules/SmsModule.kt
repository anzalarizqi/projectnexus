package com.nexus.modules

// SmsModule — Kotlin JSI native module (New Architecture)
// Phase 7 implementation.
//
// Send: wraps Android SmsManager for multi-segment SMS sending.
// Receive: BroadcastReceiver filters incoming SMS for NEXUS format ([NX:...] header).
// NOTE: Encryption/decryption happens in JS (src/crypto/smsEncoding.js) before reaching here.

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class SmsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "SmsModule"

    @ReactMethod
    fun sendSms(phoneNumber: String, segmentPayload: String, promise: Promise) {
        // TODO Phase 7: send via SmsManager, split into 153-char segments if needed
        promise.reject("NOT_IMPLEMENTED", "Phase 7")
    }

    @ReactMethod
    fun setSmsActive(enabled: Boolean, promise: Promise) {
        // TODO Phase 7: enable/disable the SMS BroadcastReceiver
        promise.reject("NOT_IMPLEMENTED", "Phase 7")
    }
}
