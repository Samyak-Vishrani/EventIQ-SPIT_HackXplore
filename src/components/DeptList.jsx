import React, { useEffect, useState } from 'react';
import "../styles/deptList.css";
import members from "../assets/members.svg";
import task_incomplete from "../assets/task_incomplete.svg";
import url from "../apis/urls";
import Cookies from "js-cookie";

const DeptList = () => {

    const [dept, setDept] = useState([]);

    useEffect(() => {
        fetch(`${url}/committee/joiningCode/${Cookies.get("joining-code")}/departments`)
            .then((res) => res.json())
            .then((data) => {
                setDept(data.departments);
                console.log(data.departments);
            });
    }, []);

    return (
        <div className='dept-list-container'>
            <p className='com-name'>DJ Unicode</p>
            <h1>Departments</h1>

            {
                dept.map(item => {
                    return <div className='card'>
                        <div className='card-header'>
                            <h2>{item.dept_name} Department</h2>
                            {/* <p>{item.members} members <img src={members} /> </p> */}
                        </div>
                        {item.tasks.map(task => {
                            return <div className='task-list'>

                                <h3>Task Assigned (Not Completed) </h3>
                                <div className='task'> <img src={task_incomplete} /> {task}</div>

                            </div>
                        })}
                        <div className=''>

                        </div>
                    </div>
                })
            }

        </div>
    )
}

export default DeptList
