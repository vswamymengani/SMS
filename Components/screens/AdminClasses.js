import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const AdminClasses = () => {
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [employeeid, setemployeeid] = useState('');
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [modifyClassName, setModifyClassName] = useState('');
  const [modifySection, setModifySection] = useState('');
  const [newemployeeid, setNewemployeeid] = useState('');

  const handleFetchTeacherDetails = async () => {
    try {
      const response = await axios.get(`http://18.60.190.183:3000/teacherInfo/${employeeid}`);
      setTeacherDetails(response.data);
    } catch (error) {
      console.error('Error fetching teacher details:', error);
    }
  };

  const handleAddClass = async () => {
    try {
      const response = await axios.post('http://18.60.190.183:3000/addClass', {
        className,
        section,
        employeeid,
      });
      if (response.data.success) {
        Alert.alert('Success', 'Class added successfully');
        setClassName('');
        setSection('');
        setemployeeid('');
        setTeacherDetails(null);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  const handleModifyClass = async () => {
    try {
      console.log('Modifying class with:', {
        className: modifyClassName,
        section: modifySection,
        newEmployeeid: newemployeeid,
      });

      const response = await axios.post('http://18.60.190.183:3000/modifyClass', {
        className: modifyClassName,
        section: modifySection,
        newEmployeeid: newemployeeid,
      });
      if (response.data.success) {
        Alert.alert('Success', 'Class modified successfully');
        setModifyClassName('');
        setModifySection('');
        setNewemployeeid('');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error modifying class:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Classes Management</Text>

      <View style={styles.section}>
        <Text style={styles.title}>Add Class Teacher</Text>
        <TextInput
          style={styles.input}
          placeholder="Class Name"
          value={className}
          onChangeText={setClassName}
        />
        <TextInput
          style={styles.input}
          placeholder="Section"
          value={section}
          onChangeText={setSection}
        />
        <TextInput
          style={styles.input}
          placeholder="Class Teacher Employee ID"
          value={employeeid}
          onChangeText={setemployeeid}
        />
        <TouchableOpacity style={styles.button} onPress={handleFetchTeacherDetails}>
          <Text style={styles.buttonText}>Teacher Details</Text>
        </TouchableOpacity>
        {teacherDetails && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Full Name: {teacherDetails.fullname}</Text>
            <Text style={styles.detailsText}>Subject: {teacherDetails.subject}</Text>
            <Text style={styles.detailsText}>Employee ID: {teacherDetails.employeeid}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={handleAddClass}>
          <Text style={styles.buttonText}>Add Class</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Update Class Teacher</Text>
        <TextInput
          style={styles.input}
          placeholder="Class Name"
          value={modifyClassName}
          onChangeText={setModifyClassName}
        />
        <TextInput
          style={styles.input}
          placeholder="Section"
          value={modifySection}
          onChangeText={setModifySection}
        />
        <TextInput
          style={styles.input}
          placeholder="New Class Teacher Employee ID"
          value={newemployeeid}
          onChangeText={text => {
            console.log('New employee ID input:', text); // Debugging line
            setNewemployeeid(text);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={handleModifyClass}>
          <Text style={styles.buttonText}>Update Class Teacher</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3F1175',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginVertical: 10,
  },
  detailsText: {
    fontSize: 16,
  },
});

export default AdminClasses;
