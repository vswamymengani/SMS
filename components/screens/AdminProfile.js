import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Image10 from '../assets/profilepic.png';
import Image11 from '../assets/AdminProfile.png';
import Image1 from '../assets/arrow-left.png';

const SelectUser = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Image source={Image1} style={styles.image1} />
      </TouchableOpacity>

      <Image source={Image10} style={styles.image10} />
      <Image source={Image11} style={styles.image11} />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 30,
  },
  image10: {
    width: 130,
    height: 130,
    marginBottom: 50,
    marginTop: 100,
  },
  image11: {
    width: 300,
    height: 300,
    marginBottom: 50,
    marginTop: -20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 150,
    marginTop: 20,
  },
  saveButton: {
    width: '45%',
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
  },
  deleteButton: {
    width: '45%',
    height: 50,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  deleteButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default SelectUser;
