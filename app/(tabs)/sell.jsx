import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../../src/context/CartContext';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { colors } from '../../src/styles/colors';

const SellScreen = () => {
  const { addUserProduct } = useCart();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    if (!form.name || !form.description || !form.price || !form.image) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }
    setIsSubmitting(true);
    addUserProduct({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      image: form.image,
    });
    Alert.alert('Success', 'Item uploaded successfully!');
    setForm({ name: '', description: '', price: '', image: '' });
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text
            className="text-xl font-light mt-2 text-center"
            style={{ color: colors.white }}
          >
            Sell Your Item
          </Text>
          <FormField
            title="Item Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-7"
            placeholder="Enter item name"
            placeholderTextColor={colors.gray['100']}
          />
          <FormField
            title="Description"
            value={form.description}
            handleChangeText={(e) => setForm({ ...form, description: e })}
            otherStyles="mt-7"
            placeholder="Enter item description"
            placeholderTextColor={colors.gray['100']}
            multiline
            numberOfLines={4}
          />
          <FormField
            title="Price"
            value={form.price}
            handleChangeText={(e) => setForm({ ...form, price: e })}
            otherStyles="mt-7"
            keyboardType="numeric"
            placeholder="Enter price (e.g., 29.99)"
            placeholderTextColor={colors.gray['100']}
          />
          <FormField
            title="Image URL"
            value={form.image}
            handleChangeText={(e) => setForm({ ...form, image: e })}
            otherStyles="mt-7"
            placeholder="Enter image URL"
            placeholderTextColor={colors.gray['100']}
          />
          <CustomButton
            title="Upload Item"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            textStyles={{ color: colors.white, fontSize: 18, fontWeight: '600' }}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor={colors.primary} style="light" />
    </SafeAreaView>
  );
};

export default SellScreen;