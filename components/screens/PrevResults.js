import React, { useState ,useEffect} from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const PrevResults = () => {
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [examType, setExamType] = useState('');
  const [subject, setSubject] = useState('');
  const [resultsData, setResultsData] = useState([]);
  const [searchPressed, setSearchPressed] = useState(false);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:3000/classDetails');
        const classData = response.data;
        setClasses(classData);
        setClassOptions(classData.map(cls => ({ label: cls.className, value: cls.className })));
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    if (className) {
      const filteredSections = classes
        .filter(cls => cls.className === className)
        .flatMap(cls => cls.sections); // Assuming `sections` is an array in the `ClassDetails` table
      setSections(filteredSections);
      setSectionOptions(filteredSections.map(sec => ({ label: sec, value: sec })));
    } else {
      setSectionOptions([]);
    }
  }, [className, classes]);

  const handleSearch = () => {
    setSearchPressed(true);
    axios.get('http://18.60.190.183:3000/prevResults', { params: { className, section, examType, subject } })
      .then(response => {
        setResultsData(response.data);
      })
      .catch(error => {
        console.error("Error fetching results:", error);
      });
  };

  const renderResultsRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.fullname}</Text>
      <Text style={styles.cell}>{item.rollNo}</Text>
      <Text style={styles.cell}>{item.marks}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.dropdownRow}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={classOptions}
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
          data={sectionOptions}
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
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Name</Text>
            <Text style={styles.headerText}>Roll No</Text>
            <Text style={styles.headerText}>Marks</Text>
          </View>
          {resultsData.length > 0 ? (
            <FlatList
              data={resultsData}
              renderItem={renderResultsRow}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={styles.noDataText}>No Results data found for the selected criteria.</Text>
          )}
        </View>
      )}
    </View>
  );
};


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdown: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  table: {
    borderWidth: 1,
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
  },
  noDataText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PrevResults;
