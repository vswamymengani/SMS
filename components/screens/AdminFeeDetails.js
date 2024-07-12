import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const AdminFeeDetails = () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [totalFees, setTotalFees] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [admissionId, setAdmissionId] = useState('');

  const validate =() =>{
    const newErrors ={};
    if(!totalFees) newErrors.totalFees = "Enter the total fees";
    if(!paidAmount) newErrors.paidAmount = "Enter the Paid Amount";
    if(!remainingAmount) newErrors.remainingAmount = "Enter the Remaining Amount";
    if(!dueDate) newErrors.dueDate = "Enter the Due Date";
    if(!admissionId) newErrors.admissionId = "Enter the Admission number";
    setErrors(newErrors);
    
  }

  const handleSubmit = async () => {
    const feeDetails = {
      totalFees,
      paidAmount,
      remainingAmount,
      dueDate,
      admissionId
    };

    try {
      const response = await axios.post('http://10.0.2.2:3000/feenews', feeDetails);
      if (response.status === 200) {
        alert('Fee details submitted successfully');
      } else {
        alert('Failed to submit fee details');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting fee details');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Student Fee Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Admission ID"
        value={admissionId}
        onChangeText={setAdmissionId}
      />
      <TextInput
        style={styles.input}
        placeholder="Total Fees"
        keyboardType="decimal-pad"
        value={totalFees}
        onChangeText={setTotalFees}
      />
      <TextInput
        style={styles.input}
        placeholder="Paid Amount"
        keyboardType="decimal-pad"
        value={paidAmount}
        onChangeText={setPaidAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Remaining Amount"
        keyboardType="decimal-pad"
        value={remainingAmount}
        onChangeText={setRemainingAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AdminFeeDetails;
