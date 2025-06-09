// src/components/ProductCard.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../styles/colors';

const ProductCard = ({ product }) => {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 12,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <TouchableOpacity
        onPress={() => router.push(`/product/${product.id}`)} // For browsing/details
      >
        <Image
          source={{ uri: product.image }}
          style={{
            width: '100%',
            height: 128,
            borderRadius: 8,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.secondary.DEFAULT,
            marginTop: 8,
          }}
          numberOfLines={2}
        >
          {product.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: colors.primary,
            marginTop: 4,
          }}
        >
          ${product.price.toFixed(2)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 8,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 8,
        }}
        onPress={() => router.push(`/order/${product.id}`)} // For ordering
      >
        <Text style={{ fontSize: 14, fontWeight: '600', color: colors.white }}>
          Buy Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;