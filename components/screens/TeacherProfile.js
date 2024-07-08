import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Image1 from '../assets/BackArrow.png';
import Image2 from '../assets/Admin.png';
import Image5 from '../assets/Component1.png';
import Image3 from '../assets/Edit.png';
import { useNavigation } from '@react-navigation/native';

const TeacherProfile = ({navigation, route }) => {
  const [teacherprofile, setTeacherProfile] = useState({});
  const [error, setError] = useState(null);
  const email = route.params.email;
  
  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/teacherprofile?email=${email}`);
        setTeacherProfile(response.data);
      } catch (err) {
        setError('Failed to load profile data');
      }
    };
    if (email) {
      fetchTeacherProfile();
    } else {
      setError('No email provided');
    }
  }, [email]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Image5} style={styles.image5} />
      <TouchableOpacity onPress={() => navigation.navigate('TeacherHomeScreen',{ email })}>
        <Image source={Image1} style={styles.back} />
      </TouchableOpacity>
      <View style={styles.profileBox}>
        <Image source={Image2} style={styles.profileImage} />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>EmployeeId : {teacherprofile.employeeid}</Text>
        <View style={styles.row}>
          <Text style={styles.infoText}>Name:</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RequestEdit', { field: 'fullname', email })}>
            <Image source={Image3} style ={ styles.edit} />
          </TouchableOpacity>
        </View>
        <Text style={styles.infoText1}> {teacherprofile.fullname}</Text>
        <Text style={styles.infoText}>Email:</Text>
        <Text style={styles.infoText1}> {teacherprofile.email}</Text>
        <View style={styles.row}>
        <Text style={styles.infoText}>Date of Birth:</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RequestEdit', { field: 'dateofbirth', email })}>
          <Image source={Image3} style ={ styles.edit} />
        </TouchableOpacity>
        </View>
        <Text style={styles.infoText1}> {teacherprofile.dateofbirth}</Text>
        <View style={styles.row}>
        <Text style={styles.infoText}>Mobile Number:</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RequestEdit', { field: 'mobileNo', email })}>
          <Image source={Image3} style ={ styles.edit} />
        </TouchableOpacity>
        </View>
        <Text style={styles.infoText1}> {teacherprofile.mobileNo}</Text>
        <View style={styles.row}>
        <Text style={styles.infoText}>Experience:</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RequestEdit', { field: 'experience', email })}>
           <Image source={Image3} style ={ styles.edit} />
        </TouchableOpacity>
        </View>
        <Text style={styles.infoText1}> {teacherprofile.experience}</Text>
        <View style={styles.row}>
        <Text style={styles.infoText}>Present Address:</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RequestEdit', { field: 'presentaddress', email })}>
         <Image source={Image3} style ={ styles.edit} /> 
        </TouchableOpacity>
        </View>
        <Text style={styles.infoText1}> {teacherprofile.presentaddress}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    color:'black',
  },
  row:{
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  back:{
    height:30,
    width:30,
    left:-180,
  },
  edit:{
    height:20,
    width:20,
  },
  profileBox: {
    alignItems: 'center',
    marginVertical: 20,
    color:'black',
  },
  image5: {
    width: 415,
    height: 250,
    position: 'absolute',
    top: 0,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 10,
    borderWidth:5,
    top:40,
    borderColor:'#3F1175',
    backgroundColor:'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    color: 'gray',
  },
  infoBox: {
    width: '80%',
    height:'50%',
    marginTop: 20,
    color:'black',
    left:-20,
  },
  infoTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'blue',
    marginBottom: 30,
  },
  infoText: {
    fontSize: 20,
    marginBottom: 0,
    color:'#3F1175',
    fontWeight:'bold',
  },
  infoText1: {
    fontSize: 20,
    marginBottom: 15,
    color:'black',
    fontWeight:'600',
  },
  homeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1DBBFF',
    borderRadius: 5,
  },
  homeButtonText: {
    fontSize: 18,
    color: 'white',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default TeacherProfile;
