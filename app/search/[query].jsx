// app/search/[query].jsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCart } from '../../src/context/CartContext';
import ProductCard from '../../src/components/ProductCard';
import { colors } from '../../src/styles/colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchResultsScreen() {
  const { query } = useLocalSearchParams();
  const { getAllProducts } = useCart();
  const insets = useSafeAreaInsets();

  const lowerQuery = query.toLowerCase();
  const filteredProducts = getAllProducts().filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description?.toLowerCase().includes(lowerQuery)
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, paddingBottom: insets.bottom }}>
      <View style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
      }}>
        <Text style={{
          fontSize: 28,
          fontWeight: '700',
          color: colors.secondary.DEFAULT,
          marginBottom: 16,
        }}>
          Search: "{query}"
        </Text>
        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard product={item} />}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: insets.bottom + 20,
            }}
          />
        ) : (
          <Text style={{
            fontSize: 16,
            color: colors.gray['100'],
            textAlign: 'center',
            marginTop: 20,
          }}>
            No results found.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}