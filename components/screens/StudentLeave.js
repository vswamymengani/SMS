import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import Image1 from '../assets/Verified.png';
import Image2 from '../assets/Back_Arrow.png';
import Image3 from '../assets/BackImage.png';
import axios from 'axios';

const StudentLeave = ({ route }) => {
  const navigation = useNavigation();
  const [leaveProfile, setLeaveProfile] = useState({});
  const [fullname, setFullname] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [recipient, setRecipient] = useState('Principal'); // Set recipient to "teacher" initially
  const [leavePurpose, setLeavePurpose] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [yourEmail, setYourEmail] = useState('');
  const email = route.params.email;

  const validate = () => {
    const newErrors = {};
    if (!recipient) newErrors.recipient = 'Select the recipient';
    if (!leavePurpose) newErrors.leavePurpose = 'Enter the leave purpose';
    if (!startDate) newErrors.startDate = 'Enter the starting date';
    if (!endDate) newErrors.endDate = 'Enter the end date';
    if (!description) newErrors.description = 'Explain your reason';
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
        setFullname(profile.fullname);
        setClassName(profile.className);
        setSection(profile.section);
        setYourEmail(profile.email);
      } catch (err) {
        setErrors('Failed to load profile data');
      }
    };
    if (email) {
      fetchLeaveProfile();
    } else {
      setErrors('No email provided');
    }
  }, [email]);

  const handleSendLeaveRequest = async () => {
    if (validate()) {
      axios.post('http://10.0.2.2:3000/studentLeave', {
        fullname,
        className,
        section,
        email,
        recipient,
        leavePurpose,
        startDate,
        endDate,
        description,
      })
      .then(response => {
        if (response.status === 200) {
          handleSend();
        } else {
          console.error('Failed to send', response.status);
        }
      })
      .catch(error => {
        console.error('Axios error', error);
      });
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

  const leavePurposeData = [
    { label: 'Health Issue', value: 'health' },
    { label: 'Family-related Issue', value: 'family' },
    { label: 'Vacation', value: 'vacation' },
    { label: 'Others', value: 'others' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Image source={Image3} style={styles.bc} />
      <View style={styles.heading}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Image2} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.header}>Leave Letter</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LeaveApproval', { email })}>
          <Text style={styles.button}>My Leaves</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
      <Text style={styles.dateInput}>To {recipient}</Text>
      {errors.recipient && <Text style={styles.error}>{errors.recipient}</Text>}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={leavePurposeData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Purpose of Leave"
        value={leavePurpose}
        onChange={item => {
          setLeavePurpose(item.value);
          clearError('leavePurpose');
        }}
        accessible={true}
        accessibilityLabel="purpose of leave"
      />
      {errors.leavePurpose && <Text style={styles.error}>{errors.leavePurpose}</Text>}
      <TextInput
        style={styles.dateInput}
        placeholder="Enter Start Date (DD-MM-YYYY)"
        value={startDate}
        accessible={true}
        keyboardType='numeric'
        accessibilityLabel="starting date"
        onChangeText={(text) => {
          setStartDate(text);
          clearError('startDate');
        }}
      />
      {errors.startDate && <Text style={styles.error}>{errors.startDate}</Text>}
      <TextInput
        style={styles.dateInput}
        placeholder="Enter End Date (DD-MM-YYYY)"
        value={endDate}
        accessible={true}
        keyboardType='numeric'
        accessibilityLabel="ending date"
        onChangeText={(text) => {
          setEndDate(text);
          clearError('endDate');
        }}
      />
      {errors.endDate && <Text style={styles.error}>{errors.endDate}</Text>}
      <TextInput
        style={styles.descriptionInput}
        placeholder="Description"
        multiline
        numberOfLines={18}
        value={description}
        accessible={true}
        accessibilityLabel="explain the reason"
        onChangeText={(text) => {
          setDescription(text);
          clearError('description');
        }}
      />
      {errors.description && <Text style={styles.error}>{errors.description}</Text>}

      <TouchableOpacity style={styles.sendButton} onPress={handleSendLeaveRequest}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} transparent={true} animationType='fade'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={Image1} style={styles.successImage} />
            <Text style={styles.modalText}>Leave letter request sent successfully</Text>
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
  bc:{
    height:'110%',
    width:'110%',
    position:'absolute',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  body:{
    backgroundColor:'white',
    borderRadius:30,
    height:'110%',
    padding:10,
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
    borderColor:'white',
    padding: 5,
    textAlign: 'center',
    left: 10,
    top: -5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  dropdown: {
    margin: 13,
    width: '100%',
    alignContent: 'center',
    marginLeft: 0,
    padding: 20,
    borderRadius: 10,
    borderBottomWidth:1,
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
    borderBottomWidth:1,
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
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
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

export default StudentLeave;
