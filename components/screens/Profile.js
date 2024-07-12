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
      
    
      <View style={styles.info}>
        <Text style={styles.name}>{profile.fullname}</Text>
        <Text style={styles.details}>Class: {profile.className}</Text>
        <Text style={styles.details}>Section: {profile.section}</Text>
        <Text style={styles.details}>D.O.B: {profile.dateofbirth}</Text>
        <Text style={styles.details}>Roll Number: {profile.rollno}</Text>
        <Text style={styles.details}>Admission Number: {profile.admissionid}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.parentsBox}>
        <Text style={styles.parentsName}>Father Name:</Text>
        </View>
        <View style={styles.parentsBox}>
        <Text style={styles.parentsName}>{profile.fathername}</Text>
        </View>
        <View style={styles.parentsBox}>
        <Text style={styles.parentsName}>Father mobile:</Text>
        </View>
        <View style={styles.parentsBox}>
        <Text style={styles.parentsName}>{profile.fatherno}</Text>
        </View>
        <View style={styles.parentsBox}>
        <Text style={styles.parentsName}>Mother Name:</Text>
        </View>
        <View style={styles.parentsBox}>
        <Text style={styles.parentsName}>{profile.mothername}</Text>
        </View>
        <View style={styles.parentsBox}>
        
        <Text style={styles.parentsName}>Mother mobile:</Text>
        </View>
        <View style={styles.parentsBox}>
        <Text style={styles.parentsName}>{profile.motherno}</Text>
        </View>
      </View>
      <View style={styles.address}>
        <Text style={styles.addressTitle}>Present Address:</Text>
        <Text style={styles.addressName}>{profile.presentaddress}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 70,
    marginBottom: 10,
  }, 
  info:{
    width:'90%',
    backgroundColor:'white',
    alignItems:'center',
    borderRadius:30,
    padding:20,
    marginBottom:20,
  },
  name:{
    fontSize:30,
    color:'blue',
    fontWeight:'bold',
  },
  details:{
    fontSize:18,
    color:'orange',
    margin:5,
  },
  parentsBox:{
    justifyContent:'space-between',
    flexDirection:'row',
  },
  parents:{
    backgroundColor:'red',
    borderRadius:20,
    padding:15,
    margin:10,
    marginBottom:20,
    alignItems:'center',
  },
  parentsName:{
    fontSize:20,
    color:'black',
    margin:5,
  },
  address:{
    width:"100%",
    backgroundColor:'yellow',
    alignItems:'center',
    borderRadius:20,
    padding:20,
  },
  addressTitle:{
    fontSize:20,
    color:'blue',
  },
  addressName:{
    fontSize:20,
    color:'blue',
  },
});

export default Profile;