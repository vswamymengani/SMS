import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

const ComplaintItem = ({ item, onResolve }) => {
  const [comments, setComments] = useState(item.comments || '');
  const [isResolved, setIsResolved] = useState(item.is_resolved || 0);

  const handleResolve = () => {
    onResolve(item.id, 1, comments);
  };

  return (
    <View style={styles.complaintItem}>
      <Text style={styles.text}>Full Name: {item.fullname}</Text>
      <Text style={styles.text}>Class: {item.className}</Text>
      <Text style={styles.text}>Type: {item.typeOfComplaint}</Text>
      <Text style={styles.text}>Reason: {item.reason}</Text>
      <Text style={styles.text}>Explanation: {item.explanation}</Text>
      {isResolved === 0 ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter comments"
            value={comments}
            onChangeText={setComments}
          />
          <Button title="Resolve" onPress={handleResolve} />
        </>
      ) : (
        <Text style={styles.text}>Comments: {item.comments}</Text>
      )}
    </View>
  );
};

const AdminStudentComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState('0');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/complaints?recipient=principal');
        setComplaints(response.data);
        setFilteredComplaints(response.data.filter(item => item.is_resolved.toString() === filter));
      } catch (err) {
        console.error('Failed to load complaints:', err);
        setErrors({ general: 'Failed to load complaints' });
      }
    };
    fetchComplaints();
  }, [filter]);

  const resolveComplaint = async (id, isResolved, comments) => {
    try {
      await axios.put(`http://10.0.2.2:3000/complaints/${id}/resolve`, { is_resolved: isResolved, comments });
      setComplaints(prev =>
        prev.map(complaint =>
          complaint.id === id ? { ...complaint, is_resolved: isResolved, comments } : complaint
        )
      );
      setFilteredComplaints(prev =>
        prev.map(complaint =>
          complaint.id === id ? { ...complaint, is_resolved: isResolved, comments } : complaint
        ).filter(item => item.is_resolved.toString() === filter)
      );
    } catch (err) {
      console.error('Error resolving complaint:', err);
      Alert.alert('Error', 'Failed to resolve complaint. Please try again later.');
    }
  };

  const handleChangeFilter = (item) => {
    setFilter(item.value);
  };

  return (
    <View style={styles.container}>
      {errors.general && <Text style={styles.error}>{errors.general}</Text>}
      <Dropdown
        style={styles.dropdown}
        data={[{ label: 'Pending', value: '0' }, { label: 'Resolved', value: '1' }]}
        labelField="label"
        valueField="value"
        placeholder="Select status"
        value={filter}
        onChange={handleChangeFilter}
      />
      <FlatList
        data={filteredComplaints}
        renderItem={({ item }) => <ComplaintItem item={item} onResolve={resolveComplaint} />}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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
  complaintItem: {
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default AdminStudentComplaints;
