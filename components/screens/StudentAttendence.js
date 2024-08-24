import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const StudentAttendence = ({ route }) => {
  const navigation = useNavigation();
  const email = route.params?.email;
  const [attendanceData, setAttendanceData] = useState({
    present: 0,
    absent: 0,
    leave: 0,
    holiday: 0,
  });
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/studentProfile?email=${email}`);
        setProfile(response.data);
        fetchAttendance(response.data.rollNo, response.data.className, response.data.section);
      } catch (err) {
        setError('Failed to load profile data');
      }
    };

    const fetchAttendance = async (rollNo, className, section) => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/studentAttendance', {
          params: { rollNo, className, section },
        });
        const data = response.data;
        const attendanceSummary = data.reduce(
          (acc, curr) => {
            acc[curr.status.toLowerCase()] += 1;
            return acc;
          },
          { present: 0, absent: 0, leave: 0, holiday: 0 }
        );
        setAttendanceData(attendanceSummary);
      } catch (err) {
        setError('Failed to load attendance data');
      }
    };

    if (email) {
      fetchProfile();
    } else {
      setError('No email provided');
    }
  }, [email]);

  const chartData = [
    {
      name: 'Present',
      population: attendanceData.present,
      color: '#00FF00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Absent',
      population: attendanceData.absent,
      color: '#FF0000',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Leave',
      population: attendanceData.leave,
      color: '#FFFF00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Holiday',
      population: attendanceData.holiday,
      color: '#0000FF',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Image2} style={styles.bc} />
      <View style={styles.heading}>
        <TouchableOpacity onPress={() => navigation.navigate('Homescreen', { email })}>
          <Image source={Image1} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.header}>Attendance Summary</Text>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.body}>
      <PieChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        absolute
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.tableHeader}>Attendance Details</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Present</Text>
            <Text style={styles.tableCell}>Absent</Text>
            <Text style={styles.tableCell}>Leave</Text>
            <Text style={styles.tableCell}>Holiday</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{attendanceData.present}</Text>
            <Text style={styles.tableCell}>{attendanceData.absent}</Text>
            <Text style={styles.tableCell}>{attendanceData.leave}</Text>
            <Text style={styles.tableCell}>{attendanceData.holiday}</Text>
          </View>
        </View>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  bc: {
    height: '110%',
    width: '110%',
    position: 'absolute',
  },
  body:{
    backgroundColor:'white',
    height:"100%",
    width:'100%',
    borderRadius:30,
    padding:10,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    height: 23,
    top:5,
    width: 20,
    marginHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  summaryContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3F1175',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default StudentAttendence;
