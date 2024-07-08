import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet ,TouchableOpacity,alert} from 'react-native';
import axios from 'axios';

const FeeNews = ({ navigation,route }) => {
  const [totalFees, setTotalFees] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const email = route.params;

  // Fetch fee details from server
  useEffect(() => {
    axios.get('http://10.0.2.2:3000/feedetails?email=${email}')
      .then(response => {
        const { totalFees, paidAmount, dueDate } = response.data;
        
      })
      .catch(error => {
        // console.error('Error fetching fee details:', error);
        alert.alert('fee details not updated');
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back arrow */}
        <TouchableOpacity onPress={() => navigation.navigate('Homescreen',{ email})}>
          <Image source={require('../assets/BackArrow.png')} style={styles.backArrow} />
        </TouchableOpacity>
        {/* Header text */}
        <Text style={styles.headerText}>FeeNews</Text>
      </View>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    width:'auto',
    fontWeight: 'bold',
    color:'black',
  },
  feeImage: {
    width: '100%',
    height: 250,
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
    color:'black',
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
    marginBottom:20,
  },
  bar: {
    height: '100%',
    borderRadius: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    color:'black',
  },
  amountLabel: {
    fontSize: 16,
    color:'black',
  },
  amountValue: {
    fontSize: 16,
  },
  dueDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
    color:'black',
  },
  dueDateLabel: {
    fontSize: 16,
    color:'black',
  },
  dueDateValue: {
    fontSize: 16,
  },
});

export default FeeNews;
