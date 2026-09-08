import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// This is the home screen for CarpoolBoard.
// It now supports adding drivers (with a name and seat count) through a simple form.
// Riders/joining a ride are not built yet — that will come in a later feature.
export default function App() {
  // The list of drivers that have been added so far.
  // Each driver is an object like { id, name, seats }.
  const [drivers, setDrivers] = useState([]);

  // Whether the "Add Driver" form is currently showing.
  const [isAddingDriver, setIsAddingDriver] = useState(false);

  // The current text typed into the form's inputs.
  const [nameInput, setNameInput] = useState('');
  const [seatsInput, setSeatsInput] = useState('');

  // A validation message to show under the form, if something is wrong.
  const [formError, setFormError] = useState('');

  // Opens the Add Driver form.
  function handleAddDriver() {
    setIsAddingDriver(true);
  }

  // Closes the form and clears out anything the user typed.
  function resetForm() {
    setIsAddingDriver(false);
    setNameInput('');
    setSeatsInput('');
    setFormError('');
  }

  // Runs when the user presses "Save Driver".
  function handleSaveDriver() {
    const trimmedName = nameInput.trim();
    const seatsNumber = Number(seatsInput.trim());

    // Validation: the name can't be empty, and seats must be a whole number of 1 or more.
    if (trimmedName === '') {
      setFormError('Please enter a name.');
      return;
    }
    if (!Number.isInteger(seatsNumber) || seatsNumber < 1) {
      setFormError('Please enter a valid number of seats (1 or more).');
      return;
    }

    // Add the new driver to the list, keeping all the existing drivers.
    const newDriver = {
      id: Date.now(),
      name: trimmedName,
      seats: seatsNumber,
    };
    setDrivers([...drivers, newDriver]);

    resetForm();
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

          {drivers.length === 0 ? (
            <Text style={styles.emptyMessage}>No drivers yet.</Text>
          ) : (
            drivers.map((driver) => (
              <View key={driver.id} style={styles.card}>
                <Text style={styles.cardName}>{driver.name}</Text>
                <Text style={styles.cardDetail}>
                  {driver.seats} seat{driver.seats === 1 ? '' : 's'} available
                </Text>
              </View>
            ))
          )}
        </View>

        {/* Riders section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need a Ride</Text>
          <Text style={styles.emptyMessage}>No riders waiting.</Text>
        </View>

        {/* Add Driver button, or the Add Driver form */}
        {isAddingDriver ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add Driver</Text>

            <TextInput
              style={styles.input}
              placeholder="Driver name"
              value={nameInput}
              onChangeText={setNameInput}
            />

            <TextInput
              style={styles.input}
              placeholder="Available seats"
              value={seatsInput}
              onChangeText={setSeatsInput}
              keyboardType="numeric"
            />

            {formError !== '' && <Text style={styles.errorText}>{formError}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSaveDriver}>
              <Text style={styles.buttonText}>Save Driver</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleAddDriver}>
            <Text style={styles.buttonText}>Add Driver</Text>
          </TouchableOpacity>
        )}

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
  card: {
    backgroundColor: '#f0f6ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  cardDetail: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    marginBottom: 12,
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
  cancelButton: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    color: '#444',
    fontSize: 16,
    fontWeight: '600',
  },
});
