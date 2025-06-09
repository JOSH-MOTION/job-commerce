import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '../context/CartContext';
import { colors } from '../styles/colors';

export default function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/product-details/${product.id}`)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.price}>${product.price}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(product)}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.15,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  addButton: {
    backgroundColor: colors.accent,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
  },
});