import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LibraryManagement = ({route}) => {
    const {email} = route.params;
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);

    const searchBook = () => {
        axios.get(`http://18.60.190.183:3000/searchBook?query=${searchQuery}`)
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('There was an error searching for the book!', error);
                Alert.alert('Error', 'There was an error searching for the book');
            });
    };

    const renderBookItem = ({ item }) => (
        <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.bookTitle}</Text>
            <Text style={styles.bookDetail}>Author: {item.author}</Text>
            <Text style={styles.bookDetail}>ISBN: {item.isbn}</Text>
            <Text style={styles.bookDetail}>Status: {item.status}</Text>
            {item.status === 'Available' ? (
                <Button title="Allocate" onPress={() => navigation.navigate('BookApproval', { book: item })} />
            ) : (
                <Button title="Return" onPress={() => navigation.navigate('ReturnBook', { bookId: item.id})} />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Image source={Image2} style={styles.bc} />
            <View style={styles.head}>
                <TouchableOpacity onPress={() => navigation.navigate('TeacherHomeScreen',{email})}>
                    <Image source={Image1} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.header}>Library Management</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.heading}>Search for Books</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter book title or ISBN"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button title="Search" onPress={searchBook} />

                <FlatList
                    data={books}
                    renderItem={renderBookItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.bookList}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        borderRadius: 30,
        backgroundColor: 'white',
        height: '110%',
        padding: 10,
    },
    bc: {
        height: '110%',
        width: '110%',
        position: 'absolute',
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        top: 10,
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
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    bookList: {
        marginTop: 20,
    },
    bookItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bookDetail: {
        fontSize: 14,
        color: '#555',
    },
});

export default LibraryManagement;

