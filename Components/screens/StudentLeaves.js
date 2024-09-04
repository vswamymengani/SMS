import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import axios from 'axios';

const StudentLeaves = () => {
  const [studentLeaves, setStudentLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchStudentLeaves = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:3000/studentLeaves');
        setStudentLeaves(response.data);
      } catch (error) {
        setErrors({ general: 'Unable to fetch student leaves data' });
      }
    };
    fetchStudentLeaves();
  }, []);

  const filterLeaves = () => {
    if (className && section) {
      const filtered = studentLeaves.filter(
        leave => leave.className === className && leave.section === section
      );
      setFilteredLeaves(filtered);
      setErrors({});
    } else {
      setErrors({ general: 'Please enter both Class Name and Section' });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Leaves</Text>
      <View style={styles.head}>
        <TextInput
          style={styles.input}
          placeholder="Enter Class Name"
          value={className}
          onChangeText={(text) => setClassName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Section"
          value={section}
          onChangeText={(text) => setSection(text)}
        />
        <Button title="Filter Leaves" onPress={filterLeaves} />
        {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}
      </View>
      
      
      {filteredLeaves.length > 0 && (
        <View style={styles.box}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Student Name</Text>
            <Text style={styles.tableHeaderText}>Start Date</Text>
            <Text style={styles.tableHeaderText}>End Date</Text>
            <Text style={styles.tableHeaderText}>Reason</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
          </View>
          {filteredLeaves.map((leave, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableRowText}>{leave.fullname}</Text>
              <Text style={styles.tableRowText}>{leave.startDate}</Text>
              <Text style={styles.tableRowText}>{leave.endDate}</Text>
              <Text style={styles.tableRowText}>{leave.leavePurpose}</Text>
              <Text style={styles.tableRowText}>{leave.approval}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  head:{
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
  box:{
    borderWidth:1,
    borderColor:'black',
    margin:10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign:'center',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth:1,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'red',
    
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth:1,
  },
  tableRowText: {
    flex: 1,
    textAlign: 'center',
  },
});

export default StudentLeaves;
