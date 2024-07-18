import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import Image5 from '../assets/Component1.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';
import Image1 from '../assets/Verified.png';
import axios from 'axios';

const TeacherForm = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [subject, setSubject] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [dateofbirth, setDateOfBirth] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [employeeid, setemployeeid] = useState('');
  const [presentAddress, setPresentAddress] = useState('');
  const [errors, setErrors] = useState({});
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
      <View style={styles.imageContainer}>
        <Image source={Image5} style={styles.image5} />
        <View style={styles.overlayImages}>
          <Image source={Image6} style={styles.image6} />
          <Image source={Image3} style={styles.image3} />
        </View>
      </View>
      <View style={styles.formContainer}>
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
          onChangeText={(text) => { setemployeeid(text); clearError('employeeid'); }}
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
          onRequestClose={() => {
            togglePopup();
          }}
        >
          <View style={styles.popup}>
            <View style={styles.modalContainer} >
              <Image source={Image1} style={styles.successImage} />
              <Text style={styles.popupText}>Registration successful!</Text>
              <TouchableOpacity
                onPress={() => {
                  togglePopup(); // Close the popup
                  navigation.navigate('TeacherDetails'); // Navigate to the Login screen
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Close</Text>
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
    flexGrow: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image5: {
    width: "100%",
    height: 200,
  },
  overlayImages: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    top: 70,
  },
  image6: {
    width: 150,
    height: 150,
    left:75,
  },
  image3: {
    width: 130,
    height: 150,
    right:65,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    top: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'bold',
  },
  star: {
    color: 'red',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginTop: -5,
  },
  loginButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  popupText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TeacherForm;
