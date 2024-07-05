import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const TeacherNotifications = ({ route }) => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [errors, setErrors] = useState({});
  const email = route.params.email;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [complaintsResponse, announcementsResponse, leaveResponse] = await Promise.all([
          axios.get('http://10.0.2.2:3000/complaints?recipient=teacher'),
          axios.get('http://10.0.2.2:3000/reciveAnnouncements'),
          axios.get(`http://10.0.2.2:3000/leaveNotification?email=${email}`)
        ]);

        const combinedData = [
          ...complaintsResponse.data.map(item => ({ ...item, type: 'complaint' })),
          ...announcementsResponse.data.map(item => ({ ...item, type: 'announcement' })),
          ...leaveResponse.data.map(item => ({ ...item, type: 'leave' }))
        ];

        // Optionally sort combinedData by date if there's a date field available
        combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

        setNotifications(combinedData);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setErrors({ general: 'Failed to load notifications' });
      }
    };

    fetchNotifications();
  }, [email]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      if (item.type === 'complaint') {
        navigation.navigate('ReciveComplaint', { email });
      } else if (item.type === 'announcement') {
        // Handle announcement navigation if necessary
      } else if (item.type === 'leave') {
        navigation.navigate('TeacherLeaveApproval', { email });
      }
    }}>
      <View style={styles.notificationItem}>
        {item.type === 'complaint' ? (
          <>
            <Text style={styles.text1}>Student Complaint</Text>
            <Text style={styles.text}>Full Name: {item.fullname}</Text>
            <Text style={styles.text}>Class: {item.className} Section: {item.section}</Text>
            <Text style={styles.text}>Reason: {item.reason}</Text>
          </>
        ) : item.type === 'announcement' ? (
          <>
            <Text style={styles.text1}>School Announcement</Text>
            <Text style={styles.text}>Subject: {item.subject}</Text>
            <Text style={styles.text}>{item.explanation}</Text>
          </>
        ) : (
          <>
            <Text style={styles.text1}>New Leave Approval</Text>
            <Text style={styles.text}>Purpose: {item.purpose}</Text>
            <Text style={styles.text}>Duration: {item.startdate} To {item.enddate}</Text>
            <Text style={styles.text}>Description: {item.description}</Text>
          </>
        )}
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

export default TeacherNotifications;
