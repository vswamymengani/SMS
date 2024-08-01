import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import Image1 from '../assets/Verified.png';

const TeacherAttendance = ({ navigation, route }) => {
  const [className, setClassName] = useState('1');
  const [section, setSection] = useState('A');
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [errors, setErrors] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { email } = route.params;  // Correctly destructuring email from route.params

  const fetchStudents = () => {
    axios.get('http://10.0.2.2:3000/studentResults', { params: { className, section } })
      .then(response => {
        const initialAttendance = response.data.map(student => ({
          rollNo: student.rollNo,
          fullname: student.fullname,
          status: 'P', // default to 'P' for present
        }));
        setStudents(response.data);
        setAttendance(initialAttendance);
      })
      .catch(error => {
        console.error("Error fetching student details:", error);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, [className, section]);

  const validate = () => {
    const newErrors = {};
    if (!className) newErrors.className = "Select the class name";
    if (!section) newErrors.section = "Select the Section";
    if (!date) newErrors.date = "Enter the date";
    if (!subject) newErrors.subject = "Select the subject";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsModalVisible(true);
      return true;
    }
    return false;
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.navigate('TeacherHomeScreen', { email });
  };

  const handleAttendanceChange = (rollNo, status) => {
    setAttendance(prevAttendance =>
      prevAttendance.map(student =>
        student.rollNo === rollNo ? { ...student, status } : student
      )
    );
  };

  const handleSubmit = () => {
    if (validate()) {
      const attendanceData = attendance.map(({ rollNo, status }) => ({
        rollNo,
        date,
        subject,
        status,
        className,
        section,
      }));

      axios.post('http://10.0.2.2:3000/attendance', attendanceData)
        .then(response => {
          setIsModalVisible(true);
        })
        .catch(error => {
          console.error("Error submitting attendance:", error);
          Alert.alert('Error', 'Failed to submit attendance');
        });
    }
  };

  const clearError = (field) => {
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
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
      
      <View style={styles.dropdownRow2}>
        <Dropdown
          style={styles.dropdown2}
          placeholderStyle={styles.placeholderStyle2}
          selectedTextStyle={styles.selectedTextStyle2}
          data={classNameData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Class"
          
          value={className}
          onChange={item => { setClassName(item.value); clearError('className'); }}
          accessible={true}
          accessibilityLabel="Class"
        />
        {errors.className && <Text style={styles.error}>{errors.className}</Text>}
        <Dropdown
          style={styles.dropdown2}
          placeholderStyle={styles.placeholderStyle2}
          selectedTextStyle={styles.selectedTextStyle2}
          data={sectionData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Section"
          value={section}
          onChange={item => { setSection(item.value); clearError('section'); }}
          accessible={true}
          accessibilityLabel="Section"
        />
        {errors.section && <Text style={styles.error}>{errors.section}</Text>}
      </View>
      <View style={styles.dropdownRow}>
        <TextInput
          style={styles.textInput}
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={text => { setDate(text); clearError('date'); }}
        />
        {errors.date && <Text style={styles.error}>{errors.date}</Text>}
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
          onChange={item => { setSubject(item.value); clearError('subject'); }}
          accessible={true}
          accessibilityLabel="Subject"
        />
        {errors.subject && <Text style={styles.error}>{errors.subject}</Text>}
      </View>
      {students.length > 0 && (
        <View>
          <Text style={styles.boldText}>Student Attendance</Text>
          {students.map(student => (
            <View key={student.rollNo} style={styles.studentRow}>
              <Text style={styles.studentText}>{student.fullname}</Text>
              <Text style={styles.studentText}>{student.rollNo}</Text>
              <TextInput
                style={styles.attendanceInput}
                value={attendance.find(att => att.rollNo === student.rollNo)?.status}
                onChangeText={text => handleAttendanceChange(student.rollNo, text.toUpperCase())}
                placeholder='P'
                accessible={true}
                accessibilityLabel={`attendance-${student.rollNo}`}
              />
            </View>
          ))}
          <Button title="Submit Attendance" onPress={handleSubmit} />
        </View>
      )}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={Image1} style={styles.successImage} />
            <Text style={styles.modalText}>Attendance submitted successfully</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  prevButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  prevButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dropdown2: {
    width: '48%',
    borderWidth:2,
    color:'black',
    padding:8,
    borderRadius:10,
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdown: {
    width: '48%',
    borderWidth:2,
    padding:8,
    borderRadius:10,
  },
  placeholderStyle2: {
    fontSize: 16,
    color: '#8a8a8a',
  },
  selectedTextStyle2: {
    fontSize: 16,
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
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: '48%',
    height:60,
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 10,
    justifyContent:'center',
    color:'black',
    fontSize:18,
    left:100,
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth:2,
  },
  studentText: {
    fontSize: 16,
  },
  attendanceInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '15%',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TeacherAttendance;





<View style={styles.header}>
        <TouchableOpacity
          style={styles.prevButton}
          onPress={() => navigation.navigate('PrevAttendance')}
        >
          <Text style={styles.prevButtonText}>Prev</Text>
        </TouchableOpacity>
      </View>