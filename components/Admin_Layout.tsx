import React from 'react';
import { View } from 'react-native';
import Sidebar from '../components/Admin_sidebar';
import Navbar from '../components/Admin_navbar';

const AdminPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Sidebar onToggle={handleToggleSidebar} />
      <View style={{ flex: 1 }}>
        <Navbar />
        <View style={{ padding: 16 }}>
          {children}
        </View>
      </View>
    </View>
  );
};

export default AdminPanel;
