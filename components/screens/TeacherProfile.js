import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Image1 from '../assets/BackArrow.png';
import Image2 from '../assets/Admin.png';
import Image5 from '../assets/Component1.png';
import Image3 from '../assets/Edit.png';

const TeacherProfile = ({ navigation, route }) => {
  const [teacherprofile, setTeacherProfile] = useState({});
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
      <Image source={Image5} style={styles.image5} />
      <TouchableOpacity onPress={() => navigation.navigate('TeacherHomeScreen', { email })}>
        <Image source={Image1} style={styles.back} />
      </TouchableOpacity>
      <View style={styles.profileBox}>
        <Image source={Image2} style={styles.profileImage} />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{teacherprofile.fullname}</Text>
        <Text style={styles.details}>Email: {teacherprofile.email}</Text>
        <Text style={styles.details}>Date of Birth: {teacherprofile.dateofbirth}</Text>
        <Text style={styles.details}>Mobile Number: {teacherprofile.mobileNo}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name1}>Profecinal Info</Text>
      <Text style={styles.details}>Subject:{teacherprofile.subject}</Text>
      <Text style={styles.details}>Employee ID: {teacherprofile.employeeid}</Text>
      <Text style={styles.details}>Qualification: {teacherprofile.qualification}</Text>
      <Text style={styles.details}>Experience: {teacherprofile.experience}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name1}>Present Address: </Text>
        <Text style={styles.details}>{teacherprofile.presentAddress}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('RequestEdit', { email })}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
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
  info: {
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
  },
  name1: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 30,
    color: 'blue',
    fontWeight: 'bold',
  },
  details: {
    fontSize: 18,
    color: 'black',
    margin: 5,
  },
  editButton: {
    backgroundColor: '#1DBBFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  back: {
    height: 30,
    width: 30,
    left: -180,
  },
  image5: {
    width: 415,
    height: 250,
    position: 'absolute',
    top: 0,
  },
});

export default TeacherProfile;

