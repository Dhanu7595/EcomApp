import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { fetchProductById } from '../api/productService';

export default function ProductDetailScreen({ route,navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductById(productId).then(setProduct);
  }, [productId]);

  if (!product) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain"/>
      <Text style={styles.title}>{product.title}</Text>
      <Text>₹{product.price}</Text>
      <View style={styles.ReviewText}>
      <Text>{product.description}</Text>
      <Text>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>
      </View>
      <Button
        title="Add to Cart"
        onPress={() => {
          dispatch(addToCart(product));
          Alert.alert('Success', 'Item added to cart!');
           navigation.navigate('Home', { clearSearch: true });
        }}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: "100%", height: "50%", alignSelf: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  ReviewText:{marginBottom:20,marginTop:5}
});
