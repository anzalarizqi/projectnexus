// Safety Number derivation for in-person contact verification.
// Two coordinators physically meet, compare their 60-digit Safety Numbers.
// If they match, they tap "Verified" — this contact is trusted across all layers.

import {CryptoModule} from '../modules/CryptoModule';

// Returns a formatted 60-digit safety number string for display.
// Format: groups of 5 digits separated by spaces, 12 groups.
export async function getSafetyNumber(myPubkey, theirPubkey) {
  const raw = await CryptoModule.getSafetyNumber(myPubkey, theirPubkey);
  // Format as "12345 67890 ..." for readability
  return raw.match(/.{1,5}/g).join(' ');
}
