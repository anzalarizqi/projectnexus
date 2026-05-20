// JS wrapper for Matrix client (matrix-js-sdk).
// Handles Layer 1 (Internet) messaging.

export const MatrixModule = {
  // Initialise the Matrix client with homeserver config.
  init: (config) => { /* Phase 4 */ },

  // Start syncing with the homeserver.
  start: () => { /* Phase 4 */ },

  // Stop syncing.
  stop: () => { /* Phase 4 */ },

  // Send an encrypted message to a Matrix room.
  sendRoomMessage: (roomId, encryptedPayload) => { /* Phase 4 */ },

  // Register a callback for incoming messages.
  // Returns an unsubscribe function.
  onMessage: (callback) => { /* Phase 4 */ },

  // Get current sync status: 'syncing' | 'connected' | 'disconnected'
  getSyncStatus: () => { /* Phase 4 */ },
};
