import { Stack } from 'expo-router';
import { CartProvider } from '../src/context/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="index" />
        <Stack.Screen name="search/[query]" />
        <Stack.Screen name="product-details/[id]" />
        <Stack.Screen name="profile" />
      </Stack>
    </CartProvider>
  );
}