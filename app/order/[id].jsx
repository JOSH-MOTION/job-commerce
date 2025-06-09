// app/order/[id].jsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCart } from '../../src/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock reviews data
const mockReviews = [
  { id: '1', user: 'Alice', rating: 4, comment: 'Great product, fast delivery!' },
  { id: '2', user: 'Bob', rating: 5, comment: 'Really love the quality!' },
  { id: '3', user: 'Charlie', rating: 3, comment: 'Good but could be cheaper.' },
];

// Mock seller data
const mockSellerData = {
  contactName: 'Jane Seller',
  phone: '+1234567890',
  email: 'seller@example.com',
  location: '123 Market Street, New York, NY',
};

const OrderConfirmationScreen = () => {
  const { id } = useLocalSearchParams();
  const { getAllProducts, addToCart } = useCart();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [paymentMethod, setPaymentMethod] = useState('online');

  // Debug product ID and data
  console.log('OrderConfirmationScreen - Product ID:', id);
  console.log('OrderConfirmationScreen - All Products:', getAllProducts());

  const product = getAllProducts().find((p) => p.id === id || p.id.toString() === id);

  if (!product) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: colors.gray['100'], textAlign: 'center' }}>
            Product not found
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 12,
              marginTop: 16,
            }}
            onPress={() => router.push('/(tabs)/index')}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.white }}>
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleConfirmOrder = () => {
    addToCart(product);
    if (paymentMethod === 'online') {
      router.push({
        pathname: '/payment',
        params: { amount: product.price.toFixed(2) },
      });
    } else {
      Alert.alert('Order Placed', 'You chose Pay on Delivery. Thank you!');
      router.push('/(tabs)/cart');
    }
  };

  const renderReview = ({ item }) => (
    <View style={{
      backgroundColor: colors.white,
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
      marginHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.secondary.DEFAULT }}>
          {item.user}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name={i < item.rating ? 'star' : 'star-outline'}
              size={16}
              color={colors.primary}
            />
          ))}
        </View>
      </View>
      <Text style={{ fontSize: 14, color: colors.gray['100'], marginTop: 4 }}>
        {item.comment}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, paddingBottom: insets.bottom }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 16,
          marginVertical: 16,
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.secondary.DEFAULT} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '700', color: colors.secondary.DEFAULT }}>
            Order Confirmation
          </Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/cart')}>
            <Ionicons name="cart-outline" size={24} color={colors.secondary.DEFAULT} />
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 16, marginTop: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.secondary.DEFAULT }}>
            {product.name}
          </Text>
          <Image
            source={{ uri: product.image }}
            style={{
              width: '100%',
              height: 128,
              borderRadius: 8,
              marginTop: 8,
            }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.primary, marginTop: 8 }}>
            ${product.price.toFixed(2)}
          </Text>
          <Text style={{ fontSize: 14, color: colors.gray['100'], marginTop: 8 }}>
            {product.description || 'No description available.'}
          </Text>
        </View>

        <View style={{ marginHorizontal: 16, marginTop: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.secondary.DEFAULT, marginBottom: 8 }}>
            Seller Information
          </Text>
          <View style={{
            backgroundColor: colors.white,
            padding: 12,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.secondary.DEFAULT }}>
              Name: {mockSellerData.contactName}
            </Text>
            <Text style={{ fontSize: 14, color: colors.gray['100'], marginTop: 4 }}>
              Phone: {mockSellerData.phone}
            </Text>
            <Text style={{ fontSize: 14, color: colors.gray['100'], marginTop: 4 }}>
              Email: {mockSellerData.email}
            </Text>
            <Text style={{ fontSize: 14, color: colors.gray['100'], marginTop: 4 }}>
              Location: {mockSellerData.location}
            </Text>
          </View>
        </View>

        <View style={{ marginHorizontal: 16, marginTop: 24, marginBottom: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.secondary.DEFAULT, marginBottom: 8 }}>
            Reviews
          </Text>
          {mockReviews.length > 0 ? (
            <FlatList
              data={mockReviews}
              renderItem={renderReview}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          ) : (
            <Text style={{ fontSize: 14, color: colors.gray['100'] }}>
              No reviews yet.
            </Text>
          )}
        </View>

        <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.secondary.DEFAULT, marginBottom: 8 }}>
            Choose Payment Method
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                marginRight: 8,
                borderRadius: 12,
                alignItems: 'center',
                backgroundColor: paymentMethod === 'online' ? colors.primary : colors.gray['50'],
              }}
              onPress={() => setPaymentMethod('online')}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: paymentMethod === 'online' ? colors.white : colors.black,
                }}
              >
                Pay Online
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                marginLeft: 8,
                borderRadius: 12,
                alignItems: 'center',
                backgroundColor: paymentMethod === 'delivery' ? colors.primary : colors.gray['50'],
              }}
              onPress={() => setPaymentMethod('delivery')}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: paymentMethod === 'delivery' ? colors.white : colors.black,
                }}
              >
                Pay on Delivery
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginHorizontal: 16, marginBottom: insets.bottom + 16 }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
            }}
            onPress={handleConfirmOrder}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.white }}>
              {paymentMethod === 'online' ? 'Proceed to Payment' : 'Confirm Order'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderConfirmationScreen;