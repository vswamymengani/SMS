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
      periodPart: '',
      startTime: '',
      endTime: '',
      subject: '',
      employeeid: '',
      teacherName: '',
      link: '',
    },
  ]);
  const [teachers, setTeachers] = useState([]);
  const [errors, setErrors] = useState({});

  const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const subjects = ['Telugu', 'English' ,'Mathematics','Sanskrit','Hindi','Physics','Biology','Chemistry','Sports','Social Studies'];
  const periods = ['First Period', 'Second Period', 'Third Period', 'Fourth Period', 'Fifth Period', 'Sixth Period', 'Seventh Period', 'Eighth Period'];

  // Generate time options with 15-minute intervals
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push({ label: time, value: time });
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const addEntry = () => {
    setTimetableEntries([
      ...timetableEntries,
      {
        className: '',
        section: '',
        day: '',
        periodPart: '',
        startTime: '',
        endTime: '',
        subject: '',
        employeeid: '',
        teacherName: '',
        link: '',
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
      const response = await axios.post('http://18.60.190.183:3000/timetable', { timetableEntries });
      console.log('Timetable entries submitted successfully:', response.data);
      setTimetableEntries([
        {
          className: '',
          section: '',
          day: '',
          periodPart: '',
          startTime: '',
          endTime: '',
          subject: '',
          employeeid: '',
          teacherName: '',
          link: '',
        },
      ]);
      Alert.alert('Timetable added successfully');
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to submit timetable entries. ' + (error.response ? error.response.data : error.message));
    }
  };
  

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:3000/teacherName');
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
                value={entry.periodPart}
                onChange={(item) => handleChange(index, 'periodPart', item.value)}
              />
            </View>
          )}
          {entry.periodPart && (
            <View style={styles.inputGroup}>
              <Text>Start Time:</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={timeOptions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Start Time"
                value={entry.startTime}
                onChange={(item) => handleChange(index, 'startTime', item.value)}
              />
            </View>
          )}
          {entry.startTime && (
            <View style={styles.inputGroup}>
              <Text>End Time:</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={timeOptions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select End Time"
                value={entry.endTime}
                onChange={(item) => handleChange(index, 'endTime', item.value)}
              />
            </View>
          )}
          {entry.endTime && (
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
          {entry.employeeid && (
            <View style={styles.inputGroup}>
              <Text>Link:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Live Class Link"
                value={entry.link}
                onChangeText={(text) => handleChange(index, 'link', text)}
              />
            </View>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={addEntry}>
        <Text style={styles.buttonText}>Add Another Entry</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  entryContainer: {
    marginBottom: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 12,
  },
  dropdown: {
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  placeholderStyle: {
    color: '#888',
  },
  selectedTextStyle: {
    color: '#000',
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  teacherName: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
  },
});

export default AdminTimeTable;
