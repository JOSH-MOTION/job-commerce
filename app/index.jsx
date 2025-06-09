import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/styles/colors';

export default function SplashScreen() {
  const router = useRouter();
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the rotation animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Navigation timeout
    const timer = setTimeout(() => {
      router.replace('/(auth)/signin');
    }, 3000);
    return () => {
      clearTimeout(timer);
      spinAnim.stopAnimation();
    };
  }, [router, spinAnim]);

  // Interpolate rotation value
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: colors.background }}
    >
      <Image
        source={require('../images/logos.png')}
        className="w-48 h-1/2"
        resizeMode="contain"
      />
      <Animated.View
        className="w-12 h-12 border-4 border-t-4 rounded-full mt-4"
        style={[
          { borderColor: colors.gray, borderTopColor: colors.primary },
          { transform: [{ rotate: spin }] },
        ]}
      />
    </View>
  );
}