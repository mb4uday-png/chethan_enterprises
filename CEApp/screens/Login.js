import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button mode="contained" onPress={handleLogin} style={{ marginTop: 10 }}>Login</Button>
      <Button onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 10 }}>Sign Up</Button>
      <Button onPress={() => navigation.navigate('RetrieveEstimates')} style={{ marginTop: 10 }}>Retrieve Estimates</Button>
    </View>
  );
}