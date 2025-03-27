import React from 'react';
import ResponsiveAppBar from '../components/Navbar';
import Sidebar from '../components/Sidebar.jsx';

const Dashboard = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Sidebar />
    </div>
  )
}

export default Dashboard;