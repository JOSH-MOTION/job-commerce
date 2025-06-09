import React from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet } from 'react-native';
import { products } from '../../src/data/products';
import ProductCard from '../../src/components/ProductCard';
import { colors } from '../../src/styles/colors';

export default function ProductsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: 16,
    marginHorizontal: 16,
    marginTop: 20,
  },
  flatList: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
});