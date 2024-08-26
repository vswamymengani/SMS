import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import Image1 from '../assets/Verified.png';
import Image2 from '../assets/Back_Arrow.png';
import Image3 from '../assets/BackImage.png';
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
        const response = await axios.get(`http://18.60.190.183:3000/studentProfile?email=${email}`);
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
        const response = await axios.post('http://18.60.190.183:3000/studentComplaint', {
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
      <Image source={Image3} style={styles.bc} />
      <View style={styles.heading}>
        <TouchableOpacity onPress={() => navigation.navigate('Homescreen',{ email})}>
          <Image source={Image2} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.header}>Complaints</Text>
        <TouchableOpacity onPress={() => navigation.navigate('StudentComplaintList', { email })}>
          <Text style={styles.button}>Prev</Text>
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
          style={styles.dateInput}
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
      </View>
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
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    top:10,
    marginBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  body: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: '110%',
    padding: 10,
  },
  image: {
    height: 23,
    width: 20,
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
  dropdown: {
    margin: 13,
    width: '100%',
    alignContent: 'center',
    marginLeft: 0,
    padding: 20,
    borderRadius: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    top: 0,
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
    color: 'black',
    textAlignVertical: 'top',
    marginVertical: 10,
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
  error: {
    color: 'red',
    fontSize: 14,
    marginLeft: 10,
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
    borderRadius: 20,
    alignItems: 'center',
  },
  successImage: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#3F1175',
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default StudentComplaint;
