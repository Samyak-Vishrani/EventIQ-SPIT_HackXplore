import React from 'react'
import ResponsiveAppBar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import "../styles/assignTask.css"

const AssignTask = () => {
    return (
        <div>
            <ResponsiveAppBar />
            <Sidebar />
            <div className='assign-task-container'>
                <h1>Assign New Task</h1>

                <div className='input-box'>
                    <input
                        type="text"
                        placeholder="Enter the task"
                        className='task-input'
                    />
                    <button>Assign</button>
                </div>

                <p>Simply assign your task, and we’ll automatically allocate it to the most suitable department based on its role.<br/><br/> If multiple departments can handle the task, priority will be given to the one with the least workload.<br/><br/> To track your assigned tasks, visit the Departments section.</p>
            </div>
        </div>
    )
}

export default AssignTask
