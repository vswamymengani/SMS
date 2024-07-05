import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const RequestEdit = () => {
  const [value, setValue] = useState('');
  const [fieldToEdit, setFieldToEdit] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  
  useEffect(() => {
    const { field, email } = route.params;
    setFieldToEdit(field);
    setEmail(email);

    const fetchCurrentValue = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/teacherprofile?email=${email}`);
        if (response.data) {
          setValue(response.data[field]);
        }
      } catch (err) {
        Alert.alert('Error', 'Failed to load current value');
      }
    };

    if (email && field) {
      fetchCurrentValue();
    }
  }, [route.params]);

  const handleUpdate = async () => {
    if (!value) {
      Alert.alert('Validation Error', 'Value cannot be empty');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:3000/teacherupdate', {
        field: fieldToEdit,
        value: value,
        email: email,
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Update {fieldToEdit}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={`Enter new Details`}
      />
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
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
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
