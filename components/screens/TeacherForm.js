import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import Image5 from '../assets/Component1.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Plus.png';
import Image4 from '../assets/BackArrow.png';
import axios from 'axios';

const TeacherForm = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [dateofbirth, setDateofbirth] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo ,setMobileNo] = useState('');
  const [employeeid, setEmployeeid] = useState('');
  const [experience, setExperience] = useState('');
  const [presentaddress, setPresentaddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const validateTeacherForm = () => {
    const newErrors = {};
    if (!fullname.trim()) {
      newErrors.fullname = 'Full Name is required';
    }
    if (!className.trim()) {
      newErrors.className = 'Class is required';
    }
    if (!section.trim()) {
      newErrors.section = 'Section is required';
    }
    if (!dateofbirth.trim()) {
      newErrors.dateofbirth = 'Date of Birth is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }
    if(!mobileNo.trim()){
      newErrors.mobileNo = 'Enter your Mobile number';
    }
    if (!employeeid.trim()) {
      newErrors.employeeid = 'Employee ID is required';
    }
    if (!experience.trim()) {
        newErrors.experience = 'Experience ID is required';
      }
    if (!presentaddress.trim()) {
      newErrors.presentaddress = 'Present Address is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    if (!confirmpassword.trim()) {
      newErrors.confirmpassword = 'Confirm Password is required';
    } else if (password !== confirmpassword) {
      newErrors.confirmpassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleTeacherRegister = async () => {
    if (validateTeacherForm()) {
      axios.post('http://10.0.2.2:3000/teacherregister', {
        fullname,
        className,
        section,
        dateofbirth,
        email,
        mobileNo,
        employeeid,
        experience,
        presentaddress,
        password,
        confirmpassword
      })
        .then(response => {
          if (response.status === 200) {
            // Successfully registered
            togglePopup(); // Show the popup
            // navigation.push('LoginScreen'); // Uncomment this line if you also want to navigate to LoginScreen
          } else {
            // Handle error responses from the server
            console.error('Failed to register:', response.status);
          }
        })
        .catch(error => {
          // Handle network errors
          console.error('Axios Error:', error);
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

  const LabelWithStar = ({ label }) => (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}<Text style={styles.star}>*</Text></Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Image5} style={styles.image5} />
      <Image source={Image6} style={styles.image6} />
      <Image source={Image3} style={styles.image3} />
      <View style={styles.header}>
        <Text style={styles.headerText}></Text>
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

        <LabelWithStar label="Date of Birth" />
        <TextInput
          style={styles.input}
          placeholder="dd/mm/yyyy"
          value={dateofbirth}
          onChangeText={(text) => { setDateofbirth(text); clearError('dateofbirth'); }}
        />
        {errors.dateofbirth && <Text style={styles.error}>{errors.dateofbirth}</Text>}

        <LabelWithStar label="Email" />
        <TextInput
          style={styles.input}
          placeholder="Enter your email...."
          value={email}
          onChangeText={(text) => { setEmail(text); clearError('email'); }}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        <LabelWithStar label="Mobile Number" />
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile nummber...."
          value={mobileNo}
          onChangeText={(text) => { setMobileNo(text); clearError('mobileNo'); }}
        />
        {errors.mobileNo && <Text style={styles.error}>{errors.mobileNo}</Text>}
        <LabelWithStar label="Employee Id" />
        <TextInput
          style={styles.input}
          placeholder="0123456"
          value={employeeid}
          onChangeText={(text) => { setEmployeeid(text); clearError('employeeid'); }}
        />
        {errors.employeeid && <Text style={styles.error}>{errors.employeeid}</Text>}

        <LabelWithStar label="Experience" />
        <TextInput
          style={styles.input}
          placeholder="If One Year Type 1"
          value={experience}
          onChangeText={(text) => { setExperience(text); clearError('experience'); }}
        />
        {errors.experience && <Text style={styles.error}>{errors.experience}</Text>}

        <LabelWithStar label="Present Address" />
        <TextInput
          style={styles.input}
          placeholder="H.No-12, Hyderabad"
          value={presentaddress}
          onChangeText={(text) => { setPresentaddress(text); clearError('presentaddress'); }}
        />
        {errors.presentaddress && <Text style={styles.error}>{errors.presentaddress}</Text>}

        <LabelWithStar label="Password" />
        <TextInput
          style={styles.input}
          placeholder="Enter your password...."
          secureTextEntry
          value={password}
          onChangeText={(text) => { setPassword(text); clearError('password'); }}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <LabelWithStar label="Confirm Password" />
        <TextInput
          style={styles.input}
          placeholder="Enter your password...."
          secureTextEntry
          value={confirmpassword}
          onChangeText={(text) => { setConfirmpassword(text); clearError('confirmpassword'); }}
        />
        {errors.confirmpassword && <Text style={styles.error}>{errors.confirmpassword}</Text>}
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleTeacherRegister}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity onPress={() => navigation.navigate('TeacherLogin')}>
        <Text style={styles.signupText}>Already have an account? Login</Text>
      </TouchableOpacity>

      <Modal
        visible={showPopup}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          togglePopup();
        }}
      >
        <View style={styles.popup}>
          <Text style={styles.popupText}>Registration successful!</Text>
          <TouchableOpacity
            onPress={() => {
              togglePopup(); // Close the popup
              navigation.navigate('TeacherLogin'); // Navigate to the Login screen
            }}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image5: {
    width: 415,
    height: 250,
    position: 'absolute',
    top: 0,
  },
  image3: {
    width: 100,
    height: 110,
    position: 'absolute',
    top: 140,
  },
  image6: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 90,
  },
  plus: {
    width: 100,
    height: 50,
    fontSize: 17,
    position: 'center',
    textAlign: 'center', // Center text
    color: '#28C2A0',
    top: 170,
  },
  header: {
    marginTop: 150,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  formContainer: {
    alignItems: 'flex-start', // Align content to the left
    marginTop: 150,
    width: '80%', // Set the width to control the form's width
  },
  labelContainer: {
    width: '100%',
  },
  label: {
    textAlign: 'left', // Adjusted to align text to the left
    marginBottom: 5,
    fontSize: 16,
    color: 'black',
  },
  star: {
    color: 'red', // Star color red
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#6C7278',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    width: '80%', // Adjusted to span full width
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 18,
    color: 'white',
  },
  orText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signupText: {
    color: 'blue',
    marginBottom: 30,
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
  popup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default TeacherForm;