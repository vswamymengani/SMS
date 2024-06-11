import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';

const HomeworkScreen = () => {
  const [homework, setHomework] = useState('');
  
  const handleSubmit = () => {
    Alert.alert('Homework submitted successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>HOMEWORK</Text>
          <Text style={styles.subHeaderText}>The standard Lorem Ipsum passage</Text>
          <Text style={styles.loremIpsumText}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.subject}>Subject</Text>
          <Text style={styles.home}>Add Homework</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={text => setHomework(text)}
            value={homework}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 70,
  },
  subHeaderText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  content: {
    flex: 1,
  },
  loremIpsumText: {
    fontSize: 12,
    lineHeight: 18,
    color: 'black',
    marginBottom: 50,
  },
  subject: {
    fontSize: 20,
    marginBottom: 50,
    color: 'blue',
  },
  home: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
  },
  submitButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 40,
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default HomeworkScreen;
