import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const TeacherTimetable = ({ route }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [timetable, setTimetable] = useState({});
  const navigation = useNavigation();
  const [profile, setProfile] = useState({});
  const { email } = route.params;
  const [employeeid, setEmployeeId] = useState('');

  const handleBack = () => {
    navigation.navigate('TeacherHomeScreen', { email });
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/teacherProfile?email=${email}`);
        console.log('Profile Data:', response.data); // Debugging line
        setProfile(response.data);
        setEmployeeId(response.data.employeeid);
      } catch (error) {
        console.error('Error fetching employee ID:', error);
      }
    };
    fetchProfile();
  }, [email]);

  const fetchTimetable = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/teacherTimetable?employeeid=${employeeid}`);
      console.log('Timetable Data:', response.data); // Debugging line
      // Transforming the timetable data into a format easy to access by day
      const transformedTimetable = response.data.reduce((acc, entry) => {
        if (!acc[entry.day]) {
          acc[entry.day] = [];
        }
        acc[entry.day].push(entry);
        return acc;
      }, {});
      setTimetable(transformedTimetable);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  useEffect(() => {
    if (employeeid) {
      fetchTimetable();
    }
  }, [employeeid]); // Added employeeid as a dependency

  const getBoxStylesAndTexts = () => {
    if (!timetable[selectedDay]) {
      return [];
    }
    return timetable[selectedDay].map((entry) => ({
      backgroundColor: '#3E61DE', // You can set different colors based on subjects or other criteria
      text: entry.subject,
      className: entry.className,
      section: entry.section,
      timeText: entry.period,
    }));
  };

  const boxes = getBoxStylesAndTexts();

  return (
    <View style={{ flex: 1, }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={require('../assets/arrow-left.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Time Table</Text>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
      >
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDayClick(day)}
            style={[
              styles.dayButton,
              { backgroundColor: selectedDay === day ? '#FE9900' : '#FE990080' },
            ]}
          >
            <Text style={{ color: 'black' }}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView >
        {boxes.map((box, index) => (
          <View key={index} style={[styles.box, { backgroundColor: box.backgroundColor }]}>
            <Text style={styles.boxText}>{box.text}</Text>
            <Text style={styles.timeText}>{box.timeText}</Text>
            <Text style={styles.classSectionText}>Class: {box.className} Section: {box.section}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#3F1175',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 22.87,
    left: 12,
  },
  backImage: {
    width: 20,
    height: 15,
    tintColor: '#ffffff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32.68,
    color: 'white',
    position: 'absolute',
  },
  scrollViewContent: {
    paddingHorizontal: 10,
  },
  dayButton: {
    width: 96,
    height: 31,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  box: {
    width: '95%',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  boxText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color:'white',
    textAlign: 'center',
    borderBottomWidth:2,
  },
  timeText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color:'white',
  },
  classSectionText: {
    fontSize: 18,
    textAlign: 'center',
    color:'white',
  },
});

export default TeacherTimetable;
