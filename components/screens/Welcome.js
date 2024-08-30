import React, { useEffect } from 'react';
import { View, Image, StyleSheet, BackHandler } from 'react-native';
import Splashscreen from '../assets/Splashscreen.png';

const Welcome = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('SelectUser'); // Use replace to prevent going back to Splash screen
    }, 1000);

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      clearTimeout(timeout); // Clear timeout if back is pressed
      BackHandler.exitApp(); // Exit app on back press
      return true;
    });

    return () => {
      clearTimeout(timeout);
      backHandler.remove(); // Clean up back handler
    };
  }, [navigation]);
  

  return (
    <View style={styles.container}>
      <Image
        source={Splashscreen}
        style={styles.splashscreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  splashscreen: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});

export default Welcome;
