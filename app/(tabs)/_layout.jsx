import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Platform } from 'react-native';
import { useCart } from '../../src/context/CartContext';
import { colors } from '../../src/styles/colors';

export default function TabLayout() {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: colors.gray,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 90 : 80,
          paddingBottom: Platform.OS === 'ios' ? 30 : 15,
          paddingTop: 15,
          shadowColor: colors.secondary,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        
          // Gloss effect using white shadow above
          shadowColor: '#fff',       // white shadow to simulate gloss
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        
          // You can also add a subtle overlay color with opacity via a wrapper if needed
        },
        
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className={`w-[50px] h-[50px] justify-center items-center rounded-full ${focused ? 'bg-[#FFA00120]' : ''}`}>
              <Ionicons name="home" size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className={`w-[50px] h-[50px] justify-center items-center rounded-full ${focused ? 'bg-[#FFA00120]' : ''}`}>
              <Ionicons name="grid" size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className={`w-[50px] h-[50px] justify-center items-center rounded-full relative ${focused ? 'bg-[#FFA00120]' : ''}`}>
              <Ionicons name="cart" size={28} color={color} />
              {cartItemCount > 0 && (
                <View className="absolute top-0 right-0 bg-[#FFA001] rounded-full w-5 h-5 justify-center items-center">
                  <Text className="text-white text-[12px] font-semibold">{cartItemCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className={`w-[50px] h-[50px] justify-center items-center rounded-full ${focused ? 'bg-[#FFA00120]' : ''}`}>
              <Ionicons name="add-circle" size={28} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
