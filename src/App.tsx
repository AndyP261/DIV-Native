import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './contexts/AuthContext';
import { theme } from './theme/theme';
import LandingScreen from './screens/LandingScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/DashboardScreen';
import DocumentUploadScreen from './screens/DocumentUploadScreen';
import DocumentScannerScreen from './screens/DocumentScannerScreen';
import DocumentGalleryScreen from './screens/DocumentGalleryScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import TermsScreen from './screens/TermsScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import LearnMoreScreen from './screens/LearnMoreScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />
            <Stack.Screen name="DocumentScanner" component={DocumentScannerScreen} />
            <Stack.Screen name="DocumentGallery" component={DocumentGalleryScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="LearnMore" component={LearnMoreScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </AuthProvider>
    </PaperProvider>
  );
}