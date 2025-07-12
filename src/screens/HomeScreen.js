import React, { useEffect, useState,useRef, useLayoutEffect } from 'react';
import { View, FlatList, BackHandler,Alert,TextInput, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { fetchProducts } from '../api/productService';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef('');
  const [cachedSearch, setCachedSearch] = useState('');

useEffect(() => {
  fetchProducts().then(setProducts);
  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit and logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'YES',
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userCredentials');
         BackHandler.exitApp();
        },
      },
    ]);
    return true; 
  };

  const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  return () => backHandler.remove();

}, []);

useFocusEffect(
  React.useCallback(() => {
    setSearch(cachedSearch);
  }, [cachedSearch])
);

useLayoutEffect(() => {
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Exit App', 'Are you sure you want to logout and exit?', [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Yes',
              onPress: async () => {
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userCredentials');
                navigation.replace('Login');
              },
            },
          ]);
        }}
       
      >
      <Icon name="arrow-back" size={24} color="#000000" style={styles.eyeButton}/>
            </TouchableOpacity>
    ),
    headerRight: () => (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 15 }}>
          <Image source={require('../assets/cart.png')} style={{ width: 45, height: 45 }} />
        </TouchableOpacity>

    

        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userCredentials');
            navigation.replace('Login');
          }}
          
        >
          <Image
            source={require('../assets/power-btn.jpg')}
            style={{ width: 45, height: 45, borderRadius: 50,borderWidth:1,borderColor:"lightblue" }}
          />
        
        </TouchableOpacity>
         
      </View>
    ),
  });
}, [navigation]);


  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
      <Image source={{ uri: item.image }} style={styles.image}  resizeMode="contain"/>
      <Text numberOfLines={1}>{item.title}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#000000"
        value={search}
         onChangeText={(text) => {
    setSearch(text);
    setCachedSearch(text);
  }}
        style={styles.search}
      />
      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  search: { padding: 10, borderWidth: 1, marginBottom: 10 },
  card: { flex: 1, margin: 5, padding: 10, borderWidth: 1, alignItems: 'center' },
  image: { width: "90%", height: 190 },
  price: { fontWeight: 'bold', marginTop: 5 },
    eyeButton: { paddingHorizontal: 1,marginRight:10 },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' },
});
