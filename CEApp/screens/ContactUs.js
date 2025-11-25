import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submitMessage = async () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        createdAt: new Date(),
      });
      Alert.alert('Success', 'Message sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Contact Chethan Enterprises</Text>
      <TextInput label="Name" value={name} onChangeText={setName} style={{ marginBottom: 10 }} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 10 }} />
      <TextInput label="Message" value={message} onChangeText={setMessage} multiline style={{ marginBottom: 10 }} />
      <Button mode="contained" onPress={submitMessage} loading={loading} disabled={loading}>Send Message</Button>
      <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>Contact Info</Text>
      <Text>Email: info@chethanenterprises.com</Text>
      <Text>Phone: +1 234 567 890</Text>
      <Text>Address: 123 Business St, City, State</Text>
    </ScrollView>
  );
}