import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';

export default function CartScreen({ navigation }) {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty ".</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain"/>
            <View style={styles.details}>
              <Text>{item.title}</Text>
              <Text>Price: ₹{item.price}</Text>
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Button title="-" onPress={() => dispatch(decreaseQuantity(item.id))} />
    <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
  <Button title="+" onPress={() => dispatch(increaseQuantity(item.id))} />
</View>
              <Text>Total: ₹{(item.price * item.quantity).toFixed(2)}</Text>
              <Button title="Remove" onPress={() => dispatch(removeFromCart(item.id))} />
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Cart Total: ₹{total}</Text>
      <Button title="Checkout" onPress={() => navigation.navigate('Checkout')} style={styles.Button}/>
      <Button title="Clear Cart" onPress={() => dispatch(clearCart())} style={styles.Button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  itemContainer: { flexDirection: 'row', marginBottom: 15, borderBottomWidth: 1, paddingBottom: 10 },
  image: { width: "30%", height: "100%", marginRight: 10,alignSelf:'center' },
  details: { flex: 1, justifyContent: 'space-around' },
  total: { fontWeight: 'bold', fontSize: 16, marginTop: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, marginBottom: 20 },
  Button:{margin:10,}
});
