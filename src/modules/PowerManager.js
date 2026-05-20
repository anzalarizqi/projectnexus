// JS facade for the native PowerManager Kotlin module.
// Handles v1.3 mandatory battery management: wake locks, broadcast frequency, Battery Saver mode.

import {NativeModules, NativeEventEmitter} from 'react-native';

const {PowerManager: Native} = NativeModules;

export const PowerManager = {
  // Get current battery level (0-100).
  getBatteryLevel: () => Native.getBatteryLevel(),

  // Enable or disable Battery Saver mode (user-activated).
  setBatterySaverMode: (enabled) => Native.setBatterySaverMode(enabled),

  // Listen to battery level changes. Returns unsubscribe function.
  onBatteryLevelChange: (callback) => {
    const emitter = new NativeEventEmitter(Native);
    const sub = emitter.addListener('batteryLevelChanged', callback);
    return () => sub.remove();
  },

  // Acquire a short wake lock for active send/receive (max a few seconds).
  acquireWakeLock: () => Native.acquireWakeLock(),

  // Release the wake lock.
  releaseWakeLock: () => Native.releaseWakeLock(),
};
