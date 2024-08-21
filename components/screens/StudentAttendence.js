import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const StudentAttendence = ({ route }) => {
  const [attendanceData, setAttendanceData] = useState({
    present: 0,
    absent: 0,
    leave: 0,
    holiday: 0,
  });
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');
  const email = route.params?.email;

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
      <Text style={styles.title}>Attendance Summary</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
        <Text style={styles.summaryText}>Present: {attendanceData.present} Classes</Text>
        <Text style={styles.summaryText}>Absent: {attendanceData.absent} Classes</Text>
        <Text style={styles.summaryText}>Leave: {attendanceData.leave} Classes</Text>
        <Text style={styles.summaryText}>Holiday: {attendanceData.holiday} Classes</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3F1175',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default StudentAttendence;
