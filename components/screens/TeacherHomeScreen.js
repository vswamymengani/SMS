import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity ,Modal ,Alert, BackHandler} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Image5 from '../assets/Component1.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';
import Image7 from '../assets/Profile1.png';
import Image18 from '../assets/classwork.png';
import Image9 from '../assets/Leave.png';
import Image10 from '../assets/onlineexam.png';
import Image11 from '../assets/feenews.png';
import Image12 from '../assets/studentattendence.png';
import Image14 from '../assets/calander.png';
import Image15 from '../assets/timetable1.png';
import Image16 from '../assets/gallary1.png';
import Image17 from '../assets/homework.png';
import Image8 from '../assets/notification.png';
import Image19 from '../assets/studentcomplaint.png';
import Image20 from '../assets/library.png';
import Image21 from '../assets/Birthdays.png';
import Image22 from '../assets/studymaterial.png';
import Image23 from '../assets/liveclasses.png';
import Image1 from '../assets/Menu.png';
import Image2 from '../assets/Menuicon.png';
import Image24 from '../assets/profilepic.png';
import axios from 'axios';
import TeacherLogin from './TeacherLogin';

const TeacherHomeScreen = ({route}) => {
    const navigation = useNavigation();
    const  email  = route.params.email;
    const [profileVisible, setProfileVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [profile, setProfile] = useState([]);
    const [subject, setSubject] = useState('');
    const [classTeacher ,setClassTeacher] = useState([]);
    const [className, setClassName] = useState('');
    const [section ,setSection] = useState('');
    const [employeeid ,setEmployeeid] = useState('');
    const [errors ,setErrors] = useState({});
    const isFocused = useIsFocused();

    useEffect(() =>{
      const fetchProfile = async() =>{
        try{
          const response = await axios.get(`http://18.60.190.183:3000/teacherProfile?email=${email}`);
          setProfile(response.data);
          setSubject(response.data.subject);
          setEmployeeid(response.data.employeeid);
        }
        catch(error){
          setErrors({general:"unable to fetch the data"});
        }
      }
      fetchProfile();
    },[email]);

    useEffect(() =>{
      const fetchClassTeacher = async() =>{
        try{
          const response = await axios.get(`http://18.60.190.183:3000/classTeacher?employeeid=${employeeid}`);
          console.log('Class Teacher Response:', response.data); // Log the response
          setClassTeacher(response.data);
          setClassName(response.data.className);
          setSection(response.data.section);
        }
        catch(error){
          setErrors({general:"unable to fetch the data"});
        }
      }
      fetchClassTeacher();
    },[employeeid]);

    useEffect(() => {
      let backAction;
  
      if (isFocused) {
        // Only show the alert if the screen is being exited directly via the back button
        backAction = () => {
          Alert.alert(
            "Logout",
            "Do you want to logout?",
            [
              {
                text: "No",
                onPress: () => null,
                style: "cancel"
              },
              {
                text: "Yes",
                onPress: () => navigation.goBack()
              }
            ]
          );
          return true; // Return true to prevent default back action
        };
  
        BackHandler.addEventListener("hardwareBackPress", backAction);
      }
  
      return () => {
        if (backAction) {
          BackHandler.removeEventListener("hardwareBackPress", backAction);
        }
      };
    }, [isFocused, navigation]);

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
          all the teacher from the school welcome to school management app
        </Text>
      </View>

      <View style={styles.squareRow}>
        <TouchableOpacity style={styles.square1} onPress={() => navigation.navigate('TeacherProfile', { email })}>
          <Image source={Image7} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square2} onPress={() => navigation.navigate('TeacherOnlineExam',{ email })}>
          <Image source={Image18} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Online Exam</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square3} onPress={() => navigation.navigate('TeacherHomework',{ email })}>
          <Image source={Image9} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Home Work</Text>
        </TouchableOpacity>
       </View>
      
      <View style={styles.squareRow}>
      <TouchableOpacity style={styles.square4} onPress={() => navigation.navigate('ClassWork',{ email })}>
          <Image source={Image12} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>My Attendence</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square5} onPress={() => navigation.navigate('TeacherAttendance',{ email })}>
          <Image source={Image12} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Student Attendence</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square6} onPress={() => navigation.navigate('TeacherComplaints',{ email })}>
          <Image source={Image12} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Complaint</Text>
        </TouchableOpacity>
      </View>

      
      
      <View style={styles.squareRow}>
        <TouchableOpacity style={styles.square13} onPress={() => navigation.navigate('TeacherExamResults',{ email })}>
          <Image source={Image10} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Exam Results</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square8} onPress={() => navigation.navigate('ClassWork',{ email })}>
          <Image source={Image15} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>School Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square12} onPress={() => navigation.navigate('TeacherNotifications',{ email})}>
          <Image source={Image8} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Notification</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.squareRow}>
      <TouchableOpacity style={styles.square10} onPress={() => navigation.navigate('TeacherLeave',{ email })}>
          <Image source={Image17} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>My Leave</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square11} onPress={() => navigation.navigate('TeacherTimetable',{ email })}>
          <Image source={Image3} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Time Table</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square15} onPress={() => navigation.navigate('TeacherStudyMaterial',{ email })}>
          <Image source={Image22} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Study Material</Text>
        </TouchableOpacity>
      </View>
       
      <View style={styles.squareRow}>
        <TouchableOpacity style={styles.square14} onPress={() => navigation.navigate('ClassWork',{ email })}>
          <Image source={Image21} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Birthdays</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square14} onPress={() => navigation.navigate('StudentLeaves', { email , className ,section})}>
          <Image source={Image10} style={styles.squareImage} />
          <Text style={styles.loginButtonText}>Student Leaves</Text>
        </TouchableOpacity>
        <View style={styles.squareRow}>
                <TouchableOpacity style={styles.square14} onPress={() => {
                    if (subject === 'Library') {
                        navigation.navigate('LibraryManagement', { email });
                    } else {
                        navigation.navigate('Library', { email });
                    }
                }}>
                    <Image source={require('../assets/library.png')} style={styles.squareImage} />
                    <Text style={styles.loginButtonText}>Library</Text>
                </TouchableOpacity>
            </View>
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
              <Image source={Image2} style={styles.image1} />
            </TouchableOpacity>
            <Image source={Image24} style={styles.image} />
            <Text style={styles.modalText1}>{profile.fullname}</Text>
            <TouchableOpacity onPress={() => { setModalVisible(false); setProfileVisible(true); navigation.navigate('TeacherHomeScreen',{ email }); }}>
              <Text style={styles.modalText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(false); setProfileVisible(true); navigation.navigate('TeacherProfile',{ email }); }}>
              <Text style={styles.modalText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(false); setProfileVisible(true); navigation.navigate('TeacherLogin'); }}>
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
  image: {
    width: 130,
    height: 130,
    marginBottom: 40,
    marginTop: 90,
  },
  image1: {
    width: 30,
    height: 30,
    marginBottom: 20,
    marginTop: 30,
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
    fontSize: 18,
    color: 'black',
    marginVertical: 10,
  },
  image2: {
    width: 30,
    height: 30,
    top:20,
    position:'absolute',
    right:160,
  },
  modalText1: {
    fontSize: 20,
    color: 'blue',
    fontWeight:'bold',
    marginVertical: 10,
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
  square18: {
    width: 100,
    height: 100,
    backgroundColor: 'lightblue',
    marginHorizontal: 12,
    borderRadius: 12,
    borderWidth:1,
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

export default TeacherHomeScreen;