// JS wrapper for the native MeshModule Kotlin JSI module.
// Handles Layer 2: BLE device discovery + WiFi Direct data transfer.

import {NativeModules, NativeEventEmitter} from 'react-native';

const {MeshModule: Native} = NativeModules;

export const MeshModule = {
  // Start BLE advertising (broadcasts this device's presence + pubkey hash).
  startAdvertising: () => Native.startAdvertising(),

  // Start BLE scanning (discovers nearby NEXUS devices).
  startScanning: () => Native.startScanning(),

  // Stop BLE advertising and scanning.
  stopMesh: () => Native.stopMesh(),

  // Send a message payload to all connected peers over WiFi Direct.
  sendMeshMessage: (encryptedPayloadBase64) => Native.sendMeshMessage(encryptedPayloadBase64),

  // Enable relay-only mode (for a device placed on charge at a fixed position).
  setRelayMode: (enabled) => Native.setRelayMode(enabled),

  // Get current count of reachable mesh nodes.
  getNodeCount: () => Native.getNodeCount(),

  // Register listener for incoming mesh messages.
  // Returns unsubscribe function.
  onMeshMessage: (callback) => {
    const emitter = new NativeEventEmitter(Native);
    const sub = emitter.addListener('meshMessage', callback);
    return () => sub.remove();
  },

  // Register listener for node count changes.
  onNodeCountChange: (callback) => {
    const emitter = new NativeEventEmitter(Native);
    const sub = emitter.addListener('nodeCountChanged', callback);
    return () => sub.remove();
  },
};
