import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';

const StudentLibrary = () => {
  const [books, setBooks] = useState([]);

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
      {books.map((book) => (
        <View key={book.id} style={styles.bookContainer}>
          {book.coverPhoto && (
            <Image source={{ uri: book.coverPhoto }} style={styles.coverPhoto} />
          )}
          <Text style={styles.bookTitle}>{book.bookTitle}</Text>
          <Text style={styles.author}>by {book.author}</Text>
          <Text style={styles.isbn}>ISBN: {book.isbn}</Text>
          <Text style={styles.description}>{book.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

export default StudentLibrary;
