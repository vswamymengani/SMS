import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const StudentNotifications = ({ route }) => {
  const navigation = useNavigation();
  const email = route.params.email;
  const [notifications, setNotifications] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/studentHomework');
        setNotifications(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load Notifications' });
      }
    };
    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() =>navigation.navigate('HomeworkScreen',{ email })}>
      <View style={styles.notificationItem}>
        <Text style={styles.text1}>New Home Work</Text>
        <Text style={styles.text}>Class: {item.classname} Section: {item.section}</Text>
        <Text style={styles.text}>Subject: {item.subject}</Text>
        <Text style={styles.text}>Homework: {item.title}</Text>
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
