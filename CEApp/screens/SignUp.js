import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();

  const handleSignUp = async () => {
    try {
      await signup(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button mode="contained" onPress={handleSignUp} style={{ marginTop: 10 }}>Sign Up</Button>
      <Button onPress={() => navigation.navigate('Login')} style={{ marginTop: 10 }}>Login</Button>
    </View>
  );
}