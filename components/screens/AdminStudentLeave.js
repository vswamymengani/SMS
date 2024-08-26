import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";

const AdminStudentLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [errors, setErrors] = useState({});
  const [approval, setApproval] = useState(null);

  useEffect(() => {
    const fetchStudentLeaves = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:3000/studentLeaves');
        setLeaves(response.data);
        setFilteredLeaves(response.data.filter(leave => leave.approval === null));
      } catch (err) {
        setErrors({ general: 'Failed to load leaves' });
      }
    };
    fetchStudentLeaves();
  }, []);

  const updateLeaveStatus = async (id, status) => {
    try {
      await axios.put(`http://18.60.190.183:3000/studentLeaves/${id}`, { approval: status });
      const updatedLeaves = leaves.map(leave =>
        leave.id === id ? { ...leave, approval: status } : leave
      );
      setLeaves(updatedLeaves);
      setFilteredLeaves(updatedLeaves.filter(leave => leave.approval === approval));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeFilter = (item) => {
    setApproval(item.value);
    setFilteredLeaves(leaves.filter(leave => leave.approval === (item.value === 'null' ? null : item.value)));
  };

  const renderLeave = ({ item }) => (
    <View style={styles.leaveItem}>
      <Text style={styles.text}>Leave Purpose: {item.leavePurpose}</Text>
      <Text style={styles.text}>Name: {item.fullname}    Class: {item.className}    Section: {item.section}</Text>
      <Text style={styles.text}>Start Date: {item.startDate} End Date: {item.endDate}</Text>
      <Text style={styles.text}>Explanation: {item.description}</Text>
      {item.approval === null && (
        <View style={styles.buttonContainer}>
          <Button title="Approve" onPress={() => updateLeaveStatus(item.id, "Approved")} />
          <Button title="Reject" onPress={() => updateLeaveStatus(item.id, "Rejected")} />
        </View>
      )}
    </View>
  );

  const data = [
    { label: 'Pending', value: 'null' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
  ];

  return (
    <View style={styles.container}>
      {errors.general && <Text style={styles.error}>{errors.general}</Text>}
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select status"
        value={approval}
        onChange={handleChangeFilter}
      />
      <FlatList
        data={filteredLeaves}
        renderItem={renderLeave}
        keyExtractor={(item) => item.id.toString()}
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
  leaveItem: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderColor: 'black',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
});

export default AdminStudentLeave;
