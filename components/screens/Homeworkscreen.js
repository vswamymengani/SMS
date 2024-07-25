import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';
import axios from 'axios';

const HomeworkScreen = ({ navigation, route }) => {
  const [className, setclassName] = useState('');
  const [section, setSection] = useState('');
  const [profile, setProfile] = useState({});
  const [errors, setErrors] = useState({});
  const [homeworkList, setHomeworkList] = useState([]);
  const [filteredHomeworkList, setFilteredHomeworkList] = useState([]);
  const [date, setDate] = useState('');
  const email = route.params.email;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/studentProfile?email=${email}`);
        setProfile(response.data);
        setclassName(response.data.className);
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
    const fetchHomeworkData = async (className, section) => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/studentHomework/${className}/${section}`);
        setHomeworkList(response.data.reverse()); // Assuming API returns an array of homework objects
        setFilteredHomeworkList(response.data.reverse()); // Initialize filtered list with all homework
      } catch (error) {
        console.error('Error fetching homework data:', error);
      }
    };
    if (className && section) {
      fetchHomeworkData(className, section);
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

  const handleFilter = () => {
    const filtered = homeworkList.filter(homework => formatDate(homework.created_at) === date);
    setFilteredHomeworkList(filtered);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Image source={Image2} style={styles.bc} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Homescreen', { email })}>
          <Image source={Image1} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Homework</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.filterContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter date (DD/MM/YYYY)"
            value={date}
            onChangeText={setDate}
          />
          <Button title="Filter" onPress={handleFilter} />
        </View>
        {filteredHomeworkList.map((homework) => (
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 50,
    top: 10,
  },
  bc: {
    height: '110%',
    width: '110%',
    position: 'absolute',
  },
  body: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: '110%',
    padding: 10,
  },
  backArrow: {
    width: 20,
    height: 23,
    marginRight: 10,
    left: 20,
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    left: 30,
  },
  homeworkContainer: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    width: '100%',
    borderColor: 'black',
    backgroundColor: 'white',
  },
  subjectText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'blue',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

export default HomeworkScreen;
