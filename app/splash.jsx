import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/signin');
    }, 3000); // Show splash for 3 seconds
  }, [router]);

  return (
    <View className="flex-1 bg-secondary justify-center items-center">
      <Image
        source={require('../images/splash1.png')}
        className="w-full h-1/2"
        resizeMode="contain"
      />
    </View>
  );
}