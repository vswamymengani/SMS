import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import Image1 from '../assets/Verified.png';
import Image2 from '../assets/Back_Arrow.png';
import Image3 from '../assets/BackImage.png';

const TeacherComplaint1 = ({ route }) => {
  const navigation = useNavigation();
  const [employeeid, setEmployeeId] = useState('');
  const [typeOfComplaint, setTypeOfComplaint] = useState('');
  const [teacher, setTeacher] = useState({});
  const [reason, setReason] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const email = route.params.email;

  const handleSend = () => {
    const newErrors = {};
    if (!employeeid) newErrors.employeeid = 'Employee ID is required';
    if (!typeOfComplaint) newErrors.typeOfComplaint = 'Type of complaint is required';
    if (!reason) newErrors.reason = 'Reason is required';
    if (!explanation) newErrors.explanation = 'Explanation is required';

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsModalVisible(true);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/teacherProfile?email=${email}`);
        setTeacher(response.data);
        setEmployeeId(response.data.employeeid);
      } catch (error) {
        setErrors({ general: "Unable to get employee ID" });
      }
    };

    if (email) {
      fetchTeacher();
    }
  }, [email]);

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.navigate('TeacherHomeScreen', { email });
  };

  const Complaint = async () => {
    if (handleSend()) {
      axios.post('http://10.0.2.2:3000/TeacherComplaints', {
        employeeid,
        typeOfComplaint,
        reason,
        explanation
      })
      .then(response => {
        if (response.status === 200) {
          setIsModalVisible(true);
        } else {
          console.error('Failed to send', response.status);
        }
      })
      .catch(error => {
        console.error('Axios error', error);
      });
    }
  };

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  }

  const typeOfComplaintData = [
    { label: 'Management Related', value: 'Management' },
    { label: 'Teacher Related', value: 'Teacher' },
    { label: 'Student Related', value: 'Student' },
    { label: 'Others', value: 'others' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Image source={Image3} style={styles.bc} />
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate('TeacherHomeScreen', { email })}>
          <Image source={Image2} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.header}>Complaints</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TeacherComplaintList', { email, employeeid })}>
          <Text style={styles.button}>Prev</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>Employee ID: {teacher.employeeid}</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={typeOfComplaintData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Type of Complaint"
          value={typeOfComplaint}
          onChange={item => { setTypeOfComplaint(item.value); clearError('typeOfComplaint'); }}
          accessible={true}
          accessibilityLabel="Type of Complaint"
        />
        {errors.typeOfComplaint && <Text style={styles.error}>{errors.typeOfComplaint}</Text>}
        <TextInput
          style={styles.dateInput}
          placeholder="Write the Complaint here"
          value={reason}
          onChangeText={(text) => { setReason(text); clearError('reason'); }}
          accessible={true}
          accessibilityLabel="Write the Complaint here"
        />
        {errors.reason && <Text style={styles.error}>{errors.reason}</Text>}
        <TextInput
          style={styles.descriptionInput}
          placeholder="Explain your Complaint here"
          multiline
          numberOfLines={18}
          value={explanation}
          onChangeText={(text) => { setExplanation(text); clearError('explanation'); }}
          accessible={true}
          accessibilityLabel="Explain your Complaint here"
        />
        {errors.explanation && <Text style={styles.error}>{errors.explanation}</Text>}
        <TouchableOpacity
          style={styles.sendButton}
          onPress={Complaint}
          accessible={true}
          accessibilityLabel="Send Complaint Button"
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        <Modal visible={isModalVisible} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={Image1} style={styles.successImage} />
              <Text style={styles.modalText}>Complaint is sent successfully</Text>
              <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bc: {
    height: '110%',
    width: '110%',
    position: 'absolute',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    marginBottom: 40,
  },
  image: {
    height: 23,
    width: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    color: "white",
    backgroundColor: "#3F1175",
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 15,
    borderColor: 'white',
    padding: 5,
    textAlign: 'center',
    left: 10,
    top: -5,
  },
  body: {
    backgroundColor: 'white',
    borderRadius: 40,
    height: '110%',
    padding: 10,
  },
  text: {
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 15,
    borderRadius: 20,
    borderColor: '#3F1175',
    textAlign: 'auto',
    padding: 15,
    marginVertical: 10,
  },
  dropdown: {
    margin: 13,
    width: '100%',
    alignContent: 'center',
    marginLeft: 0,
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#3F1175',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  dateInput: {
    borderBottomWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
  },
  descriptionInput: {
    borderWidth: 3,
    borderColor: '#3F1175',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    marginVertical: 10,
    color: 'black',
  },
  sendButton: {
    backgroundColor: '#3F1175',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successImage: {
    height: 70,
    width: 70,
  },
  modalText: {
    fontSize: 18,
    marginVertical: 15,
    color: 'black',
  },
  modalButton: {
    backgroundColor: '#3F1175',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 15,
  },
});

export default TeacherComplaint1;
