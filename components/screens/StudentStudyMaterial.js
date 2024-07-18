import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Image1 from '../assets/BackArrow.png';
import axios from 'axios';

const StudentStudyMaterial = ({ navigation, route }) => {
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [profile, setProfile] = useState({});
  const [errors, setErrors] = useState({});
  const [studyMaterialList, setStudyMaterialList] = useState([]);
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
    const fetchStudyMaterial = async (classname, section) => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/studyMaterial/${className}/${section}`);
        setStudyMaterialList(response.data.reverse()); // Assuming API returns an array of homework objects
        
      } catch (error) {
        console.error('Error fetching Study material data:', error);
      }
    };
    if (className && section) {
      fetchStudyMaterial(className, section);
    }
  }, [className, section]);

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
        <TouchableOpacity onPress={() => navigation.navigate("Homescreen", { email })}>
          <Image source={Image1} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Study Material</Text>
      </View>
      {studyMaterialList.map((material) => (
        <View key={material.id} style={styles.homeworkContainer}>
          <Text style={styles.subjectText}>{material.subject}</Text>
          {material.created_at && (
            <Text style={styles.text}>Given Date: {formatDate(material.created_at)}</Text>
          )}
          <Text style={styles.text}>Topic: {material.topic}</Text>
          <Text style={styles.text}>Explanation: {material.explanation}</Text>
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
    left: -110,
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

export default StudentStudyMaterial;
