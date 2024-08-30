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
        const response = await axios.get(`http://18.60.190.183:3000/teacherProfile?email=${email}`);
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
      const response = await axios.get(`http://18.60.190.183:3000/teacherTimetable?employeeid=${employeeid}`);
      console.log('Timetable Data:', response.data); // Debugging line
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
  }, [employeeid]);

  const getBoxStylesAndTexts = () => {
    if (!timetable[selectedDay]) {
      return [];
    }
    return timetable[selectedDay].map((entry) => ({
      backgroundColor: '#3E61DE',
      text: entry.subject,
      className: entry.className,
      section: entry.section,
      timeText: entry.periodPart,
      start:entry.startTime,
      end:entry.endTime,
    }));
  };

  const boxes = getBoxStylesAndTexts();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/BackImage.png')} style={styles.bc} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={require('../assets/Back_Arrow.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Time Table</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.dayContainer}>
          <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDayClick(day)}
                style={[
                  styles.dayButton,
                  { backgroundColor: selectedDay === day ? 'blue' : 'white' }
                ]}
              >
                <Text style={styles.dayButtonText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.timetableContainer}>
          {boxes.map((box, index) => (
            <View key={index} style={[styles.box, { backgroundColor: box.backgroundColor }]}>
              <Text style={styles.boxText}>{box.text}</Text>
              <Text style={styles.timeText}>{box.timeText} {box.start} To {box.end}</Text>
              <Text style={styles.classSectionText}>Class: {box.className} Section: {box.section}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 65,
    top: 10,
    marginBottom: 15,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  bc: {
    height: '110%',
    width: '110%',
    position: 'absolute',
  },
  body: {
    backgroundColor: 'white',
    height: "110%",
    borderRadius: 30,
    padding: 20,
  },
  backImage: {
    width: 20,
    height: 23,
    top: 5,
    marginHorizontal: 10,
  },
  headerText: {
    fontFamily: 'Open Sans',
    fontSize: 24,
    fontWeight: '400',
    marginLeft: 10,
    color: 'white',
  },
  dayContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 0,
    height: 34,
    borderRadius: 20,
    overflow: 'hidden',
  },
  scrollContainer: {
    paddingHorizontal: 0,
  },
  dayButton: {
    width: 96,
    height: 31,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 10,
  },
  dayButtonText: {
    color: 'black',
  },
  timetableContainer: {
    paddingHorizontal: 0,
    alignItems: 'flex-start',
  },
  box: {
    width: '100%',
    height: 150,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
    padding: 10,
  },
  boxText: {
    fontFamily: 'Inria Serif',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  },
  timeText: {
    fontFamily: 'Inria Serif',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  classSectionText: {
    fontFamily: 'Inria Serif',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});

export default TeacherTimetable;
