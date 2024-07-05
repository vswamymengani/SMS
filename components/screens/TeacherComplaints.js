import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Image5 from '../assets/Component1.png';
import Image7 from '../assets/Student1.png';
import Image8 from '../assets/Teacher1.png';
import { useNavigation } from '@react-navigation/native';

const TeacherComplaints = ({route}) => {
  const navigation = useNavigation();
  const email = route.params.email;
  return (
    <View style={styles.container}>
      <Image source={Image5} style={styles.image5} />
      <Text style={styles.text}>Select Your Option</Text>
      <View style={styles.squareRow}>
        <TouchableOpacity
          style={[styles.square, styles.teacherSquare]}
          onPress={() => navigation.navigate('TeacherComplaint1',{ email })}
          accessible={true}
          accessibilityLabel="Navigate to Teacher Complaint"
        >
          <Image source={Image8} style={styles.squareImage} />
          <Text style={styles.squareText}>Teacher</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.square, styles.studentSquare]}
          onPress={() => navigation.navigate('ReciveComplaint', { email })}
          accessible={true}
          accessibilityLabel="Navigate to Student Complaint"
        >
          <Image source={Image7} style={styles.squareImage} />
          <Text style={styles.squareText}>Student</Text>
        </TouchableOpacity>
      </View>
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
  text: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    top: 140,
    marginBottom: 120,
    marginTop: 10,
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
  },
  teacherSquare: {
    backgroundColor: '#1DBBFF',
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
    fontWeight: 'bold',
  },
});

export default TeacherComplaints;
