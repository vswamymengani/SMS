import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Button, Image,TextInput, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';
import { useNavigation } from '@react-navigation/native';

const Library = ({route}) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const {email} = route.params;

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

  useEffect(() => {
    axios.get('http://18.60.190.183:3000/getBooks')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
        <Image source={Image2} style={styles.bc} />
        <View style={styles.head}>
            <TouchableOpacity onPress={() =>navigation.navigate('Homescreen',{ email }) }>
                <Image source={Image1} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.header}>Library</Text>    
        </View> 
        <View style={styles.body}>
        <Text style={styles.heading}>Search for Books</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter book title or Book Code"
            value={searchQuery}
             onChangeText={setSearchQuery}
          />
        <Button title="Search" onPress={searchBook} />
      {books.map((book) => (
        <View key={book.id} style={styles.bookContainer}>
          <View style={styles.row}>
            <View style={styles.first}>
              {book.coverPhoto && (
              <Image source={{ uri: book.coverPhoto }} style={styles.coverPhoto} />
              )}
            </View>
            <View style={styles.secound}>
              <Text style={styles.bookTitle}>{book.bookTitle}</Text>
              <Text style={styles.author}>Author: {book.author}</Text>
              <Text style={styles.isbn}>Book Code: {book.isbn}</Text>
              <Text numberOfLines={1} style={styles.description}>Description: {book.description}</Text>
            </View>
          </View>
        </View>
      ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body:{
    borderRadius:30,
    backgroundColor:'white',
    height:'110%',
    padding:10,
  },
  bc:{
    height:'110%',
    width:'110%',
    position:'absolute',
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
  first:{
    height:100,
    width:"40%",
  },
  secound:{
    height:70,
    width:"60%",
  },
  head:{
    flexDirection:'row',
    justifyContent:'flex-start',
    top:20,
    marginBottom:60,
  },
  image:{
    height:23,
    width:20,
    marginHorizontal:10,
    top:3,
  },
  header:{
    fontSize:25,
    fontWeight:'bold',
    color:'white',
  },
  bookContainer: {
    top:10,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
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
  coverPhoto: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'blue',
  },
  author: {
    fontSize: 16,
    marginBottom: 5,
    color:'black',
  },
  isbn: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  description: {
    fontSize: 14,
    color:'black',
    
  },
});

export default Library;