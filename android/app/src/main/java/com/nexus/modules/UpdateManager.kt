package com.nexus.modules

// UpdateManager — Kotlin JSI native module + WorkManager job
// Phase 14 implementation (v1.3 mandatory).
//
// WorkManager job constraints: network available, battery not low, once per 24h.
// Flow: fetch manifest → verify developer signature → compare version →
//       download APK → verify SHA-256 → trigger install via REQUEST_INSTALL_PACKAGES.
// Only transmits: app version + Android OS version. No user data.

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class UpdateManager(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "UpdateManager"

    @ReactMethod
    fun checkForUpdates(promise: Promise) {
        // TODO Phase 14: manually trigger update check
        promise.reject("NOT_IMPLEMENTED", "Phase 14")
    }

    @ReactMethod
    fun installUpdate(manifestJson: String, promise: Promise) {
        // TODO Phase 14: download + verify APK + trigger Android install flow
        promise.reject("NOT_IMPLEMENTED", "Phase 14")
    }

    @ReactMethod
    fun getCachedManifest(promise: Promise) {
        // TODO Phase 14: return last fetched manifest from DB cache
        promise.resolve(null)
    }
}
