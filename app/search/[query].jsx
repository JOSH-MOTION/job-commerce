import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { products } from '../../src/data/products';
import ProductCard from '../../src/components/ProductCard';

export default function SearchResultsScreen() {
  const { query } = useLocalSearchParams();
  const decodedQuery = decodeURIComponent(query || '');
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(decodedQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(decodedQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-2xl font-bold text-secondary mb-4">
        Search Results for "{decodedQuery}"
      </Text>
      {filteredProducts.length === 0 ? (
        <Text className="text-secondary">No products found.</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}