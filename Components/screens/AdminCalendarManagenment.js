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
        const response = await axios.get('http://18.60.190.183:3000/getSpecialDates');
        const specialDates = response.data;
        const markedDatesObj = {};

        specialDates.forEach(date => {
          const localDate = new Date(date.date);
          const formattedDate = localDate.toISOString().split('T')[0];
          markedDatesObj[formattedDate] = {
            marked: true,
            selectedColor: 'red',
            selectedTextColor: 'white',
            description: date.description,
          };
        });

        // Mark the current date with blue background and white text
        const currentDate = new Date().toISOString().split('T')[0];
        markedDatesObj[currentDate] = {
          ...markedDatesObj[currentDate],
          selected: true,
          selectedColor: 'blue',
          selectedTextColor: 'white',
        };

        setMarkedDates(markedDatesObj);
      } catch (err) {
        Alert.alert('Error', 'Failed to fetch special dates');
      }
    };

    fetchSpecialDates();
  }, []);

  const handleDatePress = (day) => {
    const selected = day.dateString;
    setSelectedDate(selected);

    const isCurrentlyRed = markedDates[selected]?.selectedColor === 'red';
    const updatedMarkedDates = {
      ...markedDates,
      [selected]: isCurrentlyRed
        ? {}
        : {
            selected: true,
            selectedColor: 'red',
            selectedTextColor: 'white',
          },
    };

    // Preserve current date highlighting
    const currentDate = new Date().toISOString().split('T')[0];
    if (updatedMarkedDates[currentDate]) {
      updatedMarkedDates[currentDate] = {
        ...updatedMarkedDates[currentDate],
        selected: true,
        selectedColor: 'blue',
        selectedTextColor: 'white',
      };
    }

    setMarkedDates(updatedMarkedDates);

    const selectedDescription = markedDates[selected]?.description || '';
    setDescription(selectedDescription);
  };

  const handleSave = async () => {
    if (selectedDate && description) {
      try {
        await axios.post('http://18.60.190.183:3000/addSpecialDate', {
          date: selectedDate,
          description,
        });
        Alert.alert('Success', 'Special date added successfully');

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
        theme={{
          selectedDayBackgroundColor: '#FF0000',
          todayTextColor: '#FFFFFF',
        }}
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
