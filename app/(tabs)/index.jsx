import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';
import ProductCard from '../../src/components/ProductCard';
import { colors } from '../../src/styles/colors';

const HomeScreen = () => {
  const { getAllProducts } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(getAllProducts());
  const [notifications, setNotifications] = useState(3);
  const router = useRouter();
  const scaleAnim = new Animated.Value(1);

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      if (!query) {
        setFilteredProducts(getAllProducts());
        return;
      }
      const lowerQuery = query.toLowerCase();
      const filtered = getAllProducts().filter(
        (product) =>
          product.name.toLowerCase().includes(lowerQuery) ||
          product.description?.toLowerCase().includes(lowerQuery)
      );
      setFilteredProducts(filtered);
    },
    [getAllProducts]
  );

  const renderItem = useCallback(({ item }) => <ProductCard product={item} />, []);

  const onPressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-row justify-between items-center mx-4 mb-4">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.push('/profile')}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Ionicons
              name="person-circle-outline"
              size={40}
              color={colors.secondary.DEFAULT}
            />
          </Animated.View>
          <Text
            className="text-lg font-psemibold ml-2"
            style={{ color: colors.secondary.DEFAULT }}
          >
            John Doe
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="relative"
          onPress={() => setNotifications(0)}
        >
          <Ionicons
            name="notifications-outline"
            size={28}
            color={colors.secondary.DEFAULT}
          />
          {notifications > 0 && (
            <View className="absolute -top-1 -right-1 bg-primary rounded-full w-5 h-5 justify-center items-center">
              <Text
                className="text-xs font-psemibold"
                style={{ color: colors.white }}
              >
                {notifications}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Text
        className="text-2xl font-pbold mx-4 mb-4"
        style={{ color: colors.secondary.DEFAULT }}
      >
        Discover
      </Text>
      <TextInput
        className="bg-white p-4 rounded-xl text-base mx-4 mb-5 shadow-sm"
        style={{ color: colors.secondary.DEFAULT }}
        placeholder="Search products..."
        placeholderTextColor={colors.gray['100']}
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
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;