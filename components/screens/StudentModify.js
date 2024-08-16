import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const StudentModify = ({ navigation }) => {
  const [admissionid, setadmissionid] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [errors, setErrors] = useState({});

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/studentModify/${admissionid}`);
      if (response.status === 200) {
        console.log(response.data); // Log the response data for debugging
        // Ensure rollNo is a string for TextInput
        const data = { ...response.data, rollNo: response.data.rollNo.toString() };
        setStudentData(data);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!studentData.fullname.trim()) newErrors.fullname = 'Full Name is required';
    if (!studentData.className.trim()) newErrors.className = 'Class is required';
    if (!studentData.section.trim()) newErrors.section = 'Section is required';
    if (!studentData.rollNo.trim()) newErrors.rollNo = 'Roll No is required';
    if (!studentData.dateofbirth.trim()) newErrors.dateofbirth ='Date of Birth is required';
    if (!studentData.fatherName.trim()) newErrors.fatherName = 'Father\'s Name is required';
    if (!studentData.fatherNo.trim()) newErrors.fatherNo = 'Father\'s Mobile Number is required';
    if (!studentData.motherName.trim()) newErrors.motherName = 'Mother\'s Name is required';
    if (!studentData.motherNo.trim()) newErrors.motherNo = 'Mother\'s Mobile Number is required';
    if (!studentData.email.trim()) newErrors.email ='email is required';
    if (!studentData.presentAddress.trim()) newErrors.presentAddress = 'Present Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleModify = async () => {
    if (validateForm()) {
      try {
        // Ensure rollNo is converted back to an integer before sending to the server
        const dataToSend = { ...studentData, rollNo: parseInt(studentData.rollNo, 10) };
        const response = await axios.put(`http://10.0.2.2:3000/studentModify/${admissionid}`, dataToSend);
        if (response.status === 200) {
          console.log('Data modified successfully');
          navigation.navigate('StudentDetails');
          Alert.alert("details is Modified Succesfully");
        } else {
          console.error('Failed to modify data:', response.status);
        }
      } catch (error) {
        console.error('Axios Error:', error);
      }
    }
  };

  const handleChange = (name, value) => {
    setStudentData({ ...studentData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <View>
        <TextInput
          style={styles.input}
          placeholder="Enter Admission ID"
          value={admissionid}
          onChangeText={(text) => setadmissionid(text)}
        />
        <Button title="Enter" onPress={fetchStudentData} />
        </View>
        {studentData && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={studentData.fullname}
              onChangeText={(text) => handleChange('fullname', text)}
            />
            {errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Class"
              value={studentData.className}
              onChangeText={(text) => handleChange('className', text)}
            />
            {errors.className && <Text style={styles.error}>{errors.className}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Section"
              value={studentData.section}
              onChangeText={(text) => handleChange('section', text)}
            />
            {errors.section && <Text style={styles.error}>{errors.section}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Roll No"
              value={studentData.rollNo}
              onChangeText={(text) => handleChange('rollNo', text)}
            />
            {errors.rollNo && <Text style={styles.error}>{errors.rollNo}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Date Of Birth"
              value={studentData.dateofbirth}
              onChangeText={(text) => handleChange('dateofbirth', text)}
            />
            {errors.dateofbirth && <Text style={styles.error}>{errors.dateofbirth}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Father's Name"
              value={studentData.fatherName}
              onChangeText={(text) => handleChange('fatherName', text)}
            />
            {errors.fatherName && <Text style={styles.error}>{errors.fatherName}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Father's Mobile Number"
              value={studentData.fatherNo}
              onChangeText={(text) => handleChange('fatherNo', text)}
            />
            {errors.fatherNo && <Text style={styles.error}>{errors.fatherNo}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Mother's Name"
              value={studentData.motherName}
              onChangeText={(text) => handleChange('motherName', text)}
            />
            {errors.motherName && <Text style={styles.error}>{errors.motherName}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Mother's Mobile Number"
              value={studentData.motherNo}
              onChangeText={(text) => handleChange('motherNo', text)}
            />
            {errors.motherNo && <Text style={styles.error}>{errors.motherNo}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email id"
              value={studentData.email}
              onChangeText={(text) => handleChange('email', text)}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Present Address"
              value={studentData.presentAddress}
              onChangeText={(text) => handleChange('presentAddress', text)}
            />
            {errors.presentAddress && <Text style={styles.error}>{errors.presentAddress}</Text>}

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
    margin:10,
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

export default StudentModify;
