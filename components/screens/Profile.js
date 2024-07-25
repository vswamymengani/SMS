
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Image1 from '../assets/Admin.png';
import Image2 from '../assets/ProfileBc.png';
import Image3 from '../assets/Back_Arrow.png';

const Profile = ({ navigation, route }) => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const email = route.params.email; // Get the email from route params

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/studentProfile?email=${email}`);
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
      <Image source={Image2} style={styles.bc} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() =>navigation.navigate('Homescreen' , {email})}>
          <Image source={Image3} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.head}>Profile</Text>
      </View>
      <View style={styles.profileBox}>
        <Image source={Image1} style={styles.profileImage} />
        <Text style={styles.name}>{profile.fullname}</Text>
        <Text style={styles.details1}>Class: {profile.className} {profile.section}</Text>
      </View>
      
    
      <View style={styles.info}>
        <View style={styles.body}>
          <View style={styles.topic}>
          <Text style={styles.details}>D.O.B:</Text>
          <Text style={styles.details}>Roll Number: </Text>
          <Text style={styles.details}>Admission Number:            </Text>
          <Text style={styles.details}>Father Name:</Text>
          <Text style={styles.details}>Father mobile:</Text>
          <Text style={styles.details}>Mother Name:</Text>
          <Text style={styles.details}>Mother mobile:</Text>
          <Text style={styles.details}>Present Address:</Text>
          </View>
          <View style={styles.topic}>
          <Text style={styles.details2}>{profile.dateofbirth}</Text>
          <Text style={styles.details2}>{profile.rollNo}</Text>
          <Text style={styles.details2}>{profile.admissionid}</Text>
          <Text style={styles.details2}>{profile.fatherName}</Text>
          <Text style={styles.details2}>{profile.fatherNo}</Text>
          <Text style={styles.details2}>{profile.motherName}</Text>
          <Text style={styles.details2}>{profile.motherNo}</Text>
          <Text style={styles.details2}>{profile.presentAddress}</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  back:{
    height:23,
    width:20,
    marginLeft:20,
    top:10,
  },
  bc:{
    position:'absolute',
    width:'110%',
  },
  head:{
    fontSize:20,
    color:'white',
    fontWeight:'bold',
    marginLeft:30,
    top:10,
  },
  profileBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 40,
    marginTop:10,  
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 70,
    borderColor:'white',
    borderWidth:2,
    marginBottom: 10,
  }, 
  info:{
    width:'100%',
    backgroundColor:'white',
    alignItems:'center',
    borderRadius:30,
    marginBottom:20,
  },
  name:{
    fontSize:30,
    color:'white',
    fontWeight:'bold',
  },
  details:{
    fontSize:20,
    color:'black',
    margin:10,
    padding:5,
    borderBottomWidth:1,
    marginBottom:10,
  },
  details2:{
    fontSize:20,
    marginBottom:10,
    color:'blue',
    margin:10,
    right:20,
    padding:5,
    borderBottomWidth:1,
  },
  details1:{
    fontSize:18,
    color:'white',
    margin:10,
    marginBottom:20,   
  },
  body:{
    justifyContent:'space-between',
    flexDirection:'row',
    width:'100%',
    height:'100%',
    padding:20,
  },
});

export default Profile;