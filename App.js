import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
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

  // The list of riders who need a ride so far.
  // Each rider is an object like { id, name }.
  const [riders, setRiders] = useState([]);

  // Whether the "Need a Ride" form is currently showing.
  const [isAddingRider, setIsAddingRider] = useState(false);

  // The current text typed into the rider name input.
  const [riderNameInput, setRiderNameInput] = useState('');

  // A validation message to show under the rider form, if something is wrong.
  const [riderFormError, setRiderFormError] = useState('');

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

  // Runs when a rider presses "Reserve Seat" on a driver's card.
  // It decreases that driver's seat count by 1, but never below 0.
  function handleReserveSeat(driverId) {
    setDrivers(
      drivers.map((driver) =>
        driver.id === driverId
          ? { ...driver, seats: Math.max(0, driver.seats - 1) }
          : driver
      )
    );
  }

  // Opens the Need a Ride form.
  function handleNeedRide() {
    setIsAddingRider(true);
  }

  // Closes the rider form and clears out anything the user typed.
  function resetRiderForm() {
    setIsAddingRider(false);
    setRiderNameInput('');
    setRiderFormError('');
  }

  // Runs when the user presses "Save Rider".
  function handleSaveRider() {
    const trimmedName = riderNameInput.trim();

    // Validation: the name can't be empty.
    if (trimmedName === '') {
      setRiderFormError('Please enter a name.');
      return;
    }

    // Add the new rider to the list, keeping all the existing riders.
    const newRider = {
      id: Date.now(),
      name: trimmedName,
    };
    setRiders([...riders, newRider]);

    resetRiderForm();
  }

  // Gets a single uppercase letter to show inside an avatar circle.
  function getInitial(name) {
    return name.trim().charAt(0).toUpperCase();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Dark navy header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🚗</Text>
        <Text style={styles.headerTitle}>CarpoolBoard</Text>
        <Text style={styles.headerSubtitle}>Share the ride. Split the drive.</Text>
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.container}>
        {/* Summary badges */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeNumber}>{drivers.length}</Text>
            <Text style={styles.badgeLabel}>Drivers</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeNumber}>{riders.length}</Text>
            <Text style={styles.badgeLabel}>Riders Waiting</Text>
          </View>
        </View>

        {/* Available Rides section (drivers) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Rides</Text>

          {drivers.length === 0 ? (
            <Text style={styles.emptyMessage}>No drivers yet.</Text>
          ) : (
            drivers.map((driver) => (
              <View key={driver.id} style={styles.driverCard}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{getInitial(driver.name)}</Text>
                </View>

                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{driver.name}</Text>
                  <View style={styles.seatBadge}>
                    <Text style={styles.seatBadgeText}>
                      {driver.seats} seat{driver.seats === 1 ? '' : 's'}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.reserveButton,
                    driver.seats === 0 && styles.reserveButtonDisabled,
                  ]}
                  onPress={() => handleReserveSeat(driver.id)}
                  disabled={driver.seats === 0}
                >
                  <Text style={styles.reserveButtonText}>
                    {driver.seats === 0 ? 'Ride Full' : 'Reserve'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Looking for a Ride section (riders) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Looking for a Ride</Text>

          {riders.length === 0 ? (
            <Text style={styles.emptyMessage}>No riders waiting.</Text>
          ) : (
            riders.map((rider) => (
              <View key={rider.id} style={styles.riderCard}>
                <View style={[styles.avatar, styles.riderAvatar]}>
                  <Text style={styles.avatarText}>{getInitial(rider.name)}</Text>
                </View>

                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{rider.name}</Text>
                  <Text style={styles.cardSubtext}>Looking for a ride</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Offer a Ride button, or the Add Driver form */}
        {isAddingDriver ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Offer a Ride</Text>

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
            <Text style={styles.buttonText}>Offer a Ride</Text>
          </TouchableOpacity>
        )}

        {/* Request a Ride button, or the rider form */}
        {isAddingRider ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Request a Ride</Text>

            <TextInput
              style={styles.input}
              placeholder="Your name"
              value={riderNameInput}
              onChangeText={setRiderNameInput}
            />

            {riderFormError !== '' && (
              <Text style={styles.errorText}>{riderFormError}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSaveRider}>
              <Text style={styles.buttonText}>Save Rider</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={resetRiderForm}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleNeedRide}>
            <Text style={styles.buttonText}>Request a Ride</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#16213E',
  },

  // Dark navy header
  header: {
    alignItems: 'center',
    backgroundColor: '#16213E',
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerEmoji: {
    fontSize: 32,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 4,
    textAlign: 'center',
  },

  // Scrollable page area
  scrollArea: {
    flex: 1,
    backgroundColor: '#F3F5F8',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },

  // Summary badges
  badgeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  badge: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  badgeNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#16213E',
  },
  badgeLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  // Section containers
  section: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#16213E',
    marginBottom: 12,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#8A93A3',
  },

  // Driver and rider cards
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
  },
  riderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#3B6EF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  riderAvatar: {
    backgroundColor: '#F2994A',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A2333',
  },
  cardSubtext: {
    fontSize: 12,
    color: '#8A93A3',
    marginTop: 2,
  },
  seatBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8EFFE',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  seatBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B6EF5',
  },

  // Compact reserve button (inside a driver card)
  reserveButton: {
    backgroundColor: '#3B6EF5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginLeft: 8,
  },
  reserveButtonDisabled: {
    backgroundColor: '#C9CED6',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },

  // Form inputs
  input: {
    borderWidth: 1,
    borderColor: '#DADFE6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#FAFBFC',
  },
  errorText: {
    color: '#D64545',
    fontSize: 14,
    marginBottom: 12,
  },

  // Full-width primary/secondary buttons
  button: {
    backgroundColor: '#3B6EF5',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    backgroundColor: '#EDEFF2',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '600',
  },
});
