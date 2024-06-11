import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VerificationCode = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(['', '', '', '']);

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleVerify = () => {
    // Add verification logic here
    navigation.navigate('CreateNewPassword');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Forgot Password</Text>
      </View>
      <Text style={styles.verifyTitle}>Verify</Text>
      <Text style={styles.instructionText}>Please enter the code we sent to you</Text>

      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleCodeChange(index, value)}
          />
        ))}
      </View>

      <Text style={styles.resendText}>Didn't receive the code?</Text>
      <Text style={styles.resendLink}>Resend code</Text>
      <Text style={styles.rightside}>1 of 2</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressActive}></View>
          <View style={styles.progressInactive}></View>
        </View>
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent:'center',
    color:'black',
    flex: 1, 
    marginBottom:20,
  },
  verifyTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionText: {
    textAlign: 'center',
    color:'black',
    marginBottom: 25,
    fontSize: 16,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  codeInput: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
  },
  resendText: {
    textAlign: 'center',
    fontSize: 14,
    color:'black',
  },
  rightside:{
    textAlign:"right",
    fontSize:17,
    color:'black',

  },
  resendLink: {
    textAlign: 'center',
    fontSize: 14,
    color: 'blue',
    marginBottom: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
  },
  progressBar: {
    flex: 1,
    flexDirection: 'row',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginLeft: 10,
  },
  progressActive: {
    flex: 1,
    backgroundColor: 'blue',
  },
  progressInactive: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  verifyButton: {
    backgroundColor: '#3F1175',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VerificationCode;
