import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Image5 from '../assets/Component1.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';
import Image7 from '../assets/Student1.png';
import Image1 from '../assets/BackArrow.png';
import Image8 from '../assets/studentcomplaint.png';
import Image9 from '../assets/feenews.png';
import Image11 from '../assets/Leave.png';

const AdminTeacherHomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={Image5} style={styles.image5} />
        <TouchableOpacity onPress={() => navigation.navigate('AdminView')} >
          <Image source={Image1} style={styles.back} />
        </TouchableOpacity>
        <Image source={Image6} style={styles.image6} />
        <Image source={Image3} style={styles.image3} />
        <View style={styles.squareRow}>
          <TouchableOpacity onPress={() => navigation.navigate("TeacherDetails")}>
            <View style={styles.square}>
              <Image source={Image7} style={styles.squareImage} />
              <Text>Teacher Details</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AdminTeacherComplaints')}>
            <View style={styles.square}>
              <Image source={Image8} style={styles.squareImage} />
              <Text>Teacher Complaints</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AdminTeacherLeave')}>
            <View style={styles.square}>
              <Image source={Image11} style={styles.squareImage} />
              <Text>Teacher Leave</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.squareRow1}>
          <View style={styles.square}>
            <Image source={Image9} style={styles.squareImage} />
            <Text>Teacher Salary</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('TeacherAnnouncements')}>
            <View style={styles.square}>
              <Image source={Image7} style={styles.squareImage} />
              <Text>Teacher Announcements</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  image5: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  back: {
    height: 35,
    width: 35,
    right:160,
    top:20,
    position: 'absolute',
  },
  image3: {
    width: 170,
    height: 170,
    position: 'absolute',
    top: 100,
  },
  image6: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 90,
  },
  squareRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 300,
  },
  squareRow1: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    margin: 20,
  },
  square: {
    width: 100,
    height: 150,
    backgroundColor: 'skyblue',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  squareImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
});

export default AdminTeacherHomeScreen;
