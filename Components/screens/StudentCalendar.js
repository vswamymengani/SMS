import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';

const StudentCalendar = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;
  const [markedDates, setMarkedDates] = useState({});
  const [error, setError] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');

  useEffect(() => {
    const fetchSpecialDates = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:3000/getSpecialDates');
        console.log('API Response:', response.data); // Debugging line
        const specialDates = response.data;
        const markedDatesObj = {};

        specialDates.forEach(date => {
          const localDate = new Date(date.date);
          // Adjust the date to account for timezone offset
          localDate.setDate(localDate.getDate()); // Adjust for timezone
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
    const description = markedDates[date]?.description || 'No Occasions available for this date.';
    setSelectedDescription(description);
  };

  // Get current date adjusted to local timezone
  const getCurrentDate = () => {
    const today = new Date();
    today.setDate(today.getDate()); // Adjust for timezone
    return today.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  };

  return (
    <View style={styles.container}>
      <Image source={Image2} style={styles.bc} />
      <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate('Homescreen', { email })}>
                    <Image source={Image1} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.head}>Calendar</Text>
      </View>
      <View style={styles.body}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  body: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: '110%',
    padding: 10,
  },
  bc: {
    height: '110%',
    width: '120%',
    position: 'absolute',
  },
  image: {
    height: 23,
    width: 20,
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 12,
    marginBottom: 40,
    top: 10,
  },
  head: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
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
