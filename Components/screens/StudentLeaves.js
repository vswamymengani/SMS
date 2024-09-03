import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const StudentLeaves = ({ route }) => {
  const { email, className, section } = route.params;
  const [studentLeaves, setStudentLeaves] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchStudentLeaves = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/studentTeacherLeaveList?className=1&section=A`);
        setStudentLeaves(response.data);
      } catch (error) {
        setErrors({ general: 'Unable to fetch student leaves data' });
      }
    };
    fetchStudentLeaves();
  }, [className, section]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Leaves</Text>
      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Student Name</Text>
        <Text style={styles.tableHeaderText}>Start Date</Text>
        <Text style={styles.tableHeaderText}>End Date</Text>
        <Text style={styles.tableHeaderText}>Reason</Text>
        <Text style={styles.tableHeaderText}>Status</Text>
      </View>
      {studentLeaves.map((leave, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableRowText}>{leave.fullname}</Text>
          <Text style={styles.tableRowText}>{leave.startDate}</Text>
          <Text style={styles.tableRowText}>{leave.endDate}</Text>
          <Text style={styles.tableRowText}>{leave.leavePurpose}</Text>
          <Text style={styles.tableRowText}>{leave.approval}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tableRowText: {
    flex: 1,
    textAlign: 'center',
  },
});

export default StudentLeaves;
