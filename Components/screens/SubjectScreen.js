import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SubjectsScreen = ({ route }) => {
  const { email } = route.params;
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/studentProfile?email=${email}`);
        const profileData = response.data;
        setClassName(profileData.className);
        setSection(profileData.section);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (email) {
      fetchProfileData();
    } else {
      setError('Email not provided');
    }
  }, [email]);

  useEffect(() => {
    if (className && section) {
      // Fetch subjects from the backend
      axios.get(`http://10.0.2.2:3000/subjects?className=${className}&section=${section}`)
        .then(response => {
          setSubjects(response.data);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          setError('Failed to load subjects');
          console.error(error);
        });
    }
  }, [className, section]);

  const handleSubjectPress = (subject) => {
    navigation.navigate('StudentOnlineExam', { email, className, section, subject });
  };

  if (loading) {
    return <Text>Loading subjects...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {subjects.length > 0 ? (
        subjects.map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={styles.subjectButton}
            onPress={() => handleSubjectPress(subject)}
          >
            <Text style={styles.subjectText}>{subject}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No subjects available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  subjectButton: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
  subjectText: {
    fontSize: 18,
    color: '#333',
  },
});

export default SubjectsScreen;
