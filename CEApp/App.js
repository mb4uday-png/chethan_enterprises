import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import './styles.css';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Services from './screens/Services';
import AboutUs from './screens/AboutUs';
import ContactUs from './screens/ContactUs';
import MyEstimates from './screens/MyEstimates';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import AdminPanel from './screens/AdminPanel';
import RetrieveEstimates from './screens/RetrieveEstimates';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ animationEnabled: Platform.OS !== 'web' }}>
      <Tab.Screen name="Services" component={Services} />
      <Tab.Screen name="My Estimates" component={MyEstimates} />
      <Tab.Screen name="Retrieve Estimates" component={RetrieveEstimates} />
      <Tab.Screen name="About Us" component={AboutUs} />
      <Tab.Screen name="Contact Us" component={ContactUs} />
    </Tab.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ animationEnabled: Platform.OS !== 'web' }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="RetrieveEstimates" component={RetrieveEstimates} />
    </Stack.Navigator>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or a loading screen
  }

  if (user && user.email === 'admin@ce.com') {
    return (
      <NavigationContainer>
        <AdminPanel />
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }

  if (user) {
    return (
      <NavigationContainer>
        <TabNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AboutUs" screenOptions={{ animationEnabled: Platform.OS !== 'web' }}>
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="Services" component={AuthNavigator} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }
}

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <AppContent />
      </PaperProvider>
    </AuthProvider>
  );
}
