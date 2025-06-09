import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, Link } from 'expo-router';
import { colors } from '../../src/styles/colors';
import { images } from '../../constants';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';

const Signup = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }
    setIsSubmitting(true);
    // Frontend-only navigation
    router.push('/(tabs)');
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary" >
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logocolor}
            resizeMode="contain"
            className="w-[120px] h-[80px]"
          />
          <Text
            className="text-xl font-light mt-2"
            style={{ color: colors.white }}
          >
            Sign up to JoshCommerce
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            placeholder="Username"
            placeholderTextColor={colors.gray}
          />

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
            title="Sign Up"
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
              Have an account already?
            </Text>
            <Link
              href="/signin"
              className="text-sm font-bold"
              style={{ color: colors.accent }}
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor={colors.primary} style="light" />
    </SafeAreaView>
  );
};

export default Signup;