import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import Image1 from '../assets/Verified.png';
import Image2 from '../assets/BackArrow.png';
import axios from 'axios';

const StudentComplaint = ({ route }) => {
  const navigation = useNavigation();
  const [leaveProfile, setLeaveProfile] = useState({});
  const [fullname, setFullName] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [errors, setErrors] = useState({});
  const [recipient, setRecipient] = useState('');
  const [typeOfComplaint, setTypeOfComplaint] = useState('');
  const [reason, setReason] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const email = route.params.email;

  const validate = () => {
    const newErrors = {};
    if (!recipient) newErrors.recipient = 'Select the recipient';
    if (!typeOfComplaint) newErrors.typeOfComplaint = 'Select the type of complaint';
    if (!reason) newErrors.reason = 'Enter the reason';
    if (!explanation) newErrors.explanation = 'Explain your reason';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsModalVisible(true);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const fetchLeaveProfile = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/leaveProfile?email=${email}`);
        const profile = response.data;
        setLeaveProfile(profile);
        setFullName(profile.fullname);
        setClassName(profile.className);
        setSection(profile.section);
      } catch (err) {
        setErrors({ general: 'Failed to load profile data' });
      }
    };
    if (email) {
      fetchLeaveProfile();
    } else {
      setErrors({ general: 'No email provided' });
    }
  }, [email]);

  const handleSendComplaint = async () => {
    if (validate()) {
      try {
        const response = await axios.post('http://10.0.2.2:3000/studentComplaint', {
          fullname,
          className,
          section,
          recipient,
          typeOfComplaint,
          reason,
          explanation,
        });
        if (response.status === 200) {
          handleSend();
        } else {
          console.error('Failed to send', response.status);
        }
      } catch (error) {
        console.error('Axios error', error);
      }
    }
  };

  const handleSend = () => {
    setIsModalVisible(true);
  };

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.navigate('Homescreen', { email });
  };

  const recipientData = [
    { label: 'Principal', value: 'principal' },
    { label: 'Teacher', value: 'teacher' },
  ];

  const typeOfComplaintData = [
    { label: 'School Related', value: 'School' },
    { label: 'Teacher Related', value: 'Teacher' },
    { label: 'Student Related', value: 'Student' },
    { label: 'Others', value: 'others' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() =>navigation.navigate('Homescreen', { email })}>
          <Image source={Image2} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.header}>Complaints</Text>
        <TouchableOpacity onPress={() =>navigation.navigate('StudentComplaintList',{ email })}>
          <Text style={styles.list}>Prev</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={recipientData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Recipient"
        value={recipient}
        onChange={item => {
          setRecipient(item.value);
          clearError('recipient');
        }}
        accessible={true}
        accessibilityLabel='Recipient'
      />
      {errors.recipient && <Text style={styles.error}>{errors.recipient}</Text>}
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
        onChange={item => {
          setTypeOfComplaint(item.value);
          clearError('typeOfComplaint');
        }}
        accessible={true}
        accessibilityLabel='Type of Complaint'
      />
      {errors.typeOfComplaint && <Text style={styles.error}>{errors.typeOfComplaint}</Text>}
      <TextInput
        style={styles.text}
        placeholder="Write the Complaint here"
        value={reason}
        onChangeText={(text) => { setReason(text); clearError('reason'); }}
      />
      {errors.reason && <Text style={styles.error}>{errors.reason}</Text>}
      <TextInput
        style={styles.descriptionInput}
        placeholder="Explain your Complaint here"
        multiline
        numberOfLines={18}
        value={explanation}
        onChangeText={(text) => { setExplanation(text); clearError('explanation'); }}
      />
      {errors.explanation && <Text style={styles.error}>{errors.explanation}</Text>}

      <TouchableOpacity style={styles.sendButton} onPress={handleSendComplaint}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType='fade'>
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
  header:{
    fontSize:20,
    color:'black',
    fontWeight:'bold',
  },
  image:{
    height:30,
    width:30,
  },
  list:{
    color:'white',
    backgroundColor:'#3F1175',
    padding:10,
    borderRadius:20,
    fontSize:16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginBottom: 10,
    borderBottomWidth:2,
    padding:5,
  },
  body:{
    paddingHorizontal:20,
  },
  details: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    borderColor: 'black',
    backgroundColor: '#3F1175',
    borderWidth: 2,
    width: '33%',
    height: 40,
    top: 10,
    borderRadius: 20,
    textAlign: 'center',
    padding: 5,
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
    backgroundColor:'white',
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

export default StudentComplaint;
