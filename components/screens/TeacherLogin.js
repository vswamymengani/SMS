import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Image5 from '../assets/Component1.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';

const TeacherLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loggedInEmail, setLoggedInEmail] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleTeacherLogin = () => {
    if (validateForm()) {
      axios.post('http://10.0.2.2:3000/teacherlogin', {
        email,
        password,
      })
        .then(response => {
          if (response.status === 200) {
            setLoggedInEmail(email); // Save the email to state
            navigation.push('TeacherHomeScreen', { email }); // Pass the email to Homescreen

          } else {
            // Handle error responses from the server
            console.error('Failed to login:', response.status);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Image5} style={styles.image5} />
      <Image source={Image6} style={styles.image6} />
      <Image source={Image3} style={styles.image3} />
      <View style={styles.header}>
        <Text style={styles.headerText}></Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Username</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => { setEmail(text); clearError('email'); }}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Password</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => { setPassword(text); clearError('password'); }}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleTeacherLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('TeacherForm')}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Register Now</Text>
        </Text>
      </TouchableOpacity>
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
    width: 160,
    height: 170,
    position: 'absolute',
    top: 90,
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
    marginTop: 160,
    width: '80%',
  },
  labelContainer: {
    width: '100%',
  },
  label: {
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 16,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 0,
  },
  loginButton: {
    width: '60%',
    height: 50,
    backgroundColor: '#1DBBFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 0,
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 18,
    color: 'white',
  },
  forgotPassword: {
    marginBottom: 20,
    marginTop: 0,
  },
  forgotPasswordText: {
    color: '#231f24',
  },
  signupText: {
    color: 'black',
    marginBottom: 50,
    marginTop: 25,
    textAlign: 'center',
  },
  signupLink: {
    color: '#1DBBFF',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginTop: -20,
  },
});

export default TeacherLogin;
