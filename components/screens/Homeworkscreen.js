import React, { useState, useEffect } from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Image1 from '../assets/BackArrow.png';
import axios from 'axios';

const HomeworkScreen = ({ navigation, route }) => {
  const [classname, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [profile, setProfile] = useState({});
  const [errors, setErrors] = useState({});
  const [homeworkList, setHomeworkList] = useState([]);
  const email = route.params.email;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/profile?email=${email}`);
        setProfile(response.data);
        setClassName(response.data.className);
        setSection(response.data.section);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    if (email) {
      fetchProfileData();
    } else {
      setErrors({ general: "Email not provided" });
    }
  }, [email]);

  useEffect(() => {
    const fetchHomeworkData = async (classname, section) => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/homework/${classname}/${section}`);
        setHomeworkList(response.data.reverse()); // Assuming API returns an array of homework objects
      } catch (error) {
        console.error('Error fetching homework data:', error);
      }
    };
    if (classname && section) {
      fetchHomeworkData(classname, section);
    }
  }, [classname, section]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Image1} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Homework</Text>
      </View>
      {/* <View style={styles.classname}>
        <Text style={styles.classText}>Class: {classname}</Text>
        <Text style={styles.sectionText}>Section: {section}</Text>
      </View> */}
      {homeworkList.map((homework) => (
        <View key={homework.id} style={styles.homeworkContainer}>
          <Text style={styles.subjectText}>{homework.subject}</Text>
          <Text>Type of Homework: {homework.typeOfHomework}</Text>
          <Text>Title: {homework.title}</Text>
          <Text>Duration: {homework.duration}</Text>
          <Text>Homework: {homework.homework}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    width: 30,
    height: 30,
    marginRight: 10,
    left:-130,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black',
    left:-10,
  },
  classname: {
    flexDirection: 'row',
    alignItems: 'space-between',
    marginBottom: 20,
    color:'black',
    
  },
  classText: {
    fontSize: 18,
    marginBottom: 20,
    marginRight:20,
    color:'black',
  },
  sectionText: {
    fontSize: 18,
    marginBottom: 20,
    alignItems:'center',
    color:'black',
  },
  homeworkContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius:20,
    width: '100%',
    borderColor:'black',
  },
  subjectText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:'center',
    color:'black',
  },
});

export default HomeworkScreen;
