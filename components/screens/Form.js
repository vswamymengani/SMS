import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import Image5 from '../assets/Component1.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Plus.png';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

const Form = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [rollno, setRollno] = useState('');
  const [dateofbirth, setDateofbirth] = useState('');
  const [email, setEmail] = useState('');
  const [fathername, setFathername] = useState('');
  const [fatherno, setFatherno] = useState('');
  const [mothername, setMothername] = useState('');
  const [motherno, setMotherno] = useState('');
  const [admissionid, setAdmissionid] = useState('');
  const [presentaddress, setPresentaddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const validateForm = () => {
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
    if (!rollno.trim()) {
      newErrors.rollno = 'Roll No is required';
    }
    if (!dateofbirth.trim()) {
      newErrors.dateofbirth = 'Date of Birth is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!fathername.trim()) {
      newErrors.fathername = 'Father\'s Name is required';
    }
    if (!fatherno.trim()) {
      newErrors.fatherno = 'Father\'s Mobile Number is required';
    }
    if (!mothername.trim()) {
      newErrors.mothername = 'Mother\'s Name is required';
    }
    if (!motherno.trim()) {
      newErrors.motherno = 'Mother\'s Mobile Number is required';
    }
    if (!admissionid.trim()) {
      newErrors.admissionid = 'Admission ID is required';
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

  const handleRegister = async () => {
    if (validateForm()) {
      axios.post('http://10.0.2.2:3000/register', {
        fullname,
        class: className, // class is a reserved keyword, so we alias it to className
        section,
        rollno,
        dateofbirth,
        email,
        fathername,
        fatherno,
        mothername,
        motherno,
        admissionid,
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

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Image5} style={styles.image5} />
      <Image source={Image6} style={styles.image6} />
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.squareImage} />
        ) : (
          <TouchableOpacity style={styles.image3} onPress={selectImage}>
            <Image source={Image3} style={styles.squareImage2} />
          </TouchableOpacity>
        )}
      </View>
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

        <LabelWithStar label="Roll No" />
        <TextInput
          style={styles.input}
          placeholder="Enter your roll no...."
          value={rollno}
          onChangeText={(text) => { setRollno(text); clearError('rollno'); }}
        />
        {errors.rollno && <Text style={styles.error}>{errors.rollno}</Text>}

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

        <LabelWithStar label="Father's Name" />
        <TextInput
          style={styles.input}
          placeholder="Enter your father's name...."
          value={fathername}
          onChangeText={(text) => { setFathername(text); clearError('fathername'); }}
        />
        {errors.fathername && <Text style={styles.error}>{errors.fathername}</Text>}

        <LabelWithStar label="Father Mobile number" />
        <TextInput
          style={styles.input}
          placeholder="Enter your father's mobile number...."
          value={fatherno}
          onChangeText={(text) => { setFatherno(text); clearError('fatherno'); }}
        />
        {errors.fatherno && <Text style={styles.error}>{errors.fatherno}</Text>}

        <LabelWithStar label="Mother's Name" />
        <TextInput
          style={styles.input}
          placeholder="Enter your mother's name...."
          value={mothername}
          onChangeText={(text) => { setMothername(text); clearError('mothername'); }}
        />
        {errors.mothername && <Text style={styles.error}>{errors.mothername}</Text>}

        <LabelWithStar label="Mother Mobile number" />
        <TextInput
          style={styles.input}
          placeholder="Enter your mother's mobile number...."
          value={motherno}
          onChangeText={(text) => { setMotherno(text); clearError('motherno'); }}
        />
        {errors.motherno && <Text style={styles.error}>{errors.motherno}</Text>}

        <LabelWithStar label="Admission Id" />
        <TextInput
          style={styles.input}
          placeholder="0123456"
          value={admissionid}
          onChangeText={(text) => { setAdmissionid(text); clearError('admissionid'); }}
        />
        {errors.admissionid && <Text style={styles.error}>{errors.admissionid}</Text>}

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

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
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
              navigation.navigate('LoginScreen'); // Navigate to the Login screen
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
  squareImage: {
    width: 180,
    height: 180,
    top:100 ,
    borderRadius: 90, // Half of the width and height to make it round
  },
  squareImage2: {
    width: 80,
    height: 80,
    top: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image3: {
    width: 100,
    height: 100,
    top: 80,
    alignItems: 'center',
  },
  image6: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 90,
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
    alignItems: 'flex-start',
    marginTop: 150,
    width: '80%',
  },
  labelContainer: {
    width: '100%',
  },
  label: {
    textAlign: 'left',
    marginBottom: 5,
    fontSize: 16,
    color: 'black',
  },
  star: {
    color: 'red',
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
    width: '80%',
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

export default Form;
