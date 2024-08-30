import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const RequestEdit = () => {
  const [profile, setProfile] = useState({});
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  
  useEffect(() => {
    const { email } = route.params;
    setEmail(email);

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://18.60.190.183:3000/teacherprofile?email=${email}`);
        if (response.data) {
          const { id, created_at,employeeid,confirmPassword,photo,qualification, ...rest } = response.data;
          setProfile(rest);
        }
      } catch (err) {
        Alert.alert('Error', 'Failed to load profile data');
      }
    };

    if (email) {
      fetchProfile();
    }
  }, [route.params]);

  const handleUpdate = async () => {
    try {
      const response = await axios.post('http://18.60.190.183:3000/teacherupdate', {
        profile,
        email,
      });

      if (response.data.success) {
        Alert.alert('Success', 'Teacher details updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error updating teacher details:', error);
      Alert.alert('Error', 'Something unexpected has occurred: ' + error.message);
    }
  };

  const handleChange = (field, value) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(profile).map((key) => (
        <View key={key} style={styles.fieldContainer}>
          <Text style={styles.label}>{key}</Text>
          <TextInput
            style={styles.input}
            value={profile[key]}
            onChangeText={(value) => handleChange(key, value)}
            placeholder={`Enter new ${key}`}
          />
        </View>
      ))}
      <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  fieldContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black',
  },
  input: {
    height: 40,
    width: '100%',
    color:'black',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius:10,
    paddingHorizontal: 10,
  },
  updateButton: {
    backgroundColor: '#3F1175',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RequestEdit;
