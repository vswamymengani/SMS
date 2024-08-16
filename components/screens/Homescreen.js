
import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity,Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Image5 from '../assets/Component1.png';
import Image2 from '../assets/Menu.png';
import Image1 from '../assets/Menuicon.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';
import Image7 from '../assets/Profile1.png';
import Image8 from '../assets/notification.png';
import Image9 from '../assets/Leave.png';
import Image10 from '../assets/onlineexam.png';
import Image4 from '../assets/profilepic.png';
import Image11 from '../assets/feenews.png';
import Image12 from '../assets/studentattendence.png';
import Image14 from '../assets/calander.png';
import Image15 from '../assets/timetable1.png';
import Image16 from '../assets/gallary1.png';
import Image17 from '../assets/homework.png';
import Image18 from '../assets/classwork.png';
import Image19 from '../assets/studentcomplaint.png';
import Image20 from '../assets/library.png';
import Image21 from '../assets/exams.png';
import Image22 from '../assets/studymaterial.png';
import Image23 from '../assets/liveclasses.png';
import LoginScreen from './LoginScreen';
import axios from 'axios';

const Homescreen = ({ navigation, route }) => {
  const email  = route.params.email; // Receive the email passed from LoginScreen
  const [profileVisible, setProfileVisible]= useState(true);
  const [modalVisible , setModalVisible] = useState(false);
  const [profile , setProfile] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() =>{
    const fetchProfile = async () =>{
      try{
      const response = await axios.get(`http://10.0.2.2:3000/studentProfile?email=${email}`);
      setProfile(response.data);
      }
      catch(error){
        setErrors({general:"unable to fetch the data"});
      }
    }
    fetchProfile();
  },[email]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeText}>
          Welcome Message -{'>'}
        </Text>
        <Text style={styles.loremIpsumText}>
          The standard Lorem Ipsum passage
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>

      <View style={styles.squareRow}>
        <TouchableOpacity style={styles.square1} onPress={() => navigation.navigate('Profile',{ email })}>
          <Image source={Image7} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square2} onPress={() => navigation.navigate('StudentNotifications',{ email })}>
          <Image source={Image8} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square3} onPress={() => navigation.navigate('StudentLeave',{ email })}>
          <Image source={Image9} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Student Leave</Text>
        </TouchableOpacity>
       </View>
      
      <View style={styles.squareRow}>
      <TouchableOpacity style={styles.square4} onPress={() => navigation.navigate('StudentOnlineExam',{ email })}>
          <Image source={Image10} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Online Exam</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square5} onPress={() => navigation.navigate('FeeNews',{email})}>
          <Image source={Image11} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Fee News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square6} onPress={() => navigation.navigate('StudentAttendence',{email})}>
          <Image source={Image12} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Student Attendence</Text>
        </TouchableOpacity>
      </View>

      
      
      <View style={styles.squareRow}>
      <TouchableOpacity style={styles.square7} onPress={() => navigation.navigate('CalendarScreen',{ email })}>
          <Image source={Image14} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square8} onPress={() => navigation.navigate('StudentTimetable' ,{ email })}>
          <Image source={Image15} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Time Table</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square9} onPress={() => navigation.navigate('SchoolEvents',{ email })}>
          <Image source={Image16} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Gallary</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.squareRow}>
      <TouchableOpacity style={styles.square10} onPress={() => navigation.navigate('HomeworkScreen',{ email })}>
          <Image source={Image17} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Home Work</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square11} onPress={() => navigation.navigate('WorkInProgress',{ email })}>
          <Image source={Image18} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Class Work</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square12} onPress={() => navigation.navigate('StudentComplaint',{ email })}>
          <Image source={Image19} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Student Complaint</Text>
        </TouchableOpacity>
      </View>
       
      <View style={styles.squareRow}>
      <TouchableOpacity style={styles.square13} onPress={() => navigation.navigate('Library',{ email })}>
          <Image source={Image20} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square14} onPress={() => navigation.navigate('StudentExamResults',{ email })}>
          <Image source={Image21} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Exams Results</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square15} onPress={() => navigation.navigate('StudentStudyMaterial',{ email })}>
          <Image source={Image22} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Study Material</Text>
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
            <Image source={Image4} style={styles.image10} />
            <Text style={styles.modalText1}>{profile.fullname}</Text>
            <TouchableOpacity onPress={() => { setModalVisible(false); setProfileVisible(true); navigation.navigate('Homescreen',{ email }); }}>
              <Text style={styles.modalText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(false); setProfileVisible(true); navigation.navigate('Profile',{ email }); }}>
              <Text style={styles.modalText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(false); setProfileVisible(true); navigation.navigate('LoginScreen'); }}>
              <Text style={styles.modalText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image5: {
    width: 415,
    height: 200,
    position: 'absolute',
    top: 0,
  },
  image10: {
    width: 130,
    height: 130,
    marginBottom: 40,
    marginTop: 90,
  },
  image3: {
    width:180,
    height: 180,
    position: 'absolute',
    top: 90,
  },
  image6: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 90,
  },
  image2: {
    width: 30,
    height: 30,
    top:20,
    position:'absolute',
    right:160,
  },
  image1: {
    width: 30,
    height: 30,
    marginBottom: 20,
    marginTop: 30,
  },
  welcomeBox: {
    width: 338,
    height: 100,
    marginLeft: 10,
    borderRadius: 12,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    top:30,
    marginBottom: 100,
    marginTop:300, // Adjusted margin
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
    marginBottom: 5,
  },
  loremIpsumText: {
    fontSize: 12,
    lineHeight: 18,
    color:'white',
  },
  squareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  loginButtonText: {
    fontSize: 15,
    color: 'black',
    fontWeight:'bold',
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
  modalText: {
    fontSize: 20,
    color: 'black',
    marginVertical: 10,
  },
  modalText1: {
    fontSize: 25,
    color: 'blue',
    fontWeight:'bold',
    marginVertical: 10,
  },
  square1: {
    width: 100,
    height: 100,
    backgroundColor: '#e78bf0',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square2: {
    width: 100,
    height: 100,
    backgroundColor: '#90d4ae',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square3: {
    width: 100,
    height: 100,
    backgroundColor: '#db4256',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square4: {
    width: 100,
    height: 100,
    backgroundColor: '#4bde55',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square5: {
    width: 100,
    height: 100,
    backgroundColor: '#751a74',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square6: {
    width: 100,
    height: 100,
    backgroundColor: '#ede245',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square7: {
    width: 100,
    height: 100,
    backgroundColor: '#73726e',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square8: {
    width: 100,
    height: 100,
    backgroundColor: '#5dadde',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square9: {
    width: 100,
    height: 100,
    backgroundColor: '#90d4ae',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square10: {
    width: 100,
    height: 100,
    backgroundColor: '#90d4ae',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square11: {
    width: 100,
    height: 100,
    backgroundColor: '#e3d676',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square12: {
    width: 100,
    height: 100,
    backgroundColor: '#5dadde',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square13: {
    width: 100,
    height: 100,
    backgroundColor: '#c71c69',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square14: {
    width: 100,
    height: 100,
    backgroundColor: '#c4db4d',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square15: {
    width: 100,
    height: 100,
    backgroundColor: '#90d4ae',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square16: {
    width: 100,
    height: 100,
    backgroundColor: '#db4256',
    marginHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareImage: {
    width: 50,
    height: 50,
  },
});

export default Homescreen;