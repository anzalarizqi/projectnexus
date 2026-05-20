// JS facade for the native UpdateManager Kotlin module (WorkManager-based).
// Handles the v1.3 mandatory secure update system.

import {NativeModules} from 'react-native';

const {UpdateManager: Native} = NativeModules;

export const UpdateManager = {
  // Manually trigger an update check (used by Settings → "Periksa Pembaruan").
  checkForUpdates: () => Native.checkForUpdates(),

  // Trigger APK download and install for an already-verified manifest.
  installUpdate: (manifestJson) => Native.installUpdate(manifestJson),

  // Get the currently cached manifest (or null).
  getCachedManifest: () => Native.getCachedManifest(),
};
