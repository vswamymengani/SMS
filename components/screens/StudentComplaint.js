import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import Image1 from '../assets/Verified.png';

const StudentComplaint = () => {
  const navigation = useNavigation();
  const [recipient, setRecipient] = useState('');
  const [typeOfComplaint, setTypeOfComplaint] = useState('');
  const [reason, setReason] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSend = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.navigate('Homescreen');
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
        }}
      />
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
        }}
      />
      <TextInput
        style={styles.text}
        placeholder="Write the Complaint here"
        value={reason}
        onChangeText={setReason}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Explain your Complaint here"
        multiline
        numberOfLines={18}
        value={explanation}
        onChangeText={setExplanation}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
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

export default StudentComplaint;
