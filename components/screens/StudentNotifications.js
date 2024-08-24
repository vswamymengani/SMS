import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

const StudentNotifications = ({ route }) => {
  const navigation = useNavigation();
  const email = route.params.email;
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState({});
  const [errors, setErrors] = useState({});
  const [fullname, setFullName] = useState('');
  const [section, setSection] = useState('');
  const [className, setclassName] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/studentProfile?email=${email}`);
        setProfile(response.data);
        setFullName(response.data.fullname);
        setclassName(response.data.className);
        setSection(response.data.section);
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
          axios.get(`http://10.0.2.2:3000/studentHomeworkNotification`, { params: { className, section } }),
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
  }, [fullname, className, section, email]);

  const filteredNotifications = selectedType
    ? notifications.filter((item) => item.type === selectedType)
    : notifications;

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      if (item.type === 'homework') {
        navigation.navigate('HomeworkScreen', { email });
      } else if (item.type === 'announcement') {
        // Handle announcement navigation if necessary
      } else if (item.type === 'leave') {
        navigation.navigate('LeaveApproval', { email });
      } else if (item.type === 'complaint') {
        navigation.navigate('StudentComplaintList', { email });
      }
    }}>
      <View style={styles.notificationItem}>
        {item.type === 'homework' ? (
          <>
            <Text style={styles.text1}>New Homework</Text>
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
            <Text style={styles.text}>Explanation: {item.explanation}</Text>
            <Text style={styles.text}>Status: {item.is_resolved === 1 ? 'Resolved' : null}</Text>
          </>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={Image2} style={styles.bc} />
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.navigate('Homescreen', { email })} >
          <Image source={Image1} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.header}>Notifications</Text>
      </View>
      <View style={styles.body}>
        {errors.general && <Text style={styles.error}>{errors.general}</Text>}

        <Dropdown
          style={styles.dropdown}
          data={[
            { label: 'All', value: null },
            { label: 'Homework', value: 'homework' },
            { label: 'Announcement', value: 'announcement' },
            { label: 'Leave', value: 'leave' },
            { label: 'Complaint', value: 'complaint' },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select Notification Type"
          value={selectedType}
          onChange={item => setSelectedType(item.value)}
        />

        <FlatList
          data={filteredNotifications}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.type}-${item.id}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bc: {
    height: '110%',
    width: '110%',
    position: 'absolute',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    top: 20,
    marginBottom: 60,
  },
  image: {
    height: 23,
    width: 20,
    marginHorizontal: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  body: {
    borderRadius: 30,
    backgroundColor: 'white',
    height: '110%',
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  notificationItem: {
    padding: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    width: '100%',
    borderBottomRadius: 10,
    borderColor: '#3F1175',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  text1: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StudentNotifications;
