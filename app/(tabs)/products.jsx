import React, { useCallback } from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import { useCart } from '../../src/context/CartContext';
import ProductCard from '../../src/components/ProductCard';
import { colors } from '../../src/styles/colors';

const ProductsScreen = () => {
  const { getAllProducts } = useCart();

  const renderItem = useCallback(({ item }) => <ProductCard product={item} />, []);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <Text
        className="text-2xl font-pbold mx-4 mt-5 mb-4"
        style={{ color: colors.secondary.DEFAULT }}
      >
        Products
      </Text>
      <FlatList
        data={getAllProducts()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
      />
    </SafeAreaView>
  );
};

export default ProductsScreen;