import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Image1 from '../assets/Admin.png';
import Image2 from '../assets/ProfileBc.png';
import Image3 from '../assets/Back_Arrow.png';
import Image4 from '../assets/Edit.png';

const TeacherProfile = ({ navigation, route }) => {
  const [teacherProfile, setTeacherProfile] = useState({});
  const [error, setError] = useState(null);
  const email = route.params.email;

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/teacherProfile?email=${email}`);
        setTeacherProfile(response.data);
      } catch (err) {
        setError('Failed to load profile data');
      }
    };
    if (email) {
      fetchTeacherProfile();
    } else {
      setError('No email provided');
    }
  }, [email]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Image2} style={styles.bc} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('TeacherHomeScreen', { email })}>
          <Image source={Image3} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.head}>Teacher Profile</Text>
        <TouchableOpacity 
            onPress={() => navigation.navigate('RequestEdit', { email })}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileBox}>
        <Image source={Image1} style={styles.profileImage} />
        {error && <Text style={styles.error}>{error}</Text>}
        <Text style={styles.name}>{teacherProfile.fullname}</Text>
        <Text style={styles.details1}>Subject: {teacherProfile.subject}</Text>
      </View>
      
      <View style={styles.info}>
        <View style={styles.body}>
          <View style={styles.topic}>
            <Text style={styles.details}>Email:</Text>
            <Text style={styles.details}>D.O.B:</Text>
            <Text style={styles.details}>Mobile Number:</Text>
            <Text style={styles.details}>Employee ID:</Text>
            <Text style={styles.details}>Qualification:</Text>
            <Text style={styles.details}>Experience:</Text>
          </View>
          <View style={styles.topic}>
            <Text style={styles.details2}>{teacherProfile.email}</Text>
            <Text style={styles.details2}>{teacherProfile.dateofbirth}</Text>
            <Text style={styles.details2}>{teacherProfile.mobileNo}</Text>
            <Text style={styles.details2}>{teacherProfile.employeeid}</Text>
            <Text style={styles.details2}>{teacherProfile.qualification}</Text>
            <Text style={styles.details2}>{teacherProfile.experience}</Text>
          </View>
        </View>
        <View style={styles.body}>
          
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  back: {
    height: 23,
    width: 20,
    marginLeft: 20,
    top: 10,
  },
  bc: {
    position: 'absolute',
    width: '110%',
  },
  head: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 30,
    top: 10,
  },
  profileBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 40,
    marginTop: 10,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 70,
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 10,
  },
  info: {
    width: '110%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 20,
    right: 10,
  },
  name: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  details1: {
    fontSize: 18,
    color: 'white',
    margin: 10,
    marginBottom: 20,
  },
  details: {
    fontSize: 20,
    color: 'black',
    margin: 10,
    padding: 5,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  details2: {
    fontSize: 20,
    marginBottom: 10,
    color: 'blue',
    margin: 10,
    right: 20,
    padding: 5,
    borderBottomWidth: 1,
  },
  body: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  editButton: {
    backgroundColor: 'blue',  // Adjust the color as needed
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',  // Text color
    fontSize: 16,    // Text size
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  topic: {
    flex: 1,
  },
});

export default TeacherProfile;
