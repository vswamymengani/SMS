import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const BookApproval = ({ route, navigation }) => {
    const { book } = route.params;  // Book details passed from previous screen
    const [admissionid, setAdmissionid] = useState('');
    const [fullname , setFullName] = useState('');
    const [className ,setClassName] = useState('');
    const [section, setSection] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
    const [date, setDate] = useState('');

    const fetchStudentDetails = () => {
        axios.get(`http://18.60.190.183:3000/getStudentDetails?admissionid=${admissionid}`)
            .then(response => {
                console.log('Student details response:', response.data);  // Log the full response
                if (response.data) {
                    setStudentDetails(response.data);
                    setFullName(response.data.fullname);
                    setClassName(response.data.className);
                    setSection(response.data.section);
                } else {
                    Alert.alert('Error', 'No student details found');
                }
            })
            .catch(error => {
                console.error('Error fetching student details', error);
                Alert.alert('Error', 'Could not fetch student details');
            });
    };
    

    const allocateBook = () => {
        const data = {
            bookId: book.id,
            admissionid,
            fullname,
            className,
            section,
            allocationDate: date,
            
        };

        axios.post('http://18.60.190.183:3000/allocateBook', data)
            .then(response => {
                Alert.alert('Success', 'Book allocated successfully');
                axios.post('http://18.60.190.183:3000/updateBookStatus', { bookId: book.id, status: 'Allocated' });
                navigation.goBack();
            })
            .catch(error => {
                console.error('Error allocating book', error);
                Alert.alert('Error', 'Could not allocate the book');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Book Details</Text>
            <Text>{book.bookTitle} by {book.author}</Text>
            <Text>ISBN: {book.isbn}</Text>
            <Text>Status: {book.status}</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Admission Number"
                value={admissionid}
                onChangeText={setAdmissionid}
                onEndEditing={fetchStudentDetails}
            />

            {studentDetails && (
                <View>
                    <Text>Student Name: {studentDetails.fullname}</Text>
                    <Text>Class: {studentDetails.className}</Text>
                    <Text>Section: {studentDetails.section}</Text>
                </View>
            )}

            <TextInput
                style={styles.input}
                placeholder="Enter Date (DD-MM-YYYY)"
                value={date}
                onChangeText={setDate}
            />

            <Button title="Allocate" onPress={allocateBook} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        borderRadius: 4,
        paddingHorizontal: 8,
    },
});

export default BookApproval;
