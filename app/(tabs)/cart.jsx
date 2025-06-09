// app/(tabs)/cart.jsx
import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  View,
  Animated,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '../../src/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CartScreen = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('online');
  const insets = useSafeAreaInsets();

  const renderItem = useCallback(
    ({ item }) => {
      const scaleValue = new Animated.Value(1);

      const onPressIn = () => {
        Animated.spring(scaleValue, {
          toValue: 0.95,
          useNativeDriver: true,
        }).start();
      };

      const onPressOut = () => {
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      };

      return (
        <View style={{
          flexDirection: 'row',
          backgroundColor: colors.white,
          borderRadius: 12,
          padding: 12,
          marginBottom: 12,
          marginHorizontal: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}>
          <Image
            source={{ uri: item.image }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
              marginRight: 12,
            }}
            resizeMode="contain"
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.secondary.DEFAULT,
                marginBottom: 4,
              }}
              numberOfLines={2}
            >
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: colors.primary,
                marginBottom: 8,
              }}
            >
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  width: 32,
                  height: 32,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.gray['50'],
                  borderRadius: 8,
                  marginHorizontal: 8,
                }}
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
              >
                <Animated.Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: colors.secondary.DEFAULT,
                    transform: [{ scale: scaleValue }],
                  }}
                >
                  -
                </Animated.Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.secondary.DEFAULT }}>
                {item.quantity}
              </Text>
              <TouchableOpacity
                style={{
                  width: 32,
                  height: 32,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.gray['50'],
                  borderRadius: 8,
                  marginHorizontal: 8,
                }}
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
              >
                <Animated.Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: colors.secondary.DEFAULT,
                    transform: [{ scale: scaleValue }],
                  }}
                >
                  +
                </Animated.Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={() => removeFromCart(item.id)}
          >
            <Ionicons name="trash-outline" size={20} color={colors.gray['100']} />
          </TouchableOpacity>
        </View>
      );
    },
    [removeFromCart, updateQuantity]
  );

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    if (paymentMethod === 'online') {
      router.push({
        pathname: '/payment',
        params: { amount: totalPrice },
      });
    } else {
      Alert.alert('Order Placed', 'You chose Pay on Delivery. Thank you!');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, paddingBottom: insets.bottom }}>
      <Text style={{
        fontSize: 24,
        fontWeight: '700',
        color: colors.secondary.DEFAULT,
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 16,
      }}>
        Your Cart
      </Text>

      {cartItems.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: colors.gray['100'], marginBottom: 16 }}>
            Your cart is empty.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 12,
            }}
            onPress={() => router.push('/(tabs)/products')}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.white }}>
              Shop Now
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingBottom: insets.bottom + 120,
            }}
            showsVerticalScrollIndicator={false}
          />

          <View
            style={{
              backgroundColor: colors.white,
              padding: 16,
              borderRadius: 12,
              marginHorizontal: 16,
              marginBottom: insets.bottom + 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View style={{ marginBottom: 16 }}>
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

            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.secondary.DEFAULT, marginBottom: 12 }}>
              Total: ${totalPrice}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: 'center',
              }}
              onPress={handleCheckout}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.white }}>
                {paymentMethod === 'online' ? 'Pay with Paystack' : 'Place Order'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;