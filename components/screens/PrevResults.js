import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const PrevResults = () => {
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [examType, setExamType] = useState('');
  const [subject, setSubject] = useState('');
  const [resultsData, setResultsData] = useState([]);
  const [searchPressed, setSearchPressed] = useState(false);

  const handleSearch = () => {
    setSearchPressed(true);
    axios.get('http://10.0.2.2:3000/prevResults', { params: { className, section, examType, subject } })
      .then(response => {
        setResultsData(response.data);
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
  const examTypeData = [
    { label: 'Quarterly', value: 'Quarterly' },
    { label: 'Half Yearly', value: 'Half Yearly' },
    { label: 'Finals', value: 'Finals' },
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
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={examTypeData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Exam Type"
        value={examType}
        onChange={item => setExamType(item.value)}
        accessible={true}
        accessibilityLabel="Exam Type"
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
          <Text style={styles.title}>Results</Text>
          {resultsData.length > 0 ? (
            resultsData.map((results, index) => (
              <View key={index} style={styles.resultsRow}>
                <Text style={styles.resultsText}>{results.fullname}</Text>
                <Text style={styles.resultsText}>{results.rollno}</Text>
                <Text style={styles.resultsText}>{results.marks}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No Results data found for the selected criteria.</Text>
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
    alignItems:'center',
  },
  title: {
    fontSize: 24,
    color:'black',
    
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
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'black',
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
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    borderWidth:2,
    padding:5,
  },
  resultsText: {
    fontSize: 16,
    color:'black',
    marginHorizontal:50,
  },
  noDataText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PrevResults;
