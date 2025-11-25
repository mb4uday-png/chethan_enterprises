import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export default function AboutUs({ navigation }) {
  const { user, logout } = useAuth();
  const [companyName, setCompanyName] = useState('Chethan Enterprises');
  const [aboutText, setAboutText] = useState('Chethan Enterprises is a leading provider of high-quality services in various industries. We specialize in delivering innovative solutions tailored to our clients\' needs.');

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    const q = query(collection(db, 'company'));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      setCompanyName(data.name || companyName);
      setAboutText(data.aboutText || aboutText);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>About {companyName}</Text>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}>
        {aboutText}
      </Text>
      {!user && (
        <Button mode="contained" onPress={() => navigation.navigate('Services')} style={{ marginBottom: 10 }}>
          Services
        </Button>
      )}
      {user && (
        <Button mode="contained" onPress={handleLogout}>
          Logout
        </Button>
      )}
    </View>
  );
}