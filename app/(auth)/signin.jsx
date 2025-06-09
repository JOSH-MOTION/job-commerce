import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, Link } from 'expo-router';
import { images } from '../../constants'; // Assuming you have this set up
import { colors } from '../../src/styles/colors'; // Reusing your colors
import FormField from '../components/FormField'; // Assuming this component exists
import CustomButton from '../components/CustomButton'; // Assuming this component exists

const SignInScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }
    setIsSubmitting(true);
    // Simulate navigation without backend
    router.push('/(tabs)');
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logocolor} // Adjust to your image source
            resizeMode="contain"
            className="w-[120px] h-[80px] text-white"
          />
          <Text
            className="text-xl text-white font-light mt-2"
            style={{ color: colors.white }}
          >
            Login to JoshCommerce
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor={colors.gray}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={colors.gray}
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            textStyles={{ color: colors.white, fontSize: 18, fontWeight: '600' }}
          />

          <View className="justify-center pt-2 flex-row gap-2">
            <Text
              className="text-sm font-normal"
              style={{ color: colors.white }}
            >
              Don't have an account?
            </Text>
            <Link
              href="/(auth)/signup"
              className="text-sm font-bold"
              style={{ color: colors.accent }}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor={colors.primary} style="light" />
    </SafeAreaView>
  );
};

export default SignInScreen;