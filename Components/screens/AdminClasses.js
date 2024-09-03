import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

const AdminClasses = () => {
  const [selectedOption, setSelectedOption] = useState('addClass');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [employeeid, setEmployeeid] = useState('');
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [modifyClassName, setModifyClassName] = useState('');
  const [modifySection, setModifySection] = useState('');
  const [newEmployeeid, setNewEmployeeid] = useState('');

  const options = [
    { label: 'Add Class', value: 'addClass' },
    { label: 'Modify Teacher Details', value: 'modifyClass' },
  ];

  const handleFetchTeacherDetails = async () => {
    if (employeeid.trim() === '') {
      Alert.alert('Error', 'Please enter a valid Employee ID');
      return;
    }
    try {
      const response = await axios.get(`http://18.60.190.183:3000/teacherInfo/${employeeid}`);
      setTeacherDetails(response.data);
    } catch (error) {
      console.error('Error fetching teacher details:', error);
    }
  };

  const handleAddClass = async () => {
    if (className.trim() === '' || section.trim() === '' || employeeid.trim() === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
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
        setEmployeeid('');
        setTeacherDetails(null);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  const handleModifyClass = async () => {
    if (modifyClassName.trim() === '' || modifySection.trim() === '' || newEmployeeid.trim() === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    try {
      const response = await axios.post('http://18.60.190.183:3000/modifyClass', {
        className: modifyClassName,
        section: modifySection,
        newEmployeeid: newEmployeeid,
      });
      if (response.data.success) {
        Alert.alert('Success', 'Class modified successfully');
        setModifyClassName('');
        setModifySection('');
        setNewEmployeeid('');
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
      
      <Dropdown
        style={styles.dropdown}
        data={options}
        labelField="label"
        valueField="value"
        placeholder="Select option"
        value={selectedOption}
        onChange={item => setSelectedOption(item.value)}
      />

      {selectedOption === 'addClass' && (
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
            onChangeText={setEmployeeid}
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
      )}

      {selectedOption === 'modifyClass' && (
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
            value={newEmployeeid}
            onChangeText={setNewEmployeeid}
          />
          <TouchableOpacity style={styles.button} onPress={handleModifyClass}>
            <Text style={styles.buttonText}>Update Class Teacher</Text>
          </TouchableOpacity>
        </View>
      )}
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
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
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
    margin: 5,
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
