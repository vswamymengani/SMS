import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';

const StudentStudyMaterial = ({ navigation, route }) => {
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [profile, setProfile] = useState({});
  const [errors, setErrors] = useState({});
  const [studyMaterialList, setStudyMaterialList] = useState([]);
  const [filteredMaterialList, setFilteredMaterialList] = useState([]);
  const [subject, setSubject] = useState(null);
  const email = route.params.email;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://18.60.190.183:3000/studentProfile?email=${email}`);
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
        const response = await axios.get(`http://18.60.190.183:3000/studentStudyMaterial/${classname}/${section}`);
        setStudyMaterialList(response.data.reverse());
      } catch (error) {
        console.error('Error fetching Study material data:', error);
      }
    };
    if (className && section) {
      fetchStudyMaterial(className, section);
    }
  }, [className, section]);

  useEffect(() => {
    if (subject) {
      const filteredData = studyMaterialList.filter(material => material.subject === subject);
      setFilteredMaterialList(filteredData);
    } else {
      setFilteredMaterialList(studyMaterialList);
    }
  }, [subject, studyMaterialList]);

  const subjectOptions = [
    { label: 'Math', value: 'Math' },
    { label: 'Science', value: 'Science' },
    { label: 'English', value: 'English' },
    // Add other subjects here
  ];

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
      <Image source={Image2} style={styles.bc} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Homescreen", { email })}>
          <Image source={Image1} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Study Material</Text>
      </View>
      <View style={styles.body}>
        <Dropdown
          style={styles.dropdown}
          data={subjectOptions}
          labelField="label"
          valueField="value"
          placeholder="Select subject"
          value={subject}
          onChange={item => setSubject(item.value)}
        />
        {filteredMaterialList.map((material) => (
          <View key={material.id} style={styles.homeworkContainer}>
            <Text style={styles.subjectText}>{material.subject}</Text>
            {material.created_at && (
              <Text style={styles.text}>Given Date: {formatDate(material.created_at)}</Text>
            )}
            <Text style={styles.text}>Topic: {material.topic}</Text>
            <Text style={styles.text}>Explanation: {material.explanation}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  bc: {
    height: '110%',
    width: '110%',
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 70,
    marginTop: 20,
  },
  body: {
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 80,
    padding: 20,
  },
  backArrow: {
    width: 15,
    height: 25,
    marginLeft: 20,
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 30,
  },
  homeworkContainer: {
    borderBottomWidth: 1,
    borderColor: 'black',
    borderRadius: 40,
    padding: 10,
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  subjectText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default StudentStudyMaterial;
