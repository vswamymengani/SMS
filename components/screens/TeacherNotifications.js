import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';

const TeacherNotifications = ({ route }) => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [errors, setErrors] = useState({});
  const email = route.params.email;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [announcementsResponse, leaveResponse] = await Promise.all([
          axios.get('http://18.60.190.183:3000/reciveAnnouncements?reciver=Teacher'),
          axios.get(`http://18.60.190.183:3000/leaveNotification?email=${email}`)
        ]);

        const combinedData = [
          ...announcementsResponse.data.map(item => ({ ...item, type: 'announcement' })),
          ...leaveResponse.data.map(item => ({ ...item, type: 'leave' }))
        ];

        combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

        setNotifications(combinedData);
        setFilteredNotifications(combinedData);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setErrors({ general: 'Failed to load notifications' });
      }
    };

    fetchNotifications();
  }, [email]);

  const handleFilterChange = (item) => {
    setSelectedFilter(item.value);
    if (item.value === 'all') {
      setFilteredNotifications(notifications);
    } else {
      setFilteredNotifications(notifications.filter(notification => notification.type === item.value));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      if (item.type === 'announcement') {
        // Handle announcement navigation if necessary
      } else if (item.type === 'leave') {
        navigation.navigate('TeacherLeaveApproval', { email });
      }
    }}>
      <View style={styles.notificationItem}>
        {item.type === 'announcement' ? (
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
      <Image source={Image2} style={styles.bc} />
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.navigate('TeacherHomeScreen', { email })}>
          <Image source={Image1} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.header}>Notifications</Text>
      </View>
      <View style={styles.body}>
        {errors.general && <Text style={styles.error}>{errors.general}</Text>}
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: 'All', value: 'all' },
            { label: 'Announcements', value: 'announcement' },
            { label: 'Leaves', value: 'leave' }
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select filter"
          value={selectedFilter}
          onChange={handleFilterChange}
        />
        <FlatList
          data={filteredNotifications}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id ? `${item.type}-${item.id}` : `${item.type}-${index}`}
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
    padding: 20,
  },
  dropdown: {
    marginBottom: 20,
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
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TeacherNotifications;
