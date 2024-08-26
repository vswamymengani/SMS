import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
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
      const response = await axios.post('http://18.60.190.183:3000/feenews', feeDetails);
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
      <Text style={styles.label}>Admission No</Text>
      <TextInput
        style={styles.input}
        placeholder="Admission ID"
        value={admissionId}
        onChangeText={setAdmissionId}
      />
      <Text style={styles.label}>Toatl Fee</Text>
      <TextInput
        style={styles.input}
        placeholder="Total Fees"
        keyboardType="decimal-pad"
        value={totalFees}
        onChangeText={setTotalFees}
      />
      <Text style={styles.label}>Paid Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Paid Amount"
        keyboardType="decimal-pad"
        value={paidAmount}
        onChangeText={setPaidAmount}
      />
      <Text style={styles.label}>Remaining Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Remaining Amount"
        keyboardType="decimal-pad"
        value={remainingAmount}
        onChangeText={setRemainingAmount}
      />
      <Text style={styles.label}>Due date</Text>
      <TextInput
        style={styles.input}
        placeholder="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
      />
      <View style={styles.buttonbox}>
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.button}>Submit</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#3F1175',
    borderWidth: 2,
    fontSize:16,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius:20,
  },
  label:{
    fontSize:18,
    color:'black',
    fontWeight:'bold',
    margin:5,
  },
  button:{
    backgroundColor:'#3F1175',
    width:100,
    padding:10,
    margin:20,
    color:'white',
    textAlign:'center',
    fontSize:16,
    borderRadius:20,
  },
  buttonbox:{
    
    alignItems:'center',
  }
});

export default AdminFeeDetails;
