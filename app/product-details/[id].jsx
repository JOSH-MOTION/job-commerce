import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { products } from '../../src/data/products';
import ProductCard from '../../src/components/ProductCard';
import { colors } from '../../src/styles/colors';

export default function SearchResultsScreen() {
  const { query } = useLocalSearchParams();
  const lowerQuery = query.toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description?.toLowerCase().includes(lowerQuery)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search: "{query}"</Text>
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
        />
      ) : (
        <Text style={styles.noResults}>No results found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: 16,
  },
  flatList: {
    paddingBottom: 20,
  },
  noResults: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 20,
  },
});