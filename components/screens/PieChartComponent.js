import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

const PieChartComponent = () => {
  const widthAndHeight = 250;
  const series = [150, 30, 20, 10]; // Example data: [Present, Absent, Leave, Holidays]

  // Calculate total attendance count
  const totalAttendance = series.reduce((acc, curr) => acc + curr, 0);

  // Calculate percentages
  const percentages = series.map(count => ((count / totalAttendance) * 100).toFixed(2));

  const sliceColor = ['#4caf50', '#f44336', '#ff9800', '#2196f3']; // Colors for each attendance category

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Student Attendance</Text>
        <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#4caf50' }]} />
            <Text style={styles.legendText}>Present - {percentages[0]}%</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#f44336' }]} />
            <Text style={styles.legendText}>Absent - {percentages[1]}%</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#ff9800' }]} />
            <Text style={styles.legendText}>Leave - {percentages[2]}%</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#2196f3' }]} />
            <Text style={styles.legendText}>Holidays - {percentages[3]}%</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  legendContainer: {
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
  },
});

export default PieChartComponent;
