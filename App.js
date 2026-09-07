import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// This is the home screen for CarpoolBoard.
// Right now it only displays placeholder content (no real drivers or riders yet).
// Later, this screen will show real lists of drivers and riders from the app's data.
export default function App() {
  // These functions run when the buttons are pressed.
  // For now they just show a simple alert since the add/join features aren't built yet.
  function handleAddDriver() {
    Alert.alert('Add Driver', 'This feature is coming soon!');
  }

  function handleNeedRide() {
    Alert.alert('Need a Ride', 'This feature is coming soon!');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* App title and subtitle */}
        <Text style={styles.title}>CarpoolBoard</Text>
        <Text style={styles.subtitle}>Find a driver or offer a ride.</Text>

        {/* Drivers section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Drivers</Text>
          <Text style={styles.emptyMessage}>No drivers yet.</Text>
        </View>

        {/* Riders section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need a Ride</Text>
          <Text style={styles.emptyMessage}>No riders waiting.</Text>
        </View>

        {/* Action buttons */}
        <TouchableOpacity style={styles.button} onPress={handleAddDriver}>
          <Text style={styles.buttonText}>Add Driver</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleNeedRide}>
          <Text style={styles.buttonText}>Need a Ride</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    marginBottom: 32,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#888',
  },
  button: {
    width: '100%',
    backgroundColor: '#2f80ed',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
