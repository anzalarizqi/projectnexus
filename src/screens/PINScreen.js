// Phase 2 — Onboarding
// First screen shown on every launch.
// Decoy PIN → NotesScreen. Real PIN → NEXUS app.
// 3 wrong attempts → stay on this screen with no hint a real app exists.

import React from 'react';
import {View, Text} from 'react-native';

export default function PINScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>PINScreen — Phase 2</Text>
    </View>
  );
}
