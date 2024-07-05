import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import Image1 from '../assets/Verified.png';

const Attendance = ({ navigation }) => {
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [errors, setErrors] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchStudents = () => {
    axios.get('http://10.0.2.2:3000/students', { params: { className, section } })
      .then(response => {
        setStudents(response.data);
        const initialAttendance = response.data.map(student => ({
          rollno: student.rollno,
          fullname: student.fullname,
          status: 'P', // default to 'P' for present
        }));
        setAttendance(initialAttendance);
      })
      .catch(error => {
        console.error("Error fetching student details:", error);
      });
  };

  useEffect(() => {
    if (className && section) {
      fetchStudents();
    }
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
    navigation.navigate('TeacherHomeScreen',{email});
  };

  const handleAttendanceChange = (rollno, status) => {
    setAttendance(prevAttendance =>
      prevAttendance.map(student =>
        student.rollno === rollno ? { ...student, status } : student
      )
    );
  };

  const handleSubmit = () => {
    if (validate()) {
      const attendanceData = attendance.map(({ rollno, status }) => ({
        rollno,
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
    { label: '1', value: "1" },
    { label: '2', value: "2" },
    { label: '3', value: "3" },
    { label: '4', value: "4" },
    { label: '5', value: "5" },
    { label: '6', value: "6" },
    { label: '7', value: "7" },
    { label: '8', value: "8" },
    { label: '9', value: "9" },
    { label: '10', value: "10" },
    { label: '11', value: "11" },
    { label: '12', value: "12" }
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
            <View key={student.rollno} style={styles.studentRow}>
              <Text style={styles.studentText}>{student.fullname}</Text>
              <Text style={styles.studentText}>{student.rollno}</Text>
              <Dropdown
                data={[
                  { label: 'Present', value: 'P' },
                  { label: 'Absent', value: 'A' }
                ]}
                value={attendance.find(att => att.rollno === student.rollno)?.status}
                onChange={status => handleAttendanceChange(student.rollno, status.value)}
                style={styles.attendanceDropdown}
                placeholder='Select Status'
                placeholderStyle={styles.attendancePlaceholder}
                selectedTextStyle={styles.attendanceSelectedText}
                accessible={true}
                accessibilityLabel="Select Status"
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
  right: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3F1175',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '50%',
  },
  header: {
    borderWidth: 3,
    color: 'white',
    fontSize: 18,
    borderRadius: 20,
    borderColor: '#3F1175',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  dropdownRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    width: '60%',
  },
  dropdownContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  placeholderStyle2: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  selectedTextStyle2: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  dropdown2: {
    borderColor: '#3F1175',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 10,
    width: '75%',
    height: 50,
    marginRight: 30,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#3F1175',
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  boldText: {
    fontWeight: 'bold',
    marginVertical: 16,
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    padding: 10,
  },
  studentText: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 20,
    color: 'black',
  },
  attendanceDropdown: {
    borderColor: '#3F1175',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
    width: '30%',
    height: 40,
  },
  attendancePlaceholder: {
    fontSize: 14,
    color: 'black',
  },
  attendanceSelectedText: {
    fontSize: 14,
    color: 'black',
  },
  dropdown: {
    borderColor: '#3F1175',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 10,
    right: 8,
    height: 50,
    width: '45%',
  },
  sendButton: {
    backgroundColor: '#3F1175',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: '#3F1175',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successImage: {
    width: 100,
    height: 100,
  },
});

export default Attendance;
