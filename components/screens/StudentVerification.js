import React, { useState } from "react";
import { ScrollView, View, Image, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Image1 from '../assets/BackArrow.png';

const StudentVerification = () => {
  const navigation = useNavigation();
  const [fullname, setFullname] = useState('');
  const [admissionid, setAdmissionid] = useState('');
  const [dateofbirth, setDateofbirth] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!fullname) newErrors.fullname = "Enter the Full Name";
    if (!admissionid) newErrors.admissionid = "Enter the correct Admission number";
    if (!dateofbirth) newErrors.dateofbirth = "Enter your date of birth";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = () => {
    if (validate()) {
      axios.post('http://10.0.2.2:3000/studentVerification', { admissionid, fullname, dateofbirth })
        .then(response => {
          console.log('Server response: ', response.data);
          if (response.data.status === 'Success') {
            navigation.push('StudentRegistration', { admissionid });
          } else {
            Alert.alert('Error', response.data.message);
          }
        })
        .catch(error => {
          console.error('Axios Error:', error);
          Alert.alert('Invalid', 'Enter the Valid Data.');
        });
    }
  };

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Image source={Image1} style={styles.image1} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Verification</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Full Name</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your Full Name"
          value={fullname}
          onChangeText={(text) => { setFullname(text); clearError('fullname'); }}
        />
        {errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Date Of Birth</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="DD-MM-YYYY"
          value={dateofbirth}
          keyboardType="numeric"
          onChangeText={(text) => { setDateofbirth(text); clearError('dateofbirth'); }}
        />
        {errors.dateofbirth && <Text style={styles.error}>{errors.dateofbirth}</Text>}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Admission Number</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your Admission Number"
          value={admissionid}
          keyboardType="numeric"
          onChangeText={(text) => { setAdmissionid(text); clearError('admissionid'); }}
        />
        {errors.admissionid && <Text style={styles.error}>{errors.admissionid}</Text>}
        <TouchableOpacity style={styles.loginButton} onPress={handleSend}>
          <Text style={styles.loginButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#3F1175',
    paddingVertical: 20,
  },
  image1: {
    height: 30,
    width: 30,
    right: 50,
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    right: 30,
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 30,
    top: 50,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#1DBBFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    color: 'white',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default StudentVerification;
