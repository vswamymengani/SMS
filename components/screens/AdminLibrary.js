import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const AdminLibrary = () => {
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
        placeholder="ISBN"
        value={isbn}
        onChangeText={setIsbn}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Add Book" onPress={handleAddBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  coverPhotoContainer: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
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
