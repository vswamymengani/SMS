import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SingleComplaintItem = ({ item, onResolve }) => {
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

const SingleStudentComplaint = ({ route }) => {
  const navigation = useNavigation();
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [errors, setErrors] = useState({});
  const email = route.params.email;
  const fullname = route.params.fullname;
  const section = route.params.section;
  const className = route.params.className;
  const [recipient, setRecipient] = useState('Teacher');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/singleStudentComplaint', { params: { fullname, className, section, recipient } });
        setComplaints(response.data);
        setFilteredComplaints(response.data.filter(item => item.is_resolved !== 1));
      } catch (err) {
        setErrors({ general: 'Failed to load complaints' });
      }
    };
    fetchComplaints();
  }, [fullname, className, section, recipient]);

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
        ).filter(item => item.is_resolved === 0)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const renderComplaint = ({ item }) => (
    <SingleComplaintItem item={item} onResolve={resolveComplaint} />
  );

  return (
    <View style={styles.container}>
      {errors.general && <Text style={styles.error}>{errors.general}</Text>}
      <FlatList
        data={filteredComplaints}
        renderItem={renderComplaint}
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

export default SingleStudentComplaint;
