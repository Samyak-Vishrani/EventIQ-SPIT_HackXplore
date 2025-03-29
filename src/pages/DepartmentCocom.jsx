import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import "../styles/deptCocom.css";
import NavbarCocom from '../components/NavbarCocom';
import SidebarCocom from '../components/SidebarCocom';
import url from "../apis/urls"

const DepartmentCocom = () => {

    const [deptList, setDeptList] = useState([]);

    const [department, setDepartment] = useState(null);

    const [taskList, setTaskList] = useState(["Make coffee", "play Guitar"]);

    useEffect(() => {
        setDepartment(Cookies.get("department-cocom"));
    }, [])

    useEffect(() => {
        fetch(`${url}/committee/joiningCode/${Cookies.get("joining-code")}/departments`)
        .then((res) => res.json())
        .then((data) => {
            setDeptList(data.departments);
            console.log(data);
    })
    },[])

    useEffect(()=>{
        deptList.map(item => {
            if(item.dept_name === department) {
                setTaskList(item.tasks);
            }
        })
    }, [])

    console.log("dept list", deptList);
    console.log("task list", taskList);

    const handleDone = () => {

        fetch(`${url}`)

    }

    return (
        <>
            <NavbarCocom />
            <SidebarCocom />
            <div className='dept-cocom-page'>
                <h1>Your Department - {department}</h1>
                <div className='task-list'>

                    {
                        taskList.length != 0 ? <h2> These are the tasks assigned to your department </h2> : <h2>No Task assigned to Your Department</h2>
                    }
                    
                    {
                        taskList.map(item => {
                            return <div className='task'>
                                {item}
                                <button onClick={handleDone}>Done</button>
                            </div>
                        })
                    }
                </div>
            </div>
        </>

    )
}

export default DepartmentCocom
