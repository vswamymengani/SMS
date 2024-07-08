import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

const TeacherTimetable = ({route}) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const accessTimeImage = require('../assets/access_time.png');
  const navigation = useNavigation();
  const{ email } = route.params;

  const handleBack = () => {
    navigation.navigate('TeacherHomeScreen',{ email });
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const getBoxStylesAndTexts = () => {
    switch (selectedDay) {
      case 'Monday':
        return [
          { backgroundColor: '#DE3E48', text: 'Social',className: '1', section: 'A' ,  locationText: '704', timeText: '8:30 -9:30' },
          { backgroundColor: '#DE3EBB', text: 'Science',className: '1', section: 'A' ,    locationText: '203', timeText: '9:30 - 10:30' },
          { backgroundColor: '#3E61DE', text: 'English',className: '1', section: 'A' ,    locationText: '316', timeText: '10:30 -11:30' },
          { backgroundColor: '#3E61DE', text: 'English',className: '1', section: 'A' ,    locationText: '214', timeText: '11:30 -12:30' },
          { backgroundColor: '#3E61DE', text: 'English',className: '1', section: 'A' ,    locationText: '213', timeText: '01:30 -02:30' },
          { backgroundColor: '#3E61DE', text: 'English',className: '1', section: 'A' ,    locationText: '316', timeText: '2:30 -3:30' },

        ];
      case 'Tuesday':
        return [
          { backgroundColor: '#41DE3E', text: 'Maths',className: '1', section: 'A' ,  locationText: '420', timeText: '8:00 -9:00' },
          { backgroundColor: '#3E61DE', text: 'Hindi',className: '1', section: 'A' ,    locationText: '316', timeText: '12:30 -13:30' },
          { backgroundColor: '#DE3E48', text: 'Dance',className: '1', section: 'A' ,   locationText: '704', timeText: '18:00 -19:00' }
        ];
      case 'Wednesday':
        return [
          { backgroundColor: '#3E61DE', text: 'Drawing',className: '1', section: 'A' ,   locationText: '316', timeText: '12:30 -1:30' },
          { backgroundColor: '#41DE3E', text: 'Sports',className: '1', section: 'A' ,  locationText: '420', timeText: '12:00 -15:00' },
          { backgroundColor: '#D1DE3E', text: 'Maths',className: '1', section: 'A' ,  locationText: '316', timeText: '16:30 -17:30' }
        ];
      case 'Thursday':
        return [
              { backgroundColor: '#3E61DE', text: 'Drawing',className: '1', section: 'A' ,   locationText: '316', timeText: '12:30 -1:30' },
              { backgroundColor: '#41DE3E', text: 'Sports',className: '1', section: 'A' ,  locationText: '420', timeText: '12:00 -15:00' },
              { backgroundColor: '#D1DE3E', text: 'Maths',className: '1', section: 'A' ,  locationText: '316', timeText: '16:30 -17:30' }
        ];
      case 'Friday':
        return [
              { backgroundColor: '#3E61DE', text: 'Drawing',className: '1', section: 'A' ,   locationText: '316', timeText: '12:30 -1:30' },
              { backgroundColor: '#41DE3E', text: 'Sports',className: '1', section: 'A' ,  locationText: '420', timeText: '12:00 -15:00' },
              { backgroundColor: '#D1DE3E', text: 'Maths',className: '1', section: 'A' ,  locationText: '316', timeText: '16:30 -17:30' }
        ];
      case 'Saturday':
            return [
                  { backgroundColor: '#3E61DE', text: 'Drawing',className: '1', section: 'A' ,   locationText: '316', timeText: '12:30 -1:30' },
                  { backgroundColor: '#41DE3E', text: 'Sports',className: '1', section: 'A' ,  locationText: '420', timeText: '12:00 -15:00' },
                  { backgroundColor: '#D1DE3E', text: 'Maths',className: '1', section: 'A' ,  locationText: '316', timeText: '16:30 -17:30' }
            ];
      default:
        return [];
    }
  };

  const boxes = getBoxStylesAndTexts();

  return (
    <View style={{ flex: 1 }}>
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

      {boxes.map((box, index) => (
        <View key={index} style={[styles.box, { backgroundColor: box.backgroundColor, top: 130 + index * 120 }]}>
          <Text style={styles.boxText}>
            {index === 0 && selectedDay === 'Monday' ? '8:30 - 9:30' : box.timeText}
          </Text>
          <View style={styles.locationView}>
            <Image source={require('../assets/location_pin.png')} style={styles.locationImage} />
            <Text style={styles.locationText}>{box.locationText}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.personView}>
            <Text style={styles.personText}>Class:{box.className} Section:{box.section}</Text>
          </View>
          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => console.log('Expand more pressed')}
          >
            <Image source={require('../assets/expand_more.png')} style={styles.expandImage} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = {
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
    width: '100%',
    height: 32.42,
    top: 14.08,
    left: 75.92,
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32.68,
    color:'white',
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
    width: 390,
    height: 100,
    left: 10,
    borderRadius: 20,
    borderWidth: 1,
    position: 'absolute',
  },
  boxText: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 23.98,
    textAlign: 'center',
    opacity: 1,
    width: 203,
    height: 24.95,
    top: 198.53 - 187.09,
    left: 94 - 10,
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
  },
  locationImage: {
    width: 24,
    height: 24.95,
    marginRight: 5,
    alignItems:'center',
    opacity: 1,
  },
  locationText: {
    fontFamily: 'Inria Serif',
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 18,
    textAlign: 'center',
    opacity: 1,
  },
  timeText: {
    fontFamily: 'Inria Serif',
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 20.38,
    textAlign: 'center',
    opacity: 1,
    marginLeft: 5, // Add marginLeft to create space between image and text
  },
  divider: {
    width: '95%',
    height: 0,
    top: 24.95 + 10, // Positioning the line below the text with some margin
    left: 22 - 10, // Adjusting the left position relative to the box
    borderColor: '#000',
    borderWidth: 1,
    borderTopWidth: 1,
    position: 'absolute',
  },
  personView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 241.14 - 187.09,
    left: 128 - 10,
  },
  personText: {
    fontFamily: 'Inria Serif',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20.38,
    textAlign: 'center',
    alignItems:'center',
    opacity: 1,
  },
  expandButton: {
    width: 24,
    height: 24.95,
    position: 'absolute',
    top: 198.53 - 187.09,
    left: 338,
  },
  expandImage: {
    width: '100%',
    height: '100%',
    gap: 0,
    opacity: 1,
  },
};

export default TeacherTimetable;
