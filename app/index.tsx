import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../components/Authentication_context';
import AppNavigator from './_layout';

const Index = () => (
  <NavigationContainer>
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  </NavigationContainer>
);

export default Index;
