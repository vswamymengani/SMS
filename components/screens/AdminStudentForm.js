import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

import Image5 from '../assets/Component1.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';
import Image1 from '../assets/Verified.png';

const AdminStudentForm = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
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
  const [photo, setPhoto] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:3000/classDetails');
        const classData = response.data;
        setClasses(classData);
        setClassOptions(classData.map(cls => ({ label: cls.className, value: cls.className })));
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    if (className) {
      const filteredSections = classes
        .filter(cls => cls.className === className)
        .flatMap(cls => cls.sections); // Assuming `sections` is an array in the `ClassDetails` table
      setSections(filteredSections);
      setSectionOptions(filteredSections.map(sec => ({ label: sec, value: sec })));
    } else {
      setSectionOptions([]);
    }
  }, [className, classes]);

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
    if (!admissionid.trim()) newErrors.admissionid = 'Enter the admission number';
    if (!presentAddress.trim()) newErrors.presentAddress = 'Present Address is required';
    if (!photo) newErrors.photo = 'Photo is required'; // Corrected error message
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
        const response = await axios.post('http://18.60.190.183:3000/adminStudentRegister', {
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
        <Text style={styles.photo}>Insert The Photo</Text>
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

        <LabelWithStar label="Class" />
        <Dropdown
          style={styles.dropdown}
          data={classOptions}
          labelField="label"
          valueField="value"
          placeholder="Select a class"
          value={className}
          onChange={item => setClassName(item.value)}
        />
        {errors.className && <Text style={styles.error}>{errors.className}</Text>}

        <LabelWithStar label="Section" />
        <Dropdown
          style={styles.dropdown}
          data={sectionOptions}
          labelField="label"
          valueField="value"
          placeholder="Select a section"
          value={section}
          onChange={item => setSection(item.value)}
          disabled={!className} // Disable if no class is selected
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
        >
          <View style={styles.popupContainer}>
            <View style={styles.popup}>
              <Text style={styles.popupText}>Student registered successfully</Text>
              <TouchableOpacity style={styles.okButton} onPress={() => { togglePopup(); navigation.goBack(); }}>
                <Text style={styles.okButtonText}>OK</Text>
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
  photo:{
    color:'red',
    top:190,
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
    top: 50,
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
  dropdown: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 7,
    borderRadius: 15,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    margin: 30,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#D5282C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default AdminStudentForm;
