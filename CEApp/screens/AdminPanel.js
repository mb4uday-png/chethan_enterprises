import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, Linking, ScrollView, Text } from 'react-native';
import { Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import * as DocumentPicker from 'expo-document-picker';
import CryptoJS from 'crypto-js';

const key = 'ce-secret-key';

export default function AdminPanel() {
  const { logout } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [view, setView] = useState('submissions');
  const [companyName, setCompanyName] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    fetchSubmissions();
    fetchContacts();
    fetchCompany();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const q = query(collection(db, 'submissions'));
      const querySnapshot = await getDocs(q);
      const subs = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        try {
          const decryptedName = CryptoJS.AES.decrypt(data.name, key).toString(CryptoJS.enc.Utf8);
          const decryptedEmail = CryptoJS.AES.decrypt(data.email, key).toString(CryptoJS.enc.Utf8);
          const decryptedPhone = CryptoJS.AES.decrypt(data.phone, key).toString(CryptoJS.enc.Utf8);
          const decryptedDescription = CryptoJS.AES.decrypt(data.description, key).toString(CryptoJS.enc.Utf8);
          subs.push({
            id: docSnap.id,
            ...data,
            decryptedName,
            decryptedEmail,
            decryptedPhone,
            decryptedDescription,
          });
        } catch (decryptError) {
          console.error('Decryption failed for submission:', docSnap.id, decryptError);
          // Optionally, push with encrypted data or skip
          subs.push({
            id: docSnap.id,
            ...data,
            decryptedName: 'Decryption failed',
            decryptedEmail: 'Decryption failed',
            decryptedPhone: 'Decryption failed',
            decryptedDescription: 'Decryption failed',
          });
        }
      });
      setSubmissions(subs);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      Alert.alert('Error', 'Failed to fetch submissions');
    }
  };

  const fetchContacts = async () => {
    const q = query(collection(db, 'contacts'));
    const querySnapshot = await getDocs(q);
    const conts = [];
    querySnapshot.forEach((docSnap) => {
      conts.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    });
    setContacts(conts);
  };

  const fetchCompany = async () => {
    const q = query(collection(db, 'company'));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      setCompanyName(data.name || '');
      setAboutText(data.aboutText || '');
      setLogoUrl(data.logoUrl || '');
    }
  };

  const uploadEstimate = async (submissionId) => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const fileRef = ref(storage, `estimates/${submissionId}/${result.name}`);
      await uploadBytes(fileRef, blob);
      const estimateUrl = await getDownloadURL(fileRef);
      await updateDoc(doc(db, 'submissions', submissionId), {
        estimateUrl,
        estimateFileName: result.name,
        status: 'completed',
      });
      Alert.alert('Success', 'Estimate uploaded');
      fetchSubmissions();
    }
  };

  const uploadLogo = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const fileRef = ref(storage, `logos/${result.name}`);
      await uploadBytes(fileRef, blob);
      const url = await getDownloadURL(fileRef);
      setLogoUrl(url);
    }
  };

  const deleteSubmission = async (submission) => {
    Alert.alert(
      'Delete Submission',
      'Are you sure you want to delete this submission?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Delete design file if exists
              if (submission.fileUrl && submission.fileName) {
                const fileRef = ref(storage, `designs/${submission.userId}/${submission.fileName}`);
                await deleteObject(fileRef);
              }
              // Delete estimate file if exists
              if (submission.estimateUrl && submission.estimateFileName) {
                const fileRef = ref(storage, `estimates/${submission.id}/${submission.estimateFileName}`);
                await deleteObject(fileRef);
              }
              // Delete document
              await deleteDoc(doc(db, 'submissions', submission.id));
              Alert.alert('Success', 'Submission deleted');
              fetchSubmissions();
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const updateCompany = async () => {
    try {
      const companyDoc = doc(db, 'company', 'info');
      await setDoc(companyDoc, {
        name: companyName,
        aboutText,
        logoUrl,
      });
      Alert.alert('Success', 'Company info updated');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderSubmissionItem = ({ item }) => (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Title>{item.decryptedName}</Title>
        <Text>Email: {item.decryptedEmail}</Text>
        <Text>Phone: {item.decryptedPhone}</Text>
        <Text>Description: {item.decryptedDescription}</Text>
        <Text>Status: {item.status}</Text>
        {item.fileName && <Text>Uploaded File: {item.fileName}</Text>}
        {item.fileUrl && <Button onPress={() => Linking.openURL(item.fileUrl)}>Download Design</Button>}
        {item.status === 'pending' && <Button onPress={() => uploadEstimate(item.id)}>Upload Estimate</Button>}
        {item.status === 'completed' && item.estimateUrl && <Button onPress={() => Linking.openURL(item.estimateUrl)}>Download Estimate</Button>}
        <Button onPress={() => deleteSubmission(item)} style={{ marginTop: 10 }} mode="outlined" color="red">Delete Submission</Button>
      </Card.Content>
    </Card>
  );

  const renderContactItem = ({ item }) => (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Text>Email: {item.email}</Text>
        <Text>Message: {item.message}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={logout} style={{ margin: 10 }}>Logout</Button>
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <Button mode={view === 'submissions' ? 'contained' : 'outlined'} onPress={() => setView('submissions')} style={{ marginRight: 5 }}>Submissions</Button>
        <Button mode={view === 'contacts' ? 'contained' : 'outlined'} onPress={() => setView('contacts')} style={{ marginRight: 5 }}>Contacts</Button>
        <Button mode={view === 'company' ? 'contained' : 'outlined'} onPress={() => setView('company')}>Company</Button>
      </View>
      {view === 'submissions' && (
        <FlatList
          data={submissions}
          renderItem={renderSubmissionItem}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
        />
      )}
      {view === 'contacts' && (
        <FlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
        />
      )}
      {view === 'company' && (
        <ScrollView style={{ flex: 1, padding: 20 }}>
          <TextInput label="Company Name" value={companyName} onChangeText={setCompanyName} style={{ marginBottom: 10 }} />
          <TextInput label="About Text" value={aboutText} onChangeText={setAboutText} multiline style={{ marginBottom: 10 }} />
          <Button onPress={uploadLogo} style={{ marginBottom: 10 }}>Upload Logo</Button>
          {logoUrl && <Button onPress={() => Linking.openURL(logoUrl)}>View Logo</Button>}
          <Button mode="contained" onPress={updateCompany}>Update Company Info</Button>
        </ScrollView>
      )}
    </View>
  );
}