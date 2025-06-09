// components/PaystackPayment.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const PaystackPayment = ({ email, amount, onSuccess }) => {
  const publicKey = 'pk_live_04467860d5ef837a6ae5203bfb4e387075a4dcb9';

  const startPaystack = () => {
    Paystack.initialize({
      key: publicKey,
      amount: amount * 100, // in kobo
      email,
      onSuccess: (res) => {
        console.log('Payment success', res);
        onSuccess(res);
      },
      onCancel: () => {
        console.log('Payment cancelled');
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={startPaystack}
      style={{ backgroundColor: 'green', padding: 15, borderRadius: 8, alignItems: 'center' }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>Pay Now</Text>
    </TouchableOpacity>
  );
};

export default PaystackPayment;
