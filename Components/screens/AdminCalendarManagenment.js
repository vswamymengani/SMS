import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

const AdminCalendarManagement = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [description, setDescription] = useState('');
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchSpecialDates = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/getSpecialDates');
        const specialDates = response.data;
        const markedDatesObj = {};

        specialDates.forEach(date => {
          const localDate = new Date(date.date);
          // Ensure the date is valid
          if (!isNaN(localDate.getTime())) {
            const formattedDate = localDate.toLocaleDateString('en-GB');
            markedDatesObj[formattedDate] = {
              marked: true,
              dotColor: 'red',
              activeOpacity: 0,
            };
          }
        });

        setMarkedDates(markedDatesObj);
      } catch (err) {
        Alert.alert('Error', 'Failed to fetch special dates');
      }
    };

    fetchSpecialDates();
  }, []);

  const handleDatePress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleSave = async () => {
    if (selectedDate && description) {
      try {
        await axios.post('http://10.0.2.2:3000/addSpecialDate', {
          date: selectedDate,
          description,
        });
        Alert.alert('Success', 'Special date added successfully');
        // Update marked dates
        const localDate = new Date(selectedDate);
        const formattedDate = localDate.toLocaleDateString('en-GB');
        setMarkedDates({
          ...markedDates,
          [formattedDate]: {
            marked: true,
            dotColor: 'red',
            activeOpacity: 0,
          },
        });
        setDescription('');
        setSelectedDate('');
      } catch (err) {
        Alert.alert('Error', 'Failed to add special date');
      }
    } else {
      Alert.alert('Error', 'Please select a date and enter a description');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Calendar Management</Text>
      <Calendar
        onDayPress={handleDatePress}
        markedDates={markedDates}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
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
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#3F1175',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminCalendarManagement;
