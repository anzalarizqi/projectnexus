// JS wrapper for the native SmsModule Kotlin JSI module.
// Handles Layer 3: SMS send/receive via Android SmsManager.
// Encryption is handled in src/crypto/smsEncoding.js before passing payloads here.

import {NativeModules, NativeEventEmitter} from 'react-native';

const {SmsModule: Native} = NativeModules;

export const SmsModule = {
  // Send a (pre-encrypted, pre-segmented) SMS to a phone number.
  sendSms: (phoneNumber, segmentPayload) => Native.sendSms(phoneNumber, segmentPayload),

  // Enable or disable the SMS layer.
  setSmsActive: (enabled) => Native.setSmsActive(enabled),

  // Register listener for incoming SMS messages (pre-filtered to NEXUS format).
  onSmsReceived: (callback) => {
    const emitter = new NativeEventEmitter(Native);
    const sub = emitter.addListener('smsReceived', callback);
    return () => sub.remove();
  },
};
