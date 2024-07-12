import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
        console.log("Homework data:", response.data); // Log the homework data for debugging
      } catch (error) {
        console.error('Error fetching homework data:', error);
      }
    };
    if (classname && section) {
      fetchHomeworkData(classname, section);
    }
  }, [classname, section]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Image1} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Homework</Text>
      </View>
      {homeworkList.map((homework) => (
        <View key={homework.id} style={styles.homeworkContainer}>
          <Text style={styles.subjectText}>{homework.subject}</Text>
          {homework.created_at && (
            <Text style={styles.text}>Given Date: {formatDate(homework.created_at)}</Text>
          )}
          <Text style={styles.text}>Type of Homework: {homework.typeOfHomework}</Text>
          <Text style={styles.text}>Title: {homework.title}</Text>
          <Text style={styles.text}>Duration: {homework.duration}</Text>
          <Text style={styles.text}>Homework: {homework.homework}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: "#3F1175",
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
    left: -130,
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    left: -10,
  },
  homeworkContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    width: '100%',
    borderColor: 'black',
    backgroundColor:'white',
  },
  subjectText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'blue',
  },
});

export default HomeworkScreen;
