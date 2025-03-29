import React, { useState, useEffect } from 'react';
import "../styles/Model.css";
import url from "../apis/urls";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const Modal = ({ committee, onClose }) => {
    const navigate = useNavigate();

    const [showNewWindow, setShowNewWindow] = useState(false);
    const [adminData, setAdminData] = useState({
        email: "",
        password: "",
    });
    const [joiningCode, setJoiningCode] = useState("");

    const handleChangeAdmin = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    const handleCloseNewWindow = () => {
        setShowNewWindow(false);
    };

    const handleAdminReq = () => {
        if (adminData.email && adminData.password) {
            fetch(`${url}/committee-member/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(adminData),
            })
                .then(response => response.json())
                .then(data => {

                    console.log("Admin response:", data);
                    if(data.message === "Login successful") {
                        navigate("/dashboard");   
                    }

                })
                .catch(error => console.error("Error joining admin:", error));
        }
    }

    const handleCocomReq = () => {
        if (joiningCode) {
            fetch(`${url}/committee-member/cocom/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "userId": Cookies.get("userId"), joiningCode }),
            })
                .then(response => response.json())
                .then(data => {
                    setShowNewWindow(true);
                    console.log("Co-com response:", data)
                })
                .catch(error => console.error("Error joining co-com:", error));
        }
    }

    return (
        <>
            <div className="modal-backdrop">
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={onClose}>X</span>
                        <div className="join-container">
                            <div className="card">
                                <h1 style={{ color: 'white' }}>Join as Admin</h1>

                                <input type="email" name="email" placeholder="Enter Committee Email" required onChange={handleChangeAdmin} value={adminData.email} />

                                <input type="password" name="password" placeholder="Enter Password" required onChange={handleChangeAdmin} value={adminData.password} />

                                <button onClick={handleAdminReq}>Join</button>
                            </div>
                            <div className="card">
                                <h1 style={{ color: 'white' }}>Join as Co-com</h1>
                                <input type="text" placeholder="Enter Joining Code" required onChange={(e) => setJoiningCode(e.target.value)} value={joiningCode} />
                                <button onClick={handleCocomReq}>Join</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showNewWindow && <NewWindow onClose={handleCloseNewWindow} joiningCode={joiningCode} />}
        </>
    );
};

const NewWindow = ({ onClose, joiningCode }) => {
    const [dept, setDept] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        fetch(`${url}/committee/joiningCode/${joiningCode}/departments`)
            .then((res) => res.json())
            .then((data) => {
                setDept(data.departments);
                console.log(data.departments);
    });
    }, []);

    return (
        <div className="modal-backdrop">
            <div className="modal-overlay">
                <div className="modal-content" style={{ width: '600px' }}>
                    <span className="close-button" onClick={onClose}>X</span>
                    <div className="join-container" style={{ flexDirection: 'column' }}>
                        <h1 style={{ color: 'white' }}>Select Department</h1>
                        <div className="options-container">
                            {dept.map(option => (
                                <div key={option._id} onClick={() => setSelectedOption(option.dept_name)} className={`option ${selectedOption === option.dept_name ? "selected" : ""}`}>
                                    <div className="content">
                                        <h3 className="label">{option.dept_name}</h3>
                                    </div>
                                    <div className="radio">
                                        {selectedOption === option.dept_name && <div className="radio-inner"></div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;