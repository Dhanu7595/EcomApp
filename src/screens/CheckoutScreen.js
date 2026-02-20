import React from 'react';  
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

export default function CheckoutScreen({ navigation }) {
  const cartItems = useSelector(state => state.cart.cartItems);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const dispatch = useDispatch();

  const handlePayment = () => {
    Alert.alert(
      'Confirm Payment',
      `You will be charged ₹${total}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay Now',
          onPress: () => {
            setTimeout(() => {
              dispatch(clearCart());
              Alert.alert('Success', 'Payment successful!');
              navigation.navigate('Home');
            }, 2000); 
          }
        }
      ]
    );
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Add items to your cart to proceed to payment.</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.total}>Total Amount: ₹{total}</Text>
      <Button title="Proceed to Payment" onPress={handlePayment} color="#2196F3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  total: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  empty: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
});
