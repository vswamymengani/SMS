import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Image5 from '../assets/Component1.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loggedInEmail, setLoggedInEmail] = useState(null); // State to temporarily store the logged-in email

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

  const handleLogin = () => {
    if (validateForm()) {
      axios.post('http://10.0.2.2:3000/loginpage', { email, password })
        .then(response => {
          console.log('Server response:', response.data);  // Add logging to check the response
          if (response.data.status === 'Success') {
            setLoggedInEmail(email); // Save the email to state
            navigation.push('Homescreen');
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.error('Axios Error:', error);
          alert('Error logging in. Please try again later.');
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

  // Render different content based on whether user is logged in or not
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loggedInEmail ? ( // If logged in, show different content
        <View>
          <Text style={styles.logout}>Are you sure want to Logout,</Text>
          <Text style={styles.logout}>{loggedInEmail}!</Text>
          <TouchableOpacity onPress={() => setLoggedInEmail(null)}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : ( // If not logged in, show login form
        <>
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
              placeholder="Enter your email id" //change is happend here
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
          <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Form')}>
            <Text style={styles.signupText}>
              Don't have an account? <Text style={styles.signupLink}>Register Now</Text>
            </Text>
          </TouchableOpacity>
        </>
      )}
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
  logout:{
    fontSize:18,
    fontWeight:'bold',
    color:'black',
    borderColor:'blue',
    margin:'auto',

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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  forgotPassword: {
    marginTop: 10,
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#1DBBFF',
  },
  loginButton: {
    backgroundColor: '#1DBBFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 18,
    color: 'white',
  },
  signupText: {
    fontSize: 14,
    color: 'gray',
  },
  signupLink: {
    color: '#1DBBFF',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
