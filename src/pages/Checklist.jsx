import React from 'react'
import ResponsiveAppBar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TaskList from '../components/TaskList'

const Checklist = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Sidebar />
      <TaskList />
    </div>
  )
}

export default Checklist
