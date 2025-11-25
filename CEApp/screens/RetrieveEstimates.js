import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import CryptoJS from 'crypto-js';
import { Linking } from 'react-native';

const key = 'ce-secret-key';

export default function RetrieveEstimates({ navigation }) {
  const [input, setInput] = useState('');
  const [estimates, setEstimates] = useState([]);

  const search = async () => {
    const q = query(collection(db, 'submissions'), where('status', '==', 'completed'));
    const querySnapshot = await getDocs(q);
    const ests = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const decryptedEmail = CryptoJS.AES.decrypt(data.email, key).toString(CryptoJS.enc.Utf8);
      const decryptedPhone = CryptoJS.AES.decrypt(data.phone, key).toString(CryptoJS.enc.Utf8);
      if (decryptedEmail === input || decryptedPhone === input) {
        ests.push({
          id: docSnap.id,
          estimateUrl: data.estimateUrl,
          name: CryptoJS.AES.decrypt(data.name, key).toString(CryptoJS.enc.Utf8),
        });
      }
    });
    setEstimates(ests);
  };

  const renderItem = ({ item }) => (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Title>Estimate for {item.name}</Title>
        <Button onPress={() => Linking.openURL(item.estimateUrl)}>Download Estimate</Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput label="Enter Email or Phone" value={input} onChangeText={setInput} />
      <Button onPress={search} style={{ marginTop: 10 }}>Search</Button>
      <Button onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>Back</Button>
      <FlatList
        data={estimates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}