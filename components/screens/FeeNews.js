import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const FeeNews = ({ navigation, route }) => {
  const [totalFees, setTotalFees] = useState('');
  const [feeDetails, setFeeDetails] = useState([]);
  const [paidAmount, setPaidAmount] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const email = route.params.email;
  const [admissionid, setAdmissionid] = useState('');
  const [profile, setProfile] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch fee details from server
  useEffect(() => {
    if (admissionid) {
      axios.get(`http://18.60.190.183:3000/feedetails?admissionid=${admissionid}`)
        .then(response => {
          const data = response.data;
          setFeeDetails(data);
          setTotalFees(data.totalFees);
          setPaidAmount(data.paidAmount);
          setRemainingAmount(data.remainingAmount);
          setDueDate(data.dueDate);
        })
        .catch(error => {
          Alert.alert('Error', 'Fee details not updated');
        });
    }
  }, [admissionid]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://18.60.190.183:3000/studentProfile?email=${email}`);
        const profileData = response.data;
        setProfile(profileData);
        setAdmissionid(profileData.admissionid);
      } catch (err) {
        setErrors(prevErrors => ({ ...prevErrors, profile: 'Failed to load profile data' }));
      }
    };
    if (email) {
      fetchProfile();
    } else {
      setErrors(prevErrors => ({ ...prevErrors, email: 'No email provided' }));
    }
  }, [email]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Image source={require('../assets/BackImage.png')} style={styles.bc} />
      <View style={styles.header}>
        {/* Back arrow */}
        <TouchableOpacity onPress={() => navigation.navigate('Homescreen', { email })}>
          <Image source={require('../assets/Back_Arrow.png')} style={styles.backArrow} />
        </TouchableOpacity>
        {/* Header text */}
        <Text style={styles.headerText}>FeeNews</Text>
      </View>

      <View style={styles.body}>
      {/* Fee image */}
      <Image source={require('../assets/Fee.png')} style={styles.feeImage} />

      {/* Total fees */}
      <View style={styles.totalFeesContainer}>
        <Text style={styles.totalFeesText}>Total Fees</Text>
        <Text style={styles.totalFeesAmount}>{totalFees}</Text>
      </View>

      {/* Paid and remaining amount bars */}
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${(paidAmount / totalFees) * 100}%`, backgroundColor: 'blue' }]} />
        <View style={[styles.bar, { width: `${((totalFees - paidAmount) / totalFees) * 100}%`, backgroundColor: 'red' }]} />
      </View>

      {/* Amount paid */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Amount Paid</Text>
        <Text style={styles.amountValue}>{paidAmount}</Text>
      </View>

      {/* Remaining amount */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Remaining Amount</Text>
        <Text style={styles.amountValue}>{remainingAmount}</Text>
      </View>

      {/* Due date */}
      <View style={styles.dueDateContainer}>
        <Text style={styles.dueDateLabel}>Due Date</Text>
        <Text style={styles.dueDateValue}>{dueDate}</Text>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bc:{
    height:'110%',
    width:'110%',
    position:'absolute',
  },
  body:{
    backgroundColor:'white',
    height:"110%",
    borderRadius:30,
    padding:20,
  },
  header: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    marginBottom:40,
    marginTop:20,
    marginLeft:10,
  },
  backArrow: {
    width: 20,
    height: 23,
    marginRight: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  feeImage: {
    width: '100%',
    height: " 30%",
    marginTop: 20,
  },
  totalFeesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  totalFeesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  totalFeesAmount: {
    fontSize: 16,
  },
  barContainer: {
    flexDirection: 'row',
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  bar: {
    height: '100%',
    borderRadius: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    color: 'black',
  },
  amountLabel: {
    fontSize: 16,
    color: 'black',
  },
  amountValue: {
    fontSize: 16,
  },
  dueDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
    color: 'black',
  },
  dueDateLabel: {
    fontSize: 16,
    color: 'black',
  },
  dueDateValue: {
    fontSize: 16,
  },
});

export default FeeNews;
