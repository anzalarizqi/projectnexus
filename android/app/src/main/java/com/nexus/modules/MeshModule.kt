package com.nexus.modules

// MeshModule — Kotlin JSI native module (New Architecture)
// Phase 6 implementation.
//
// Responsibilities:
//   Part A (BLE): Advertise device presence + pubkey hash. Scan for nearby NEXUS devices.
//   Part B (WiFi Direct): Transfer message payloads over WiFi Direct.
//   Relay: Forward messages not in seen_set to all connected peers (max 4 hops).

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class MeshModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "MeshModule"

    @ReactMethod
    fun startAdvertising(promise: Promise) {
        // TODO Phase 6A: start BLE advertising (device presence + pubkey hash)
        promise.reject("NOT_IMPLEMENTED", "Phase 6")
    }

    @ReactMethod
    fun startScanning(promise: Promise) {
        // TODO Phase 6A: start BLE scanning for nearby NEXUS devices
        promise.reject("NOT_IMPLEMENTED", "Phase 6")
    }

    @ReactMethod
    fun stopMesh(promise: Promise) {
        // TODO Phase 6: stop BLE advertising + scanning + WiFi Direct
        promise.reject("NOT_IMPLEMENTED", "Phase 6")
    }

    @ReactMethod
    fun sendMeshMessage(encryptedPayloadBase64: String, promise: Promise) {
        // TODO Phase 6B: send payload to all connected peers via WiFi Direct
        promise.reject("NOT_IMPLEMENTED", "Phase 6")
    }

    @ReactMethod
    fun setRelayMode(enabled: Boolean, promise: Promise) {
        // TODO Phase 6: relay-only mode for fixed devices (on charge, no human needed)
        promise.reject("NOT_IMPLEMENTED", "Phase 6")
    }

    @ReactMethod
    fun getNodeCount(promise: Promise) {
        // TODO Phase 6: return count of currently reachable mesh nodes
        promise.resolve(0)
    }
}
