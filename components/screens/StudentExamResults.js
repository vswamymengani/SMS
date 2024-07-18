import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

const StudentExamResults = ({ route }) => {
  const navigation = useNavigation();
  const [examType, setExamType] = useState(null);
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState({});
  const email = route.params.email;
  const [profile, setProfile] = useState({ fullname: '', className: '', section: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/profile?email=${email}`);
        setProfile(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load profile data' });
      }
    };
    fetchProfile();
  }, [email]);

  const fetchExamResults = async () => {
    if (!examType) {
      setErrors({ general: 'Please select an exam type' });
      return;
    }

    try {
      const response = await axios.get('http://10.0.2.2:3000/studentExamResults', {
        params: { fullname: profile.fullname, className: profile.className, section: profile.section, examType },
      });
      setResults(response.data);
    } catch (err) {
      setErrors({ general: 'Failed to load exam results' });
    }
  };

  const renderResult = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.text}>{item.subject}</Text>
      <Text style={styles.text}>{item.marks}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {errors.general && <Text style={styles.error}>{errors.general}</Text>}
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: 'Quarterly', value: 'Quarterly' },
            { label: 'Half Yearly', value: 'Half Yearly' },
            { label: 'Finals', value: 'Finals' },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select exam type"
          value={examType}
          onChange={(item) => setExamType(item.value)}
        />
        <Button title="Submit" onPress={fetchExamResults} />
      </View>
      <View style={styles.resultItem}>
        <Text style={styles.text1}>Stuject</Text>
        <Text style={styles.text1}>Marks</Text>
      </View>
      <FlatList
        data={results}
        renderItem={renderResult}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 3,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dropdown: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  resultItem: {
    padding: 15,
    flexDirection:'row',
    justifyContent:'space-around',
    borderWidth: 2,
    borderRadius:20,
    margin:5,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  text1: {
    fontSize: 20,
    color: 'blue',
    fontWeight:'bold',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StudentExamResults;
