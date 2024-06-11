import React, { useState } from 'react';
import { View, Text,Image, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Image1 from "../assets/Verified.png";
import Image2 from "../assets/BackArrow.png";
import Image3 from "../assets/Lock.png";


const CreateNewPassword = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleVerify = () => {
    // Add logic for verifying and setting the new password
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backarrow} onPress ={() => navigation.navigate("VerificationCode")}>
            <Image source={Image2} style={styles.backarrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Password</Text>
      </View>

      <Text style={styles.title}>Create a New Password</Text>

      <View style={styles.inputContainer}>
        <Image source={Image3} style={styles.backarrow} />
        <TextInput
          style={styles.input}
          placeholder="Enter your new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <View style={styles.inputContainer}>
      <Image source={Image3} style={styles.backarrow} />
        <TextInput
          style={styles.input}
          placeholder="Repeat the password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setIsRememberMe(!isRememberMe)}>
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Remember Me</Text>
      </View>

      <Text style={styles.progressText}>2 of 2</Text>
      <View style={styles.progressBar}>
        <View style={styles.progressCompleted}></View>

      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={Image1} style={styles.congratsIcon} />
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalText}>Password Reset Successful</Text>
            <Text style={styles.modalText}>You'll be redirected to the</Text>
            <Text style={styles.modalText}>login screen now.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  backarrow:{
    height:30,
    width:30,

  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    flex: 1,
    marginBottom:10,
    marginLeft: -24, // Adjust to center title with back arrow
  },
  title: {
    fontSize: 30,
    marginTop:20,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'lightgray',
    borderRadius: 35,
    padding: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 16,
  },
  progressText: {
    textAlign: 'right',
    fontSize: 14,
    marginBottom: 10,
  },
  progressBar: {
    flexDirection: 'row',
    height: 5,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,

  },
  progressCompleted: {
    flex: 1,
    backgroundColor: 'blue',
  },
  verifyButton: {
    backgroundColor: '#3F1175',
    padding: 20,
    borderRadius: 35,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  congratsIcon: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color:'black',
  },
  modalButton: {
    backgroundColor: '#3F1175',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreateNewPassword;
