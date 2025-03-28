import React, { useState } from 'react';
import "../styles/deptList.css";
import members from "../assets/members.svg";
import task_incomplete from "../assets/task_incomplete.svg";

const DeptList = () => {

    const [dept, setDept] = useState([
        {
            name: 'Creatives',
            members: 10,
            taskAssign: ["make poster", "decorate room 61"],
            completedTask: 2,
        },
        {
            name: 'Technical',
            members: 5,
            taskAssign: ["make event website"],
            completedTask: 0,
        }
    ]);

    return (
        <div className='dept-list-container'>
            <p className='com-name'>DJ Unicode</p>
            <h1>Departments</h1>

            {
                dept.map(item => {
                    return <div className='card'>
                        <div className='card-header'>
                            <h2>{item.name} Department</h2>
                            <p>{item.members} members <img src={members} /> </p>
                        </div>
                        <div className='task-list'>
                            <h3>Task Assigned (Not Completed) </h3>
                            {item.taskAssign.map(task => {
                                return <div className='task'> <img src={task_incomplete} /> {task}</div>
                            })}
                        </div>
                        <div className=''>

                        </div>
                    </div>
                })
            }

        </div>
    )
}

export default DeptList
