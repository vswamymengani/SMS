import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';
import { useNavigation } from '@react-navigation/native';

const Library = ({route}) => {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const {email} = route.params;

  useEffect(() => {
    axios.get('http://10.0.2.2:3000/getBooks')
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
      {books.map((book) => (
        <View key={book.id} style={styles.bookContainer}>
          {book.coverPhoto && (
            <Image source={{ uri: book.coverPhoto }} style={styles.coverPhoto} />
          )}
          <Text style={styles.bookTitle}>{book.bookTitle}</Text>
          <Text style={styles.author}>by {book.author}</Text>
          <Text style={styles.isbn}>Code: {book.isbn}</Text>
          <Text style={styles.description}>{book.description}</Text>
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
  head:{
    flexDirection:'row',
    justifyContent:'flex-start',
    top:10,
    marginBottom:60,
  },
  image:{
    height:23,
    width:20,
    marginHorizontal:10
  },
  header:{
    fontSize:20,
    fontWeight:'bold',
    color:'white',
  },
  bookContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
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
  },
  author: {
    fontSize: 16,
    marginBottom: 5,
  },
  isbn: {
    fontSize: 14,
    marginBottom: 5,
    color: 'gray',
  },
  description: {
    fontSize: 14,
  },
});

export default Library;