import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import Image5 from '../assets/Component1.png';
import Image2 from '../assets/Menu.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';
import Image7 from '../assets/Student1.png';
import Image10 from '../assets/profilepic.png';
import Image1 from '../assets/BackArrow.png';
import Image4 from '../assets/timetable1.png';
import Image8 from '../assets/studentcomplaint.png';
import Image9 from '../assets/feenews.png';
import Image11 from '../assets/Leave.png';

const AdminTeacherHomeScreen = ({ navigation }) => {
  return(
      <View style={styles.container}>
        <Image source={Image5} style={styles.image5} />
        <TouchableOpacity onPress={() => navigation.navigate('AdminView')} >
          <Image source={Image1} style={styles.back}/>
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
          <View style={styles.square}>
            <Image source={Image4} style={styles.squareImage} />
            <Text>Teacher Timetable</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('AdminTeacherComplaints')}>
            <View style={styles.square}>
              <Image source={Image8} style={styles.squareImage} />
              <Text>Teacher Complaints</Text>
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
          <TouchableOpacity onPress={() =>navigation.navigate('AdminTeacherLeave')}>
            <View style={styles.square} >
              <Image source={Image11} style={styles.squareImage} />
              <Text>Teacher Leave</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
  );
 
}
const styles = StyleSheet.create({
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
  back:{
    height:30,
    width:30,
    left:-180,
    top:20,
  },
  image3: {
    width: 170,
    height: 170,
    position: 'absolute',
    top: 140,
  },
  image6: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 130,
  },
  images:{
    height:100,
    width:100,
  },
  squareRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    top: 400,
  },
  squareRow1: {
    flexDirection: 'row',
    justifyContent: 'center',
    position:'absolute',
    width: '100%',
    marginBottom: 20,
    top: 600,
  },
  singleSquare: {
    justifyContent: 'center',
    alignItems: 'center',
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
})
export default AdminTeacherHomeScreen;
