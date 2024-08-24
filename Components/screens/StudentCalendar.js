import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

const StudentCalendar = ({ route }) => {
  const { email } = route.params;
  const [markedDates, setMarkedDates] = useState({});
  const [error, setError] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');

  useEffect(() => {
    const fetchSpecialDates = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/getSpecialDates');
        console.log('API Response:', response.data); // Debugging line
        const specialDates = response.data;
        const markedDatesObj = {};

        specialDates.forEach(date => {
          const localDate = new Date(date.date);
          // Adjust the date to account for timezone offset
          localDate.setDate(localDate.getDate() +1); // Adjust for timezone
          const formattedDate = localDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
          markedDatesObj[formattedDate] = {
            marked: true,
            dotColor: 'red',
            activeOpacity: 0,
            description: date.description,
          };
        });

        setMarkedDates(markedDatesObj);
      } catch (err) {
        console.error('Error fetching special dates:', err); // Debugging line
        setError('Failed to load special dates');
      }
    };

    fetchSpecialDates();
  }, []);

  const handleDayPress = (day) => {
    const date = day.dateString;
    const description = markedDates[date]?.description || 'No description available for this date.';
    setSelectedDescription(description);
  };

  // Get current date adjusted to local timezone
  const getCurrentDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Adjust for timezone
    return today.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Calendar</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          [getCurrentDate()]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />
      {selectedDescription ? (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.descriptionText}>{selectedDescription}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3F1175',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default StudentCalendar;
