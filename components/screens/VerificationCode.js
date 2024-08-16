import React, { useState } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Image1 from '../assets/BackArrow.png';
import Image2 from '../assets/Verified.png'; // Assuming Verified.png is imported correctly

const VerificationCode = ({ route }) => {
  const navigation = useNavigation();
  const admissionid = route.params.admissionid;
  const [errors, setErrors] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!password) newErrors.password = "Enter the Password";
    if (!confirmPassword) newErrors.confirmPassword = "Repeat the password";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePopup = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSend = async () => {
    if (validate()) {
      axios
        .post(`http://10.0.2.2:3000/changePassword?admissionid=${admissionid}`, {
          password,
          confirmPassword,
        })
        .then((response) => {
          if (response.status === 200) {
            togglePopup();
          } else {
            console.error("Failed to Change the Password:", response.status);
          }
        })
        .catch((error) => {
          console.error("Axios error:", error);
        });
    }
  };

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() =>navigation.navigate('ForgotPassword')} >
            <Image source={Image1} style={styles.headerImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Password</Text>
        <TextInput
          placeholder="Enter Your Password"
          value={password}
          style={styles.input}
          onChangeText={(text) => {
            setPassword(text);
            clearError("password");
          }}
          secureTextEntry={true}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        <Text style={styles.text}>Confirm Password</Text>
        <TextInput
          placeholder="Repeat your password"
          value={confirmPassword}
          style={styles.input}
          onChangeText={(text) => {
            setConfirmPassword(text);
            clearError("confirmPassword");
          }}
          secureTextEntry={true}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSend} style={styles.button}>
                <Text style={styles.buttonText}>Modify</Text>
            </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          togglePopup();
        }}
      >
        <View style={styles.modalContainer}>
          <Image source={Image2} style={styles.successImage} />
          <Text style={styles.modalText}>Password Change successful!</Text>
          <TouchableOpacity
            onPress={() => {
              togglePopup(); // Close the popup
              navigation.navigate("LoginScreen"); // Navigate to the Login screen
            }}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F1175',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    top:20,
    marginBottom: 40,
  },
  headerImage: {
    height: 30,
    width: 30,
    marginRight: 50,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color:'white',
  },
  formContainer: {
    marginBottom: 20,
    justifyContent:'center',
    backgroundColor:'white',
    padding:30,
    borderRadius:30,
    top:100,
  },
  text:{
    fontSize:16,
    color:'black',
    fontWeight:'bold',
    margin:15,
    right:20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  successImage: {
    height: 50,
    width: 50,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default VerificationCode;
