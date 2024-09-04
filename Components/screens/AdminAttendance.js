import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import Image1 from '../assets/Verified.png';

const AdminAttendance = ({ navigation }) => {
  const [teachers, setTeachers] = useState([]);
  const [date, setDate] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [errors, setErrors] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchTeachers = () => {
    axios.get('http://18.60.190.183:3000/teacherDetails')
      .then(response => {
        const initialAttendance = response.data.map(teacher => ({
          employeeid: teacher.employeeid,
          fullname: teacher.fullname,
          status: 'Present', // default to 'Present'
        }));
        setTeachers(response.data);
        setAttendance(initialAttendance);
      })
      .catch(error => {
        console.error("Error fetching teacher details:", error);
      });
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!date) newErrors.date = "Enter the date";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsModalVisible(true);
      return true;
    }
    return false;
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.navigate('AdminView');
  };

  const handleAttendanceChange = (employeeid, status) => {
    setAttendance(prevAttendance =>
      prevAttendance.map(teacher =>
        teacher.employeeid === employeeid ? { ...teacher, status } : teacher
      )
    );
  };

  const handleSubmit = () => {
    if (validate()) {
      const attendanceData = attendance.map(({ employeeid, status }) => ({
        employeeid,
        date,
        status,
      }));

      axios.post('http://18.60.190.183:3000/teacherAttendance', attendanceData)
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

  const attendanceStatusData = [
    { label: 'Present', value: 'Present' },
    { label: 'Absent', value: 'Absent' },
    { label: 'Leave', value: 'Leave' },
    { label: 'Holiday', value: 'Holiday' }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Date (DD-MM-YYYY)"
          value={date}
          onChangeText={text => { setDate(text); clearError('date'); }}
        />
        {errors.date && <Text style={styles.error}>{errors.date}</Text>}
      </View>

      {teachers.length > 0 && (
        <View>
          <Text style={styles.boldText}>Teacher Attendance</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Full Name</Text>
              <Text style={styles.tableHeaderText}>Employee ID</Text>
              <Text style={styles.tableHeaderText}>Status</Text>
            </View>
            {teachers.map(teacher => (
              <View key={teacher.employeeid} style={styles.tableRow}>
                <Text style={styles.tableCell}>{teacher.fullname}</Text>
                <Text style={styles.tableCell}>{teacher.employeeid}</Text>
                <View style={styles.tableCell}>
                  <Dropdown
                    style={styles.attendanceDropdown}
                    placeholderStyle={styles.attendancePlaceholderStyle}
                    selectedTextStyle={styles.attendanceSelectedTextStyle}
                    data={attendanceStatusData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Status"
                    value={attendance.find(att => att.employeeid === teacher.employeeid)?.status}
                    onChange={item => handleAttendanceChange(teacher.employeeid, item.value)}
                  />
                </View>
              </View>
            ))}
          </View>
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
  inputContainer: {
    marginBottom: 25,
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
  table: {
    borderWidth: 1,
    borderColor: '#3F1175',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3F1175',
    padding: 10,
  },
  tableHeaderText: {
    color: 'white',
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#3F1175',
    padding: 10,
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  attendanceDropdown: {
    borderColor: '#3F1175',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
    height: 40,
  },
  attendancePlaceholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  attendanceSelectedTextStyle: {
    fontSize: 16,
    color: 'black',
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

export default AdminAttendance;
