import React from 'react';
import ResponsiveAppBar from '../components/Navbar';
import Sidebar from '../components/Sidebar.jsx';
import EventDetails from './EventDetails.jsx';

const Dashboard = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Sidebar />
      <EventDetails />
    </div>
  )
}

export default Dashboard;