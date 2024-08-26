import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ModifyInfo = ({ route }) => {
  const [selectedField, setSelectedField] = useState(null);
  const [newData, setNewData] = useState('');
  const [repeatData, setRepeatData] = useState('');
  const [updated, setUpdated] = useState(false);
  const navigation = useNavigation();
  const { email } = route.params;

  const data = [
    { label: 'Full Name', value: 'fullname' },
    { label: 'Email', value: 'email' },
    { label: 'Class', value: 'className' },
    { label: 'Section', value: 'section' },
    { label: 'Roll No', value: 'rollno' },
    { label: 'Date of Birth', value: 'dateofbirth' },
    { label: 'Father\'s Name', value: 'fathername' },
    { label: 'Father\'s Number', value: 'fatherno' },
    { label: 'Mother\'s Name', value: 'mothername' },
    { label: 'Mother\'s Number', value: 'motherno' },
    { label: 'Admission ID', value: 'admissionid' },
    { label: 'Present Address', value: 'presentaddress' },
  ];

  const handleUpdate = async () => {
    if (newData === repeatData) {
      try {
        const response = await axios.post('http://18.60.190.183:3000/updateProfile', {
          email,
          field: selectedField,
          value: newData
        });

        if (response.data.success) {
          setUpdated(true);
        } else {
          Alert.alert('Update failed', 'Failed to update profile information.');
        }
      } catch (error) {
        Alert.alert('Update failed', 'An error occurred while updating profile information.');
      }
    } else {
      Alert.alert('Data mismatch', 'The data entered does not match. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Details</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select a field to update"
        value={selectedField}
        onChange={item => {
          setSelectedField(item.value);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Update Data"
        value={newData}
        onChangeText={setNewData}
      />
      <TextInput
        style={styles.input}
        placeholder="Repeat Data"
        value={repeatData}
        onChangeText={setRepeatData}
      />
      <Button  title="Update" onPress={handleUpdate} />
      <Modal
        transparent={true}
        visible={updated}
        onRequestClose={() => setUpdated(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('../assets/Verified.png')} style={styles.verifiedImage} />
            <Text style={styles.confirmationText}>Your info is updated</Text>
            <TouchableOpacity onPress={() => {
              setUpdated(false);
              navigation.navigate('Profile', { email });
            }}>
              <Text style={styles.okButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black',
  },
  dropdown: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    color:'black',
    borderRadius: 15,
    padding: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  verifiedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  confirmationText: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  okButton: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
    padding:5,
    borderRadius:10,
    backgroundColor:'blue',
  },
});

export default ModifyInfo;
