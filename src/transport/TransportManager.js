// Phase 5 — Transport orchestration layer.
// Decides which connectivity layer to use for each message.
// Handles automatic fallback, deduplication, and layer health monitoring.
//
// Layer priority: INET > BT > SMS
// Fallback: 3 consecutive failed Matrix pings → switch to BT.
//           BT unavailable → switch to SMS (with blocking warning UI first).

import {MatrixModule} from '../modules/MatrixModule';
import {MeshModule} from '../modules/MeshModule';
import {SmsModule} from '../modules/SmsModule';
import {db} from '../storage/db';
import {v4 as uuidv4} from 'uuid';

// Current active layer: 'INET' | 'BT' | 'SMS' | 'UNREACHABLE'
let currentLayer = 'UNREACHABLE';
let messageListeners = [];
let failedPings = 0;

export const TransportManager = {
  // Initialise all layers and start monitoring.
  init: async (config) => { /* Phase 5 */ },

  // Send a message object. Picks best available layer automatically.
  // Attaches UUID, vector clock, and signature before sending.
  sendMessage: async (msg) => { /* Phase 5 */ },

  // Register a callback for all incoming messages (any layer).
  // Returns unsubscribe function.
  onMessage: (callback) => {
    messageListeners.push(callback);
    return () => {
      messageListeners = messageListeners.filter(l => l !== callback);
    };
  },

  // Returns current reachability: { layer, nodeCount }
  getReachability: () => ({layer: currentLayer, nodeCount: 0}),

  // Trigger SMS activation — shows blocking warning UI before activating SMS layer.
  activateSms: async () => { /* Phase 7 */ },

  // Internal: build a canonical message object with UUID, vector clock, signature.
  _buildMessage: async (partialMsg) => { /* Phase 5 */ },

  // Internal: deduplicate via seen_set in DB.
  _isDuplicate: async (uuid) => { /* Phase 5 */ },
};
