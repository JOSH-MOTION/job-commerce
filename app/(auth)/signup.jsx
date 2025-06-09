import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../src/styles/colors';

export default function SignUpScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor={colors.gray}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.gray}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.gray}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)') }
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => router.push('/(auth)/signin')}
        activeOpacity={0.7}
      >
        <Text style={styles.linkText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    color: colors.secondary,
    borderColor: colors.accent,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 16,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  link: {
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
});