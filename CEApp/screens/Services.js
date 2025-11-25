import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CryptoJS from 'crypto-js';

export default function Services() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setFile(result);
    }
  };

  const submitRequest = async () => {
    if (!name || !email || !phone || !description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      let fileUrl = '';
      if (file) {
        const response = await fetch(file.uri);
        const blob = await response.blob();
        const fileRef = ref(storage, `designs/${user.uid}/${file.name}`);
        await uploadBytes(fileRef, blob);
        fileUrl = await getDownloadURL(fileRef);
      }
      await addDoc(collection(db, 'submissions'), {
        userId: user.uid,
        name: CryptoJS.AES.encrypt(name, 'ce-secret-key').toString(),
        email: CryptoJS.AES.encrypt(email, 'ce-secret-key').toString(),
        phone: CryptoJS.AES.encrypt(phone, 'ce-secret-key').toString(),
        description: CryptoJS.AES.encrypt(description, 'ce-secret-key').toString(),
        fileUrl,
        status: 'pending',
        createdAt: new Date(),
      });
      Alert.alert('Success', 'Estimate request submitted');
      setName('');
      setPhone('');
      setDescription('');
      setFile(null);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Request Estimate</Text>
      <TextInput label="Name" value={name} onChangeText={setName} style={{ marginBottom: 10 }} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 10 }} />
      <TextInput label="Phone" value={phone} onChangeText={setPhone} style={{ marginBottom: 10 }} />
      <TextInput label="Description" value={description} onChangeText={setDescription} multiline style={{ marginBottom: 10 }} />
      <Button onPress={pickDocument} style={{ marginBottom: 10 }}>Upload Design</Button>
      {file && <Text>Selected: {file.name}</Text>}
      <Button mode="contained" onPress={submitRequest} loading={loading} disabled={loading}>Submit Request</Button>
    </ScrollView>
  );
}