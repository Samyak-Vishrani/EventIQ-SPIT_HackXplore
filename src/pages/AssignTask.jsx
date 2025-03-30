import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import "../styles/assignTask.css";
import Cookies from "js-cookie";
import url from "../apis/urls";

const AssignTask = () => {

    const [task, setTask] = useState("");

    const handleChangeTask = (e) => {
        setTask(e.target.value);
    }

    const [departments, setDepartments] = useState(["event", "creatives", "logistics"]);

    // useEffect(() => {
    //     fetch(`${url}/committee/joiningCode/${Cookies.get("joining-code")}/departments`)
    //         .then((res) => res.json())
    //         .then((data) => {
                
    //             data.departments.map(item => {
    //                 setDepartments(item.dept_name)
    //             })

    //             console.log(data.departments);
    //         });
    // }, [departments]);

    // console.log("departments achieved: ", departments);

    const handleAssign = () => {
        fetch("https://deepseekers-hackxplore-llm.onrender.com/analyze-task", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({"task": task, "departments": departments})
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
    }

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
                        onChange={handleChangeTask}
                    />
                    <button onClick={handleAssign}>Assign</button>
                </div>

                <p>Simply assign your task, and we’ll automatically allocate it to the most suitable department based on its role.<br /><br /> If multiple departments can handle the task, priority will be given to the one with the least workload.<br /><br /> To track your assigned tasks, visit the Checklist section.</p>
            </div>
        </div>
    )
}

export default AssignTask
