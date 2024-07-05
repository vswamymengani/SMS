import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import Image1 from '../assets/Verified.png';

const TeacherComplaint1 = () => {
  const navigation = useNavigation();
  const [employeeid, setEmployeeId] = useState('');
  const [typeOfComplaint, setTypeOfComplaint] = useState('');
  const [reason, setReason] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.navigate('TeacherHomeScreen');
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
      <TextInput
        style={styles.text}
        placeholder="Enter Your Employee Id"
        value={employeeid}
        onChangeText={(text) => { setEmployeeId(text); clearError('employeeid'); }}
        accessible={true}
        accessibilityLabel="Enter Your Employee Id"
      />
      {errors.employeeid && <Text style={styles.error}>{errors.employeeid}</Text>}
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
        style={styles.text}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  dropdown: {
    margin: 13,
    width: '100%',
    alignContent: 'center',
    marginLeft: 0,
    padding: 20,
    borderWidth: 3,
    borderColor: '#3F1175',
    borderRadius: 30,
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
  text: {
    borderWidth: 3,
    color: 'black',
    fontSize: 15,
    borderRadius: 30,
    borderColor: '#3F1175',
    textAlign: 'auto',
    padding: 15,
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
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  modalButton: {
    backgroundColor: '#3F1175',
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TeacherComplaint1;
