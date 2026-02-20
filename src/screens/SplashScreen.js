import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
///import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();


const timeout =setTimeout(() => {
   navigation.replace('Home');
}, 3000);
   

    // const timeout = setTimeout(async () => {
    //   try {
    //     const userToken = await AsyncStorage.getItem('userToken');
    //     if (userToken) {
    //       navigation.replace('Home');
    //     } else {
    //       navigation.replace('Login');
    //     }
    //   } catch (e) {
    //     navigation.replace('Login');
    //   }
    // }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        ECOM APP
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFA86B',
    letterSpacing: 8,
  },
});
