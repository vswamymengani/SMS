import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Profile = ({navigation, route }) => {
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
        <Image source={{ uri: profile.avatar || 'https://via.placeholder.com/150' }} style={styles.profileImage} />
        <Text style={styles.name}>{profile.fullname}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Profile Information</Text>
        <Text style={styles.infoText}>Class: {profile.className}</Text>
        <Text style={styles.infoText}>Section: {profile.section}</Text>
        <Text style={styles.infoText}>Roll No: {profile.rollno}</Text>
        <Text style={styles.infoText}>Date of Birth: {profile.dateofbirth}</Text>
        <Text style={styles.infoText}>Father's Name: {profile.fathername}</Text>
        <Text style={styles.infoText}>Father's Number: {profile.fatherno}</Text>
        <Text style={styles.infoText}>Mother's Name: {profile.mothername}</Text>
        <Text style={styles.infoText}>Mother's Number: {profile.motherno}</Text>
        <Text style={styles.infoText}>Admission ID: {profile.admissionid}</Text>
        <Text style={styles.infoText}>Present Address: {profile.presentaddress}</Text>
      </View>

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Homescreen')}>
        <Text style={styles.homeButtonText}>Back to Home</Text>
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    color: 'gray',
  },
  infoBox: {
    width: '100%',
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
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
