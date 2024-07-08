import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const StudentTimetable = ({ route }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [timetableEntries, setTimetableEntries] = useState([]);
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [errors, setErrors] = useState({});
  const accessTimeImage = require('../assets/access_time.png');
  const navigation = useNavigation();
  const email = route.params.email;

  useEffect(() => {
    const fetchTimetableEntries = async () => {
      try {
        const profileResponse = await axios.get(`http://10.0.2.2:3000/leaveProfile?email=${email}`);
        const profile = profileResponse.data;
        setClassName(profile.className);
        setSection(profile.section);

        const timetableResponse = await axios.get(`http://10.0.2.2:3000/studentTimetable?className=${profile.className}&section=${profile.section}`);
        setTimetableEntries(timetableResponse.data);
      } catch (error) {
        console.error('Failed to fetch timetable:', error);
        Alert.alert('Error', 'Failed to fetch timetable entries. Please try again later.');
      }
    };

    if (email) {
      fetchTimetableEntries();
    } else {
      setErrors({ general: 'No email provided' });
    }
  }, [email]);

  const handleBack = () => {
    navigation.navigate('Homescreen', { email });
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const getBoxStylesAndTexts = () => {
    const filteredEntries = timetableEntries.filter(entry => entry.day === selectedDay);
    const colors = ['#FFC107', '#FF5722', '#8BC34A', '#00BCD4', '#673AB7'];

    return filteredEntries.map((entry, index) => ({
      text: entry.subject,
      person: entry.employeeId,
      timeText: entry.period,
      backgroundColor: colors[index % colors.length],
    }));
  };

  const boxes = getBoxStylesAndTexts();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={require('../assets/arrow-left.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Time Table</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDayClick(day)}
            style={[
              styles.dayButton,
              { backgroundColor: selectedDay === day ? 'red' : 'blue' }
            ]}
          >
            <Text style={styles.dayButtonText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.timetableContainer}>
        {boxes.map((box, index) => (
          <View key={index} style={[styles.box, { backgroundColor: box.backgroundColor }]}>
            <Text style={styles.boxText}>{box.text}</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>{box.locationText}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Image source={accessTimeImage} style={styles.timeImage} />
              <Text style={styles.timeText}>{box.timeText}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.personContainer}>
              <Image source={require('../assets/Person.png')} style={styles.personImage} />
              <Text style={styles.personText}>Teacher Name:{box.person}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 90,
    backgroundColor: '#3F1175',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 12,
  },
  backImage: {
    width: 26,
    height: 23,
    tintColor: '#ffffff',
  },
  headerText: {
    fontFamily: 'Open Sans',
    fontSize: 24,
    fontWeight: '400',
    color: '#ffffff',
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  dayButton: {
    width: 96,
    height: 31,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 20,
  },
  dayButtonText: {
    color: 'black',
  },
  timetableContainer: {
    paddingHorizontal: 10,
  },
  box: {
    width: '100%',
    height: 150,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
    padding: 10,
    justifyContent: 'center',
  },
  boxText: {
    fontFamily: 'Inria Serif',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeImage: {
    width: 24,
    height: 25,
    marginRight: 5,
  },
  timeText: {
    fontFamily: 'Inria Serif',
    fontSize: 17,
    fontWeight: '400',
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personImage: {
    width: 18,
    height: 19,
    marginRight: 5,
  },
  personText: {
    fontFamily: 'Inria Serif',
    fontSize: 17,
    fontWeight: '400',
    color: 'black',
  },
});

export default StudentTimetable;
