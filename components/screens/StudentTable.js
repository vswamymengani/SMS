import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import Image5 from '../assets/Component1.png';
import Image2 from '../assets/Menu.png';
import Image6 from '../assets/Ellipse2.png';
import Image3 from '../assets/Subtract.png';
import Image4 from '../assets/Search.png';
import Image10 from '../assets/profilepic.png';
import Image1 from '../assets/Menuicon.png';

const AdminView = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(true);

  return (
    <View style={styles.container}>
      {profileVisible && (
        <TouchableOpacity style={styles.profileIcon} onPress={() => setProfileVisible(false)}>
          {/* Add any profile image or icon here if needed */}
        </TouchableOpacity>
      )}
      <Image source={Image5} style={styles.image5} />
      <TouchableOpacity style={styles.menuIcon} onPress={() => setModalVisible(true)}>
        <Image source={Image2} style={styles.image2} />
      </TouchableOpacity>
      <Image source={Image6} style={styles.image6} />
      <Image source={Image3} style={styles.image3} />
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchBox} placeholder="search......" />
        <Image source={Image4} style={styles.searchIcon} />
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalMenuIcon} onPress={() => setModalVisible(false)}>
              <Image source={Image1} style={styles.image1} />
            </TouchableOpacity>
            <Image source={Image10} style={styles.image10} />
            <TouchableOpacity onPress={() => { setModalVisible(false); setProfileVisible(true); navigation.navigate('AdminView'); }}>
              <Text style={styles.modalText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(false); setProfileVisible(true); navigation.navigate('Settings'); }}>
              <Text style={styles.modalText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(false); setProfileVisible(true); navigation.navigate('AdminLogin'); }}>
              <Text style={styles.modalText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image5: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
  },
  menuIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  profileIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  image2: {
    width: 45,
    height: 20,
  },
  image1: {
    width: 55,
    height: 30,
    marginBottom: 20,
    marginTop: 30,
  },
  image3: {
    width: 150,
    height: 200,
    position: 'absolute',
    top: 90,
  },
  image6: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 90,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 250,
    marginBottom: 20,
  },
  searchBox: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 300,
    marginRight: 0,
    marginTop: 70,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  squareRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  singleSquare: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 100,
    height: 150,
    backgroundColor: 'skyblue',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  squareImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 250,
    height: 780,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  modalMenuIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  image10: {
    width: 130,
    height: 130,
    marginBottom: 40,
    marginTop: 90,
  },
  modalText: {
    fontSize: 18,
    color: 'black',
    marginVertical: 10,
  },
});

export default AdminView;
