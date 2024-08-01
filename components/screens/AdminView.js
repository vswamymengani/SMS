import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import Image5 from '../assets/Component1.png';
import Image2 from '../assets/Menu.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';
import Image7 from '../assets/Student1.png';
import Image8 from '../assets/Teacher1.png';
import Image9 from '../assets/Admin.png';
import Image10 from '../assets/profilepic.png';
import Image1 from '../assets/Menuicon.png';
import Image4 from '../assets/timetable1.png';
import Image20 from '../assets/library.png';

const AdminView = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(true);
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);

  // Fetch teacher count
  useEffect(() => {
    axios.get('http://10.0.2.2:3000/teacherCount')
      .then(response => {
        if (response.status === 200) {
          setTeacherCount(response.data.Teacher_Count);
        } else {
          console.error('Failed to fetch teacher count:', response.status);
        }
      })
      .catch(error => {
        console.error('Error fetching teacher count:', error);
      });
  }, []);

  // Fetch student count
  useEffect(() => {
    axios.get('http://10.0.2.2:3000/studentCount')
      .then(response => {
        if (response.status === 200) {
          setStudentCount(response.data.Student_Count);
        } else {
          console.error('Failed to fetch student count:', response.status);
        }
      })
      .catch(error => {
        console.error('Error fetching student count:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {profileVisible && (
        <TouchableOpacity style={styles.profileIcon} onPress={() => setProfileVisible(false)}>
          {/* Add any profile image or icon here if needed */}
        </TouchableOpacity>
      )}
      <Image source={Image5} style={styles.image5} />
      <TouchableOpacity style={styles.menuIcon} onPress={() => setModalVisible(true)}>
        <Image source={Image2} style={styles.image2} />
      </TouchableOpacity>
      <Image source={Image6} style={styles.image6} />
      <Image source={Image3} style={styles.image3} />
      <View style={styles.squareRow}>
        <TouchableOpacity style={styles.square} onPress={() => navigation.navigate('AdminStudentHomeScreen')}>
          <Image source={Image7} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Total {studentCount} Students</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.square} onPress={() => navigation.navigate('AdminTeacherHomeScreen')}>
          <Image source={Image8} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Total {teacherCount} Teachers</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.square} onPress={() => navigation.navigate('ClassesTable')}>
          <Image source={Image9} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Parent Details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.squareRow}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminTimeTable')}>
            <View style={styles.square}>
              <Image source={Image4} style={styles.squareImage} />
              <Text>Timetable</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate('AdminLibrary')}>
          <View style={styles.square}>
            <Image source={Image20} style={styles.squareImage} />
            <Text style={styles.loginButtonText}>Library</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <Modal
        animationType="slide-left"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalMenuIcon} onPress={() => setModalVisible(false)}>
              <Image source={Image1} style={styles.image1} />
            </TouchableOpacity>
            <Image source={Image10} style={styles.image10} />
            <TouchableOpacity onPress={() => { setModalVisible(false); setProfileVisible(true); navigation.navigate('Homescreen'); }}>
              <Text style={styles.modalText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(false); setProfileVisible(true); navigation.navigate('Settings'); }}>
              <Text style={styles.modalText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(false); setProfileVisible(true); navigation.navigate('AdminLogin'); }}>
              <Text style={styles.modalText}>Logout</Text>
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
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image5: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
  },
  menuIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  profileIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  image2: {
    width: 30,
    height: 20,
  },
  image1: {
    width: 30,
    height: 30,
    marginBottom: 20,
    marginTop: 30,
  },
  image3: {
    width: 170,
    height: 170,
    position: 'absolute',
    top: 100,
  },
  image6: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 90,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 250,
    marginBottom: 20,
  },
  squareRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    margin: 20,
    top: 400,
  },
  singleSquare: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 100,
    height: 150,
    backgroundColor: 'skyblue',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  squareImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 250,
    height: 780,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  modalMenuIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  image10: {
    width: 130,
    height: 130,
    marginBottom: 40,
    marginTop: 90,
  },
  modalText: {
    fontSize: 18,
    color: 'black',
    marginVertical: 10,
  },
  loginButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default AdminView;
