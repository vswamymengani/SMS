import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Image5 from '../assets/Component1.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';
import Image7 from '../assets/Student1.png';
import Image10 from '../assets/profilepic.png';
import Image1 from '../assets/BackArrow.png';
import Image8 from '../assets/studentcomplaint.png';
import Image9 from '../assets/feenews.png';
import Image11 from '../assets/Leave.png';

const AdminStudentHomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={Image5} style={styles.image5} />
        <TouchableOpacity onPress={() => navigation.navigate('AdminView')}>
          <Image source={Image1} style={styles.back} />
        </TouchableOpacity>
        <Image source={Image6} style={styles.image6} />
        <Image source={Image3} style={styles.image3} />
        <View style={styles.squareRow}>
          <TouchableOpacity onPress={() => navigation.navigate('StudentDetails')}>
            <View style={styles.square}>
              <Image source={Image7} style={styles.squareImage} />
              <Text>Student Details</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AdminStudentComplaints')}>
            <View style={styles.square}>
              <Image source={Image8} style={styles.squareImage} />
              <Text>Student Complaints</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AdminStudentLeave')}>
            <View style={styles.square}>
              <Image source={Image11} style={styles.squareImage} />
              <Text>Student Leave</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.squareRow1}>
          <TouchableOpacity onPress={() => navigation.navigate('AdminFeeDetails')}>
            <View style={styles.square}>
              <Image source={Image9} style={styles.squareImage} />
              <Text>Student Fee</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('StudentAnnouncements')}>
            <View style={styles.square}>
              <Image source={Image7} style={styles.squareImage} />
              <Text>Student Announcements</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image5: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  back: {
    height: 30,
    width: 30,
    right: 170,
    top: 20,
  },
  image3: {
    width: 170,
    height: 170,
    position: 'absolute',
    top: 110,
  },
  image6: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 100,
  },
  squareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginTop: 300,
  },
  squareRow1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
  },
  square: {
    width: 100,
    height: 150,
    backgroundColor: 'skyblue',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    color: 'black',
  },
  squareImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
});

export default AdminStudentHomeScreen;
