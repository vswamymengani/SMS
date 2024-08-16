import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

import Image5 from '../assets/Component1.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';
import Image1 from '../assets/Verified.png';

const TeacherForm = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [subject, setSubject] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [dateofbirth, setDateOfBirth] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [employeeid, setEmployeeid] = useState('');
  const [presentAddress, setPresentAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!fullname.trim()) newErrors.fullname = 'Full Name is required';
    if (!subject.trim()) newErrors.subject = 'Subject is required';
    if (!qualification.trim()) newErrors.qualification = 'Qualification is required';
    if (!experience.trim()) newErrors.experience = 'Experience is required';
    if (!dateofbirth.trim()) newErrors.dateofbirth = 'Date of Birth is required';
    if (!mobileNo.trim()) newErrors.mobileNo = 'Mobile Number is required';
    if (!employeeid.trim()) newErrors.employeeid = 'Employee ID is required';
    if (!presentAddress.trim()) newErrors.presentAddress = 'Present Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const selectPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://10.0.2.2:3000/AdminTeacherRegister', {
          fullname,
          subject,
          qualification,
          experience,
          dateofbirth,
          mobileNo,
          employeeid,
          presentAddress,
          photo,
        });
        if (response.status === 200) {
          togglePopup(); // Show the popup
        } else {
          console.error('Failed to register:', response.status);
        }
      } catch (error) {
        console.error('Axios Error:', error);
      }
    }
  };

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const LabelWithStar = ({ label }) => (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}<Text style={styles.star}>*</Text></Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Image5} style={styles.image5} />
      <View style={styles.imageContainer}>
        <View style={styles.overlayImages}>
          <Image source={Image6} style={styles.image6} />
          <TouchableOpacity onPress={selectPhoto}>
            <Image source={photo ? { uri: photo } : Image3} style={styles.image3} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.formContainer}>
        <LabelWithStar label="Full Name" />
        <TextInput
          style={styles.input}
          placeholder="Enter your fullname...."
          value={fullname}
          onChangeText={(text) => { setFullname(text); clearError('fullname'); }}
        />
        {errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}

        <LabelWithStar label="Subject" />
        <TextInput
          style={styles.input}
          placeholder="Enter your subject...."
          value={subject}
          onChangeText={(text) => { setSubject(text); clearError('subject'); }}
        />
        {errors.subject && <Text style={styles.error}>{errors.subject}</Text>}

        <LabelWithStar label="Qualification" />
        <TextInput
          style={styles.input}
          placeholder="Enter your qualification...."
          value={qualification}
          onChangeText={(text) => { setQualification(text); clearError('qualification'); }}
        />
        {errors.qualification && <Text style={styles.error}>{errors.qualification}</Text>}

        <LabelWithStar label="Experience" />
        <TextInput
          style={styles.input}
          placeholder="Enter your experience in years...."
          value={experience}
          onChangeText={(text) => { setExperience(text); clearError('experience'); }}
        />
        {errors.experience && <Text style={styles.error}>{errors.experience}</Text>}

        <LabelWithStar label="Date of Birth" />
        <TextInput
          style={styles.input}
          placeholder="dd/mm/yyyy"
          value={dateofbirth}
          onChangeText={(text) => { setDateOfBirth(text); clearError('dateofbirth'); }}
        />
        {errors.dateofbirth && <Text style={styles.error}>{errors.dateofbirth}</Text>}

        <LabelWithStar label="Mobile Number" />
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number...."
          value={mobileNo}
          onChangeText={(text) => { setMobileNo(text); clearError('mobileNo'); }}
        />
        {errors.mobileNo && <Text style={styles.error}>{errors.mobileNo}</Text>}

        <LabelWithStar label="Employee ID" />
        <TextInput
          style={styles.input}
          placeholder="Enter your employee ID...."
          value={employeeid}
          onChangeText={(text) => { setEmployeeid(text); clearError('employeeid'); }}
        />
        {errors.employeeid && <Text style={styles.error}>{errors.employeeid}</Text>}

        <LabelWithStar label="Present Address" />
        <TextInput
          style={styles.input}
          placeholder="Enter your present address...."
          value={presentAddress}
          onChangeText={(text) => { setPresentAddress(text); clearError('presentAddress'); }}
        />
        {errors.presentAddress && <Text style={styles.error}>{errors.presentAddress}</Text>}

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>

        <Modal
          visible={showPopup}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.popupContainer}>
            <View style={styles.popup}>
              <Image source={Image1} style={styles.successImage} />
              <Text style={styles.popupText}>Registration successful!</Text>
              <TouchableOpacity
                onPress={() => {
                  togglePopup(); // Close the popup
                  navigation.navigate('TeacherDetails'); // Navigate to the TeacherDetails screen
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  image5: {
    width: '100%',
    height: 150,
  },
  overlayImages: {
    position: 'absolute',
    alignItems: 'center',
  },
  image6: {
    top: 170,
    width: 160,
    height: 160,
  },
  image3: {
    width: 150,
    top: 15,
    borderRadius: 70,
    height: 150,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 1,
    top: 40,
    padding: 20,
  },
  labelContainer: {
    marginBottom: 5,
  },
  label: {
    fontSize: 15,
    color: 'black',
  },
  star: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 7,
    borderRadius: 15,
    marginBottom: 10,
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#D5282C',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
  },
  successImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#D5282C',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TeacherForm;
