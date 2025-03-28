import React from 'react'
import ResponsiveAppBar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import DeptList from '../components/DeptList'

const Department = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Sidebar />
      <DeptList />
    </div>
  )
}

export default Department
