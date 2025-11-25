import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Linking } from 'react-native';

export default function MyEstimates() {
  const { user } = useAuth();
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
    fetchEstimates();
  }, []);

  const fetchEstimates = async () => {
    const q = query(collection(db, 'submissions'), where('userId', '==', user.uid), where('status', '==', 'completed'));
    const querySnapshot = await getDocs(q);
    const ests = [];
    querySnapshot.forEach((docSnap) => {
      ests.push({
        id: docSnap.id,
        estimateUrl: docSnap.data().estimateUrl,
      });
    });
    setEstimates(ests);
  };

  const renderItem = ({ item }) => (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Title>Estimate</Title>
        <Button onPress={() => Linking.openURL(item.estimateUrl)}>Download</Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={estimates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}