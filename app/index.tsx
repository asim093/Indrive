import React from 'react';
import { AuthProvider } from '../components/Authentication_context'; // Adjust the path as necessary
import RootLayout from './_layout';  // Import RootLayout here
import AddDriver from './Admin/Adddriver';
import EditDriver from './Admin/Editdriver';
import Admin from './Admin/Main';
import ShowDriver from './Admin/Showdriver';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Home from './UserPanel/Home';

const Index = () => {
  return (
    <AuthProvider>
      <RootLayout/>
    </AuthProvider>
  );
};

export default Index;
