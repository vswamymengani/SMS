import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const StudentNotifications = ({ route }) => {
  const navigation = useNavigation();
  const email = route.params.email;
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState({});
  const [classname, setClassname] = useState('');
  const [errors, setErrors] = useState({});
  const [fullname, setFullName] = useState('');
  const [section, setSection] = useState('');
  const [className, setClassName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/profile?email=${email}`);
        setProfile(response.data);
        setFullName(response.data.fullname);
        setClassName(response.data.className);
        setSection(response.data.section);
        setClassname(response.data.className);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrors({ general: 'Unable to fetch profile data' });
      }
    };

    fetchProfile();
  }, [email]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [homeworkResponse, announcementsResponse, leaveResponse, complaintsResponse] = await Promise.all([
          axios.get(`http://10.0.2.2:3000/studentHomework`, { params: { classname, section } }),
          axios.get(`http://10.0.2.2:3000/reciveAnnouncements`, { params: { reciver: 'Student' } }),
          axios.get(`http://10.0.2.2:3000/studentLeaveNotification`, { params: { email } }),
          axios.get(`http://10.0.2.2:3000/complaintResponse`, { params: { fullname, className, section } }),
        ]);
  
        const combinedData = [
          ...homeworkResponse.data.map(item => ({ ...item, type: 'homework' })),
          ...announcementsResponse.data.map(item => ({ ...item, type: 'announcement' })),
          ...leaveResponse.data.map(item => ({ ...item, type: 'leave' })),
          ...complaintsResponse.data.map(item => ({ ...item, type: 'complaint' })),
        ];
  
        // Sort combinedData by descending order of created_at timestamp
        combinedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
        setNotifications(combinedData);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setErrors({ general: 'Failed to load notifications' });
      }
    };
  
    fetchNotifications();
  }, [fullname, className, classname, section, email]);
  

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      if (item.type === 'homework') {
        navigation.navigate('HomeworkScreen', { email });
      } else if (item.type === 'announcement') {
        // Handle announcement navigation if necessary
      } else if (item.type === 'leave') {
        navigation.navigate('LeaveApproval', { email });
      } else if (item.type === 'complaint') {
        // Handle complaint navigation if necessary
      }
    }}>
      <View key={item.id} style={styles.notificationItem}>
        {item.type === 'homework' ? (
          <>
            <Text style={styles.text1}>New Homework</Text>
            <Text style={styles.text}>Class: {item.classname} Section: {item.section}</Text>
            <Text style={styles.text}>Subject: {item.subject}</Text>
            <Text style={styles.text}>Homework: {item.title}</Text>
          </>
        ) : item.type === 'announcement' ? (
          <>
            <Text style={styles.text1}>School Announcement</Text>
            <Text style={styles.text}>Subject: {item.subject}</Text>
            <Text style={styles.text}>{item.explanation}</Text>
          </>
        ) : item.type === 'leave' ? (
          <>
            <Text style={styles.text1}>New Leave Approval</Text>
            <Text style={styles.text}>Purpose: {item.leavePurpose}</Text>
            <Text style={styles.text}>Duration: {item.startDate} To {item.endDate}</Text>
            <Text style={styles.text}>Description: {item.description}</Text>
          </>
        ) : item.type === 'complaint' ? (
          <>
            <Text style={styles.text1}>Complaint Response</Text>
            <Text style={styles.text}>Complaint: {item.reason}</Text>
            <Text style={styles.text}>Status: {item.is_resolved === 1 ? 'Resolved' : 'Pending'}</Text>
          </>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {errors.general && <Text style={styles.error}>{errors.general}</Text>}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 3,
  },
  notificationItem: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderWidth: 2,
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#3F1175',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  text1: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center'
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StudentNotifications;
