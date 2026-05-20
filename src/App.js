// NEXUS — App entry point
// Routing: checks if onboarding is complete, shows PINScreen on every launch.
// Phase 3 will replace this with full navigation (react-navigation bottom tabs + stack).

import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

// Temporary placeholder — replaced in Phase 3 with NavigationContainer + full screen routing.
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>NEXUS</Text>
        <Text style={styles.subtitle}>Field Coordination App</Text>
        <Text style={styles.phase}>Phase 0 — Project foundation complete.</Text>
        <Text style={styles.next}>Next: Phase 1 — Identity & Storage</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0a0a0a'},
  inner: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24},
  title: {fontSize: 32, fontWeight: '700', color: '#ffffff', letterSpacing: 4},
  subtitle: {fontSize: 14, color: '#888888', marginTop: 4},
  phase: {fontSize: 13, color: '#44ff44', marginTop: 32},
  next: {fontSize: 13, color: '#aaaaaa', marginTop: 8},
});
