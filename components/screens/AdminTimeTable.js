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

  const [classes, setClasses] = useState([]);
  const [sectionOptions, setSectionOptions] = useState({}); // Update to store sections for each class

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:3000/classDetails');
        const classData = response.data;
        setClasses(classData);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const fetchSections = async (className) => {
    const filteredSections = classes
      .filter(cls => cls.className === className)
      .flatMap(cls => cls.sections); // Assuming `sections` is an array in the `ClassDetails` table
    return filteredSections.map(sec => ({ label: sec, value: sec }));
  };

  useEffect(() => {
    timetableEntries.forEach(async (entry, index) => {
      if (entry.className) {
        const sections = await fetchSections(entry.className);
        setSectionOptions(prev => ({ ...prev, [index]: sections }));
      }
    });
  }, [timetableEntries]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const subjects = ['Telugu', 'English', 'Mathematics', 'Sanskrit', 'Hindi', 'Physics', 'Biology', 'Chemistry', 'Sports', 'Social Studies'];
  const periods = ['First Period', 'Second Period', 'Third Period', 'Fourth Period', 'Fifth Period', 'Sixth Period', 'Seventh Period', 'Eighth Period'];

  // Generate time options with 15-minute intervals
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
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

  const formatTimeInput = (input) => {
    const cleaned = input.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const hour = cleaned.slice(0, 2);
    const minute = cleaned.slice(2, 4);
    if (hour.length > 2) {
      return `${hour.slice(0, 2)}:${minute}`;
    }
    if (minute.length > 2) {
      return `${hour}:${minute.slice(0, 2)}`;
    }
    return `${hour}${minute ? ':' + minute : ''}`;
  };

  const handleTimeChange = (index, field, value) => {
    const formattedValue = formatTimeInput(value);
    handleChange(index, field, formattedValue);
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
              data={classes.map(cls => ({ label: cls.className, value: cls.className }))}
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
                data={sectionOptions[index] || []}
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
              <TextInput
                style={styles.input}
                placeholder="Enter Start Time (HH:MM)"
                value={entry.startTime}
                keyboardType="numeric"
                onChangeText={(value) => handleTimeChange(index, 'startTime', value)}
              />
            </View>
          )}
          {entry.startTime && (
            <View style={styles.inputGroup}>
              <Text>End Time:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter End Time (HH:MM)"
                value={entry.endTime}
                keyboardType="numeric"
                onChangeText={(value) => handleTimeChange(index, 'endTime', value)}
              />
            </View>
          )}
          {entry.endTime && (
            <>
              <View style={styles.inputGroup}>
                <Text>Employee ID:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Employee ID"
                  value={entry.employeeid}
                  onChangeText={(value) => handleChange(index, 'employeeid', value)}
                />
              </View>
              {entry.employeeid && (
                <View style={styles.inputGroup}>
                  <Text>Teacher Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Teacher Name"
                    value={entry.teacherName}
                    editable={false}
                  />
                </View>
              )}
              <View style={styles.inputGroup}>
                <Text>Link:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Link"
                  value={entry.link}
                  onChangeText={(value) => handleChange(index, 'link', value)}
                />
              </View>
            </>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={addEntry}>
        <Text style={styles.buttonText}>Add Another Entry</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Timetable</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor:'white',
  },
  entryContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  placeholderStyle: {
    color: '#aaa',
  },
  selectedTextStyle: {
    color: '#000',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AdminTimeTable;
