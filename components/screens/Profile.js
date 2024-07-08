//profile.js code

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Image1 from '../assets/Admin.png';

const Profile = ({ navigation, route }) => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const email = route.params.email; // Get the email from route params

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/profile?email=${email}`);
        setProfile(response.data);
      } catch (err) {
        setError('Failed to load profile data');
      }
    };
    if (email) {
      fetchProfile();
    } else {
      setError('No email provided');
    }
  }, [email]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileBox}>
        <Image source={Image1} style={styles.profileImage} />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      <View style={styles.infoTitle}>
          <Text style={styles.infoTitle}>Your  Information</Text>
      </View>
      <View style={styles.box}>
      <View style={styles.infoBox}>
        
        <Text style={styles.infoText}>Full Name:</Text>
        <Text style={styles.infoText}>Email</Text>
        <Text style={styles.infoText}>Class: </Text>
        <Text style={styles.infoText}>Section:</Text>
        <Text style={styles.infoText}>Roll No:</Text>
        <Text style={styles.infoText}>Date of Birth: </Text>
        <Text style={styles.infoText}>Father's Name: </Text>
        <Text style={styles.infoText}>Father's Number:</Text>
        <Text style={styles.infoText}>Mother's Name:</Text>
        <Text style={styles.infoText}>Mother's Number:</Text>
        <Text style={styles.infoText}>Admission ID:</Text>
        <Text style={styles.infoText2}>Present Address:</Text>
      </View>
      <View style={styles.infoBox}>
      <Text style={styles.infoText1}>{profile.fullname}</Text>
        <Text style={styles.infoText1}>{profile.email}</Text>
        <Text style={styles.infoText1}>{profile.className}</Text>
        <Text style={styles.infoText1}>{profile.section}</Text>
        <Text style={styles.infoText1}>{profile.rollno}</Text>
        <Text style={styles.infoText1}>{profile.dateofbirth}</Text>
        <Text style={styles.infoText1}>{profile.fathername}</Text>
        <Text style={styles.infoText1}>{profile.fatherno}</Text>
        <Text style={styles.infoText1}>{profile.mothername}</Text>
        <Text style={styles.infoText1}>{profile.motherno}</Text>
        <Text style={styles.infoText1}>{profile.admissionid}</Text>
        <Text style={styles.infoText2}>{profile.presentaddress}</Text>

      </View>
      </View>

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('ModifyInfo',{ email })}>
        <Text style={styles.homeButtonText}>Modify Info</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  profileBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  box:{
    flexDirection:'row',
    
  },
  infoBox: {
    width: '50%',
    marginTop: 10,
    borderWidth:2,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 20,
    marginBottom: 2,
    color:'black',
    borderBottomWidth:1,
    margin:1,
    textAlign:'center',
  },
  infoText1: {
    fontSize: 20,
    marginBottom: 2,
    color:'black',
    borderBottomWidth:1,
    margin:1,
    textAlign:'center',
  },
  infoText2: {
    fontSize: 20,
    marginBottom: 2,
    color:'black',
    margin:1,
    textAlign:'center',
  },
  homeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1DBBFF',
    borderRadius: 5,
  },
  homeButtonText: {
    fontSize: 18,
    color: 'white',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default Profile;