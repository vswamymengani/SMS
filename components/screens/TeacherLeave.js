import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Modal, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';

const TeacherLeave = ({ route }) => {
  const navigation = useNavigation();
  const [employeeid, setEmployeeId] = useState('');
  const [profile, setProfile] = useState({});
  const [purpose, setPurpose] = useState('');
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const email = route.params.email;

  const validate = () => {
    const newErrors = {};
    if (!employeeid.trim()) {
      newErrors.employeeid = 'Please enter your employee ID';
    }
    if (!purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }
    if (!startdate.trim()) {
      newErrors.startdate = 'Enter start date';
    }
    if (!enddate.trim()) {
      newErrors.enddate = 'Enter end date';
    }
    if (!description.trim()) {
      newErrors.description = 'Explain your reason';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/teacherProfile?email=${email}`);
        setProfile(response.data);
        setEmployeeId(response.data.employeeid); // Set employeeid here after profile is set
      } catch (error) {
        setErrors({ general: "unable to provide employee id" });
      }
    };
    fetchLeaves();
  }, [email]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const Leave = async () => {
    if (validate()) {
      axios.post('http://10.0.2.2:3000/teacherLeave', {
        employeeid: profile.employeeid,
        email,
        purpose,
        startdate,
        enddate,
        description,
      })
        .then(response => {
          if (response.status === 200) {
            togglePopup();
          } else {
            console.error('Failed to send', response.status);
          }
        })
        .catch(error => {
          console.error('Axios error', error);
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
    <ScrollView style={styles.container}>
      <Image source={Image2} style={styles.bc} />
      <View style={styles.heading}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Image1} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.header}>Leave Letter</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TeacherLeaveApproval', { email })}>
          <Text style={styles.button}>My Leaves</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        <Text style={styles.headding}>Employee Id</Text>
        <Text style={styles.text}>{profile.employeeid}</Text>
        <Text style={styles.headding}>Purpose</Text>
        <TextInput
          style={styles.text}
          value={purpose}
          placeholder="Purpose of Leave"
          onChangeText={(text) => { setPurpose(text); clearError('purpose'); }}
        />
        {errors.purpose && <Text style={styles.error}>{errors.purpose}</Text>}
        <Text style={styles.headding}>Start Date</Text>
        <TextInput
          style={styles.text}
          value={startdate}
          keyboardType='numeric'
          placeholder="DD-MM-YYYY"
          onChangeText={(text) => { setStartDate(text); clearError('startdate'); }}
        />
        {errors.startdate && <Text style={styles.error}>{errors.startdate}</Text>}
        <Text style={styles.headding}>End Date</Text>
        <TextInput
          style={styles.text}
          value={enddate}
          keyboardType='numeric'
          placeholder="DD-MM-YYYY"
          onChangeText={(text) => { setEndDate(text); clearError('enddate'); }}
        />
        {errors.enddate && <Text style={styles.error}>{errors.enddate}</Text>}
        <Text style={styles.headding}>Description</Text>
        <TextInput
          style={styles.description}
          value={description}
          multiline
          numberOfLines={10}
          placeholder="Explain the Leave Purpose"
          onChangeText={(text) => { setDescription(text); clearError('description'); }}
        />
        {errors.description && <Text style={styles.error}>{errors.description}</Text>}

        <TouchableOpacity style={styles.sendButton} onPress={Leave}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        <Modal
          visible={showPopup}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            togglePopup();
          }}
        >
          <View style={styles.popup}>
            <Text style={styles.popupText}>Leave Letter Sent Successfully</Text>
            <TouchableOpacity
              onPress={() => {
                togglePopup();
                navigation.navigate('TeacherHomeScreen', { email });
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container1: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius:30,
  },
  bc:{
    height:'110%',
    width:'110%',
    position:'absolute',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    marginBottom: 60,
    padding: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  image: {
    height: 23,
    width: 18,
  },
  headding: {
    fontSize: 18,
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    color: "white",
    backgroundColor: "#3F1175",
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 15,
    padding: 5,
    textAlign: 'center',
    left: 10,
    top: -5,
  },
  text: {
    borderBottomWidth: 1,
    borderColor: '#3F1175',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    color: 'black',
    marginVertical: 5,
  },
  description: {
    borderWidth: 2,
    borderColor: '#3F1175',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: 'black',
    textAlignVertical: 'top',
    marginVertical: 10,
  },
  sendButton: {
    backgroundColor: '#3F1175',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  popup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default TeacherLeave;
