import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  FlatList,
  BackHandler,
  Alert,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { fetchProducts } from '../api/productService';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [cachedSearch, setCachedSearch] = useState('');

 
  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );


  useEffect(() => {
    fetchProducts().then(setProducts);

    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit and logout?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'YES',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 2000);

    return () => clearTimeout(timer);
  }, [search]);

  useFocusEffect(
    React.useCallback(() => {
      setSearch(cachedSearch);
    }, [cachedSearch])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Exit App', 'Are you sure you want to logout and exit?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Yes', onPress: () => BackHandler.exitApp() },
            ])
          }
        >
          <Icon
            name="arrow-back"
            size={24}
            color="#000"
            style={styles.eyeButton}
          />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartButtonHeader}
        >
          <Text style={styles.cartButtonTextHeader}>
            Go to Cart ({cartCount})
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartCount]); // 🔥 Important dependency

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('ProductDetail', { productId: item.id })
      }
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text numberOfLines={1}>{item.title}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products"
        placeholderTextColor="#000"
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
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },

  search: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },

  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },

  image: {
    width: '90%',
    height: 190,
  },

  price: {
    fontWeight: 'bold',
    marginTop: 5,
  },

  eyeButton: {
    paddingHorizontal: 1,
    marginRight: 10,
  },

  cartButtonHeader: {
    marginRight: 15,
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },

  cartButtonTextHeader: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
