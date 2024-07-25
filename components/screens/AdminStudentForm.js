import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import Image5 from '../assets/Component1.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';
import Image1 from '../assets/Verified.png';
import axios from 'axios';

const AdminStudentForm = ({ navigation }) => {
  const [fullname, setfullname] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [dateofbirth, setDateofbirth] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [fatherNo, setFatherNo] = useState('');
  const [motherName, setMotherName] = useState('');
  const [motherNo, setMotherNo] = useState('');
  const [admissionid, setAdmissionid] = useState('');
  const [presentAddress, setPresentAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!fullname.trim()) newErrors.fullname = 'Full Name is required';
    if (!className.trim()) newErrors.className = 'Class is required';
    if (!section.trim()) newErrors.section = 'Section is required';
    if (!rollNo.trim()) newErrors.rollNo = 'Roll No is required';
    if (!dateofbirth.trim()) newErrors.dateofbirth = 'Date of Birth is required';
    if (!fatherName.trim()) newErrors.fatherName = 'Father\'s Name is required';
    if (!fatherNo.trim()) newErrors.fatherNo = 'Father\'s Mobile Number is required';
    if (!motherName.trim()) newErrors.motherName = 'Mother\'s Name is required';
    if (!motherNo.trim()) newErrors.motherNo = 'Mother\'s Mobile Number is required';
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
        const response = await axios.post('http://10.0.2.2:3000/adminStudentRegister', {
          fullname,
          className,
          section,
          rollNo,
          dateofbirth,
          fatherName,
          fatherNo,
          motherName,
          motherNo,
          admissionid,
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
          onChangeText={(text) => { setfullname(text); clearError('fullname'); }}
        />
        {errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}

        <LabelWithStar label="Class" />
        <TextInput
          style={styles.input}
          placeholder="Enter your class...."
          value={className}
          onChangeText={(text) => { setClassName(text); clearError('className'); }}
        />
        {errors.className && <Text style={styles.error}>{errors.className}</Text>}

        <LabelWithStar label="Section" />
        <TextInput
          style={styles.input}
          placeholder="Enter your section...."
          value={section}
          onChangeText={(text) => { setSection(text); clearError('section'); }}
        />
        {errors.section && <Text style={styles.error}>{errors.section}</Text>}

        <LabelWithStar label="Roll No" />
        <TextInput
          style={styles.input}
          placeholder="Enter your roll no...."
          value={rollNo}
          keyboardType='numeric'
          onChangeText={(text) => { setRollNo(text); clearError('rollNo'); }}
        />
        {errors.rollNo && <Text style={styles.error}>{errors.rollNo}</Text>}

        <LabelWithStar label="Date of Birth" />
        <TextInput
          style={styles.input}
          placeholder="DD-MM-YYYY"
          value={dateofbirth}
          keyboardType='numeric'
          onChangeText={(text) => { setDateofbirth(text); clearError('dateofbirth'); }}
        />
        {errors.dateofbirth && <Text style={styles.error}>{errors.dateofbirth}</Text>}

        <LabelWithStar label="Father's Name" />
        <TextInput
          style={styles.input}
          placeholder="Enter your father's name...."
          value={fatherName}
          onChangeText={(text) => { setFatherName(text); clearError('fatherName'); }}
        />
        {errors.fatherName && <Text style={styles.error}>{errors.fatherName}</Text>}

        <LabelWithStar label="Father Mobile number" />
        <TextInput
          style={styles.input}
          placeholder="Enter your father's mobile number...."
          value={fatherNo}
          keyboardType='numeric'
          onChangeText={(text) => { setFatherNo(text); clearError('fatherNo'); }}
        />
        {errors.fatherNo && <Text style={styles.error}>{errors.fatherNo}</Text>}

        <LabelWithStar label="Mother's Name" />
        <TextInput
          style={styles.input}
          placeholder="Enter your mother's name...."
          value={motherName}
          onChangeText={(text) => { setMotherName(text); clearError('motherName'); }}
        />
        {errors.motherName && <Text style={styles.error}>{errors.motherName}</Text>}

        <LabelWithStar label="Mother Mobile number" />
        <TextInput
          style={styles.input}
          placeholder="Enter your mother's mobile number...."
          value={motherNo}
          keyboardType='numeric'
          onChangeText={(text) => { setMotherNo(text); clearError('motherNo'); }}
        />
        {errors.motherNo && <Text style={styles.error}>{errors.motherNo}</Text>}

        <LabelWithStar label="Admission Id" />
        <TextInput
          style={styles.input}
          placeholder="0123456"
          value={admissionid}
          keyboardType='numeric'
          onChangeText={(text) => { setAdmissionid(text); clearError('admissionid'); }}
        />
        {errors.admissionid && <Text style={styles.error}>{errors.admissionid}</Text>}

        <LabelWithStar label="Present Address" />
        <TextInput
          style={styles.input}
          placeholder="H.No-12, Hyderabad"
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
                  navigation.navigate('AdminStudentForm'); // Navigate to the Login screen
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
    top:150,
    width: 0, // Width of the Image5
    height: 0, // Height of the Image5
  },
  image6: {
    width: 150, // Adjust size as needed
    height: 150, // Adjust size as needed
  },
  image3: {
    width: 130, // Adjust size as needed
    height: 150, // Adjust size as needed
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    top:30,
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
  orText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#666666',
    fontSize: 16,
  },
  signupText: {
    textAlign: 'center',
    color: '#6200ee',
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
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  successImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  popupText: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminStudentForm;
