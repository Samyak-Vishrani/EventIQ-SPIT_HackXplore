import React, { useState } from 'react';
import "../styles/Model.css"

const Modal = ({ committee, onClose }) => {
    const [showNewWindow, setShowNewWindow] = useState(false);

    const handleJoin = () => {
        setShowNewWindow(true);
    };

    const handleCloseNewWindow = () => {
        setShowNewWindow(false);
    };

    const [joiningCode, setJoiningCode] = useState(null);

    const handleJoiningCode = (e) => {
        setJoiningCode(e.target.value);
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
                                <input type="email" placeholder="Enter Committee Email" required />
                                <input type="password" placeholder="Enter Password" required />
                                <button>Join</button>
                            </div>
                            <div className="card">
                                <h1 style={{ color: 'white' }}>Join as Co-com</h1>
                                <input type="email" placeholder="Enter Joining Code" required onChange={handleJoiningCode} />
                                <button onClick={handleJoin}>Join</button>
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

    const [dept, setDept] = useState(["Creatives", "Technical", "Logistics", "Editorial", "Creatives", "Technical", "Logistics", "Editorial"]);
    const [selectedOption, setSelectedOption] = useState(null);

    // use this joining code to fetch the departments

    return (
        <div className="modal-backdrop">
            <div className="modal-overlay">
                <div className="modal-content" style={{width:'600px'}}>
                    <span className="close-button" onClick={onClose}>X</span>
                    <div className="join-container" style={{ flexDirection: 'column' }}>

                        <h1 style={{ color: 'white' }}>Select Department</h1>
                        <div className="options-container">
                            {
                                dept.map(option => {
                                    return <div
                                        onClick={() => setSelectedOption(option)}
                                        className={`option ${selectedOption === option ? "selected" : ""}`}
                                    >

                                        <div className="content">
                                            <h3 className="label">{option}</h3>
                                        </div>
                                        <div className="radio">
                                            {selectedOption === option && <div className="radio-inner"></div>}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;