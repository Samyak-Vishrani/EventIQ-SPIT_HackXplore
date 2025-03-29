import React from 'react'
import NavbarCocom from '../components/NavbarCocom'
import SidebarCocom from '../components/SidebarCocom'
import EventDetails from './EventDetails'

const DashboardCoCom = () => {
  return (
    <div>
      <NavbarCocom />
      <SidebarCocom />
      <EventDetails />
    </div>
  )
}

export default DashboardCoCom
