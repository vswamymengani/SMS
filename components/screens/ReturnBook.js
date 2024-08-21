import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const ReturnBook = ({ route, navigation }) => {
    const { bookId } = route.params;
    const [bookDetails, setBookDetails] = useState(null);
    const [returnDate, setReturnDate] = useState('');
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        // Fetch book and student details based on bookId
        axios.get(`http://10.0.2.2:3000/getLibraryManagementDetails?bookId=${bookId}`)
            .then(response => {
                setBookDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching book details', error);
                Alert.alert('Error', 'Could not fetch book details');
            });
    }, [bookId]);

    const returnBook = () => {
        if (!bookDetails) {
            Alert.alert('Error', 'Book details not available');
            return;
        }

        const data = {
            bookId,
            admissionid: bookDetails.admissionid,
            returnDate,
            remarks,
        };

        axios.post('http://10.0.2.2:3000/returnBook', data)
            .then(response => {
                Alert.alert('Success', 'Book returned successfully');
                navigation.goBack();
            })
            .catch(error => {
                console.error('Error returning book', error);
                Alert.alert('Error', 'Could not return the book');
            });
    };

    if (!bookDetails) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Book Details</Text>
            <Text>{bookDetails.bookTitle} by {bookDetails.author}</Text>
            <Text>ISBN: {bookDetails.isbn}</Text>

            <Text style={styles.label}>Student Details</Text>
            <Text>Admission Number: {bookDetails.admissionid}</Text>
            <Text>Name: {bookDetails.fullname}</Text>
            <Text>Class: {bookDetails.className}</Text>
            <Text>Section: {bookDetails.section}</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Return Date"
                value={returnDate}
                onChangeText={setReturnDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Remarks"
                value={remarks}
                onChangeText={setRemarks}
            />

            <Button title="Return" onPress={returnBook} />
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

export default ReturnBook;
