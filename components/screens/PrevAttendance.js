import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const PrevAttendance = () => {
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchPressed, setSearchPressed] = useState(false);

  const handleSearch = () => {
    setSearchPressed(true);
    axios.get('http://18.60.190.183:3000/prevAttendance', { params: { className, section, date, subject } })
      .then(response => {
        setAttendanceData(response.data);
      })
      .catch(error => {
        console.error("Error fetching attendance details:", error);
      });
  };

  const classNameData = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' }
  ];

  const sectionData = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' }
  ];

  const subjectData = [
    { label: 'English', value: 'English' },
    { label: 'Telugu', value: 'Telugu' },
    { label: 'Hindi', value: 'Hindi' },
    { label: 'Mathematics', value: 'Mathematics' },
    { label: 'Science', value: 'Science' },
    { label: 'Social Studies', value: 'Social Studies' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'Biology', value: 'Biology' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.dropdownRow}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={classNameData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Class"
          value={className}
          onChange={item => setClassName(item.value)}
          accessible={true}
          accessibilityLabel="Class"
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={sectionData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Section"
          value={section}
          onChange={item => setSection(item.value)}
          accessible={true}
          accessibilityLabel="Section"
        />
      </View>
      <View style={styles.dropdownRow}>
      <TextInput
        style={styles.textInput}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={text => setDate(text)}
        accessible={true}
        accessibilityLabel="Date"
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={subjectData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Subject"
        value={subject}
        onChange={item => setSubject(item.value)}
        accessible={true}
        accessibilityLabel="Subject"
      />
      </View>
      <Button title="Search" onPress={handleSearch} />
      {searchPressed && (
        <>
          <Text style={styles.title}>Attendance Details</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Class: {className}</Text>
            <Text style={styles.detailsText}>Section: {section}</Text>
            <Text style={styles.detailsText}>Date: {date}</Text>
            <Text style={styles.detailsText}>Subject: {subject}</Text>
          </View>
          {attendanceData.length > 0 ? (
            attendanceData.map((attendance, index) => (
              <View key={index} style={styles.attendanceRow}>
                <Text style={styles.attendanceText}>{attendance.rollNo}</Text>
                <Text style={styles.attendanceText}>{attendance.status}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No attendance data found for the selected criteria.</Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdown: {
    width: '48%',
    borderWidth:2,
    color:'black',
    margin:5,
    padding:10,
    height:50,
    borderRadius:10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#8a8a8a',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  textInput: {
    borderColor: 'black',
    width: '48%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    margin:5,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  attendanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  attendanceText: {
    fontSize: 16,
  },
  noDataText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PrevAttendance;
