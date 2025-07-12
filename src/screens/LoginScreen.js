import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [savedUser, setSavedUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem('userCredentials');
      if (stored) {
        setSavedUser(JSON.parse(stored));
      }
    };
    loadUser();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (savedUser && email === savedUser.email && password === savedUser.password) {
      await AsyncStorage.setItem('userToken', 'token123');
      navigation.replace('Home');
    } else {
      Alert.alert('Invalid Credentials', 'Please check your email and password.');
    }
    if (!validateEmail(email)) {
      setEmailValid(false);
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    } else {
      setEmailValid(true);
    }

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={(text) => {
          setEmail(text);
          setEmailValid(true); // reset on change
        }}
        style={[styles.input, !emailValid && styles.inputError]} 
        placeholderTextColor="#000"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {!emailValid && <Text style={styles.errorText}>Invalid email format</Text>}

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
          placeholderTextColor="#000"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Button title="Login" onPress={handleLogin} />
      
      <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, color: '#000' },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', marginBottom: 10 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15, paddingHorizontal: 10 },
  passwordInput: { flex: 1, paddingVertical: 10, color: '#000' },
  eyeButton: { paddingHorizontal: 8 },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' },
});
