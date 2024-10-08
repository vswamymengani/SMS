import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

const AdminLibrary = () => {
    const navigation = useNavigation();
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleAddBook = () => {
    const bookDetails = { bookTitle, author, isbn, description, coverPhoto };
    
    axios.post('http://10.0.2.2:3000/addBook', bookDetails)
      .then(response => {
        console.log(response.data);
        Alert.alert('Success', 'Book added successfully');
        // Clear the form
        setBookTitle('');
        setAuthor('');
        setIsbn('');
        setDescription('');
        setCoverPhoto(null);
      })
      .catch(error => {
        console.error('There was an error adding the book!', error);
        Alert.alert('Error', 'There was an error adding the book');
      });
  };

  const selectCoverPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setCoverPhoto(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
        <Image source={Image2} style={styles.bc} />
        <View style={styles.head}>
            <TouchableOpacity onPress={() =>navigation.navigate('AdminView') }>
                <Image source={Image1} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.header}>Admin Library</Text>    
        </View> 
        <View style={styles.body}>
      <Text style={styles.heading}>Add Book Details</Text>
      <TouchableOpacity onPress={selectCoverPhoto}>
        <View style={styles.coverPhotoContainer}>
          {coverPhoto ? (
            <Image source={{ uri: coverPhoto }} style={styles.coverPhoto} />
          ) : (
            <Text style={styles.coverPhotoText}>Select Cover Photo</Text>
          )}
        </View>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Book Title"
        value={bookTitle}
        onChangeText={setBookTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="School Code"
        value={isbn}
        onChangeText={setIsbn}
      />
      <TextInput
        style={styles.input1}
        placeholder="Description"
        value={description}
        numberOfLines={10}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Add Book" onPress={handleAddBook} />
      </View>
    </View>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius:20,
    paddingHorizontal: 10,
  },
  input1: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius:20,

    paddingHorizontal: 10,
  },
  coverPhotoContainer: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverPhotoText: {
    color: 'gray',
  },
});

export default AdminLibrary;