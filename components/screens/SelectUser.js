import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Image5 from '../assets/Component1.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';
import Image7 from '../assets/Student1.png';
import Image8 from '../assets/Teacher1.png';
import Image9 from '../assets/Admin.png';

const SelectUser = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={Image5} style={styles.image5} />
      <Image source={Image6} style={styles.image6} />
      <Image source={Image3} style={styles.image3} />

      <Text style={styles.text}>Select Your Role</Text>

      <View style={styles.squareRow}>
        <TouchableOpacity style={[styles.square, styles.studentSquare]} onPress={() => navigation.navigate('LoginScreen')}>
          <Image source={Image7} style={styles.squareImage} />
          <Text style={styles.squareText}>Student</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.square, styles.teacherSquare]} onPress={() => navigation.navigate('TeacherLogin')}>
          <Image source={Image8} style={styles.squareImage} />
          <Text style={styles.squareText}>Teacher</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.square, styles.adminSquare]} onPress={() => navigation.navigate('AdminLogin')}>
        <Image source={Image9} style={styles.squareImage} />
        <Text style={styles.squareText}>Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image5: {
    width: 415,
    height: 250,
    position: 'absolute',
    top: 0,
  },
  image3: {
    width: 160,
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
  text: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    top: 140,
    marginBottom: 120,
    marginTop: 190,
    color: '#1DBBFF',

  },
  squareRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  square: {
    width: 120,
    height: 120,
    backgroundColor: '#1DBBFF',
    borderRadius: 12,
    marginHorizontal: 30,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentSquare: {
    backgroundColor: '#1DBBFF',
    // Example color for Student
  },
  teacherSquare: {
    backgroundColor: '#1DBBFF',
  },
  adminSquare: {
    backgroundColor: '#1DBBFF',
    marginTop: 30,
  },
  squareImage: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  squareText: {
    fontSize: 16,
    top: 20,
    marginBottom: 10,
    marginTop: 0,
    color: 'black',
    fontWeight:'bold',

  },
});

export default SelectUser;
