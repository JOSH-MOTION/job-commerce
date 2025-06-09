import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { products } from '../../src/data/products';
import ProductCard from '../../src/components/ProductCard';
import { colors } from '../../src/styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [notifications, setNotifications] = useState(3); // Mock notifications
  const router = useRouter();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredProducts(products);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description?.toLowerCase().includes(lowerQuery)
    );
    setFilteredProducts(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => router.push('/profile')} // Placeholder route
        >
          <Ionicons name="person-circle-outline" size={40} color={colors.secondary} />
          <Text style={styles.profileName}>John Doe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => setNotifications(0)} // Clear notifications on tap
        >
          <Ionicons name="notifications-outline" size={28} color={colors.secondary} />
          {notifications > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>{notifications}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Discover</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor={colors.gray}
        value={searchQuery}
        onChangeText={handleSearch}
        onSubmitEditing={() => {
          if (searchQuery.trim()) {
            router.push(`/search/${encodeURIComponent(searchQuery)}`);
          }
        }}
      />
      <FlatList
        data={filteredProducts}
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
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary,
    marginLeft: 8,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: colors.secondary,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  flatList: {
    paddingBottom: 20,
  },
});