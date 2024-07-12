import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const AdminTimeTable = () => {
  const [timetableEntries, setTimetableEntries] = useState([
    {
      className: '',
      section: '',
      day: '',
      period: '',
      subject: '',
      employeeid: '',
      teacherName: '',
    },
  ]);
  const [teachers, setTeachers] = useState([]);
  const [errors, setErrors] = useState({});

  const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = ['First Period : 09:30 to 10:30', 'Second Period : 10:30 to 11:30', 'Third Period : 11:30 to 12:30', 'Fourth Period : 01:30 to 02:30', 'Fifth Period : 02:30 to 03:30', 'Sixth Period : 03:30 to 04:30'];
  const subjects = ['Telugu', 'English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'History', 'Computer Science', 'Biology', 'Sports'];

  const addEntry = () => {
    setTimetableEntries([
      ...timetableEntries,
      {
        className: '',
        section: '',
        day: '',
        period: '',
        subject: '',
        employeeid: '',
        teacherName: '',
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updatedEntries = [...timetableEntries];
    updatedEntries[index][field] = value;

    if (field === 'employeeid') {
      if (teachers && teachers.length > 0) {
        const teacher = teachers.find(t => t.employeeid === value);
        updatedEntries[index].teacherName = teacher ? teacher.fullname : '';
      }
    }

    setTimetableEntries(updatedEntries);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/timetable', { timetableEntries });
      console.log('Timetable entries submitted successfully:', response.data);
      setTimetableEntries([
        {
          className: '',
          section: '',
          day: '',
          period: '',
          subject: '',
          employeeid: '',
          teacherName: '',
        },
      ]);
      Alert.alert('Timetable added successfully');
    } catch (error) {
      console.error('Failed to submit timetable entries:', error);
      // Handle error state or alert the user
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/teacherName');
        setTeachers(response.data);
      } catch (error) {
        console.error('Unable to fetch the data:', error);
        setErrors({ general: 'Unable to fetch the data' });
      }
    };
    fetchTeachers();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {timetableEntries.map((entry, index) => (
        <View key={index} style={styles.entryContainer}>
          <Text style={styles.header}>Entry {index + 1}</Text>
          <View style={styles.inputGroup}>
            <Text>Class:</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={classes.map((className) => ({ label: className, value: className }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Class"
              value={entry.className}
              onChange={(item) => handleChange(index, 'className', item.value)}
            />
          </View>
          {entry.className && (
            <View style={styles.inputGroup}>
              <Text>Section:</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={sections.map((section) => ({ label: section, value: section }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Section"
                value={entry.section}
                onChange={(item) => handleChange(index, 'section', item.value)}
              />
            </View>
          )}
          {entry.section && (
            <View style={styles.inputGroup}>
              <Text>Day:</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={days.map((day) => ({ label: day, value: day }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Day"
                value={entry.day}
                onChange={(item) => handleChange(index, 'day', item.value)}
              />
            </View>
          )}
          {entry.day && (
            <View style={styles.inputGroup}>
              <Text>Period:</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={periods.map((period) => ({ label: period, value: period }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Period"
                value={entry.period}
                onChange={(item) => handleChange(index, 'period', item.value)}
              />
            </View>
          )}
          {entry.period && (
            <View style={styles.inputGroup}>
              <Text>Subject:</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={subjects.map((subject) => ({ label: subject, value: subject }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Subject"
                value={entry.subject}
                onChange={(item) => handleChange(index, 'subject', item.value)}
              />
            </View>
          )}
          {entry.subject && (
            <View style={styles.inputGroup}>
              <Text>Teacher ID:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Employee ID"
                value={entry.employeeid}
                onChangeText={(text) => handleChange(index, 'employeeid', text)}
              />
            </View>
          )}
          {entry.employeeid && (
            <View style={styles.inputGroup}>
              <Text>Teacher Name:</Text>
              <Text style={styles.teacherName}>{entry.teacherName}</Text>
            </View>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addEntry}>
        <Text style={styles.addButtonText}>Add Entry</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  entryContainer: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdown: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  teacherName: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminTimeTable;
