import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const ModifyTeacherInfo = ({ navigation }) => {
  const [employeeid, setEmployeeId] = useState('');
  const [teacherData, setTeacherData] = useState(null);
  const [errors, setErrors] = useState({});

  const fetchTeacherData = async () => {
    try {
      const response = await axios.get(`http://18.60.190.183:3000/teacherModify/${employeeid}`);
      if (response.status === 200) {
        console.log(response.data); // Log the response data for debugging
        setTeacherData(response.data);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!teacherData.fullname.trim()) newErrors.fullname = 'Full Name is required';
    if (!teacherData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!teacherData.qualification.trim()) newErrors.qualification = 'Qualification is required';
    if (!teacherData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!teacherData.dateofbirth.trim()) newErrors.dateofbirth = 'Date of Birth is required';
    if (!teacherData.mobileNo.trim()) newErrors.mobileNo = 'Mobile Number is required';
    if (!teacherData.presentAddress.trim()) newErrors.presentAddress = 'Present Address is required';
    if (!teacherData.email.trim()) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleModify = async () => {
    if (validateForm()) {
      try {
        const response = await axios.put(`http://18.60.190.183:3000/teacherModify/${employeeid}`, teacherData);
        if (response.status === 200) {
          console.log('Data modified successfully');
          navigation.navigate('TeacherDetails');
          Alert.alert("Details Modified Successfully");
        } else {
          console.error('Failed to modify data:', response.status);
        }
      } catch (error) {
        console.error('Axios Error:', error);
      }
    }
  };

  const handleChange = (name, value) => {
    setTeacherData({ ...teacherData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Employee ID"
          value={employeeid}
          onChangeText={(text) => setEmployeeId(text)}
        />
        <Button title="Fetch Data" onPress={fetchTeacherData} />
        {teacherData && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={teacherData.fullname}
              onChangeText={(text) => handleChange('fullname', text)}
            />
            {errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Subject"
              value={teacherData.subject}
              onChangeText={(text) => handleChange('subject', text)}
            />
            {errors.subject && <Text style={styles.error}>{errors.subject}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Qualification"
              value={teacherData.qualification}
              onChangeText={(text) => handleChange('qualification', text)}
            />
            {errors.qualification && <Text style={styles.error}>{errors.qualification}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Experience"
              value={teacherData.experience}
              onChangeText={(text) => handleChange('experience', text)}
            />
            {errors.experience && <Text style={styles.error}>{errors.experience}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={teacherData.dateofbirth}
              onChangeText={(text) => handleChange('dateofbirth', text)}
            />
            {errors.dateofbirth && <Text style={styles.error}>{errors.dateofbirth}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={teacherData.mobileNo}
              onChangeText={(text) => handleChange('mobileNo', text)}
            />
            {errors.mobileNo && <Text style={styles.error}>{errors.mobileNo}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Present Address"
              value={teacherData.presentAddress}
              onChangeText={(text) => handleChange('presentAddress', text)}
            />
            {errors.presentAddress && <Text style={styles.error}>{errors.presentAddress}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={teacherData.email}
              onChangeText={(text) => handleChange('email', text)}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TouchableOpacity style={styles.modifyButton} onPress={handleModify}>
              <Text style={styles.modifyButtonText}>Modify</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  input: {
    height: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  modifyButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  },
  modifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModifyTeacherInfo;
