import React from "react";
import "../styles/Model.css";

const Modal = ({ committee, onClose }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-overlay">
                <div className="modal-content">
                    <span className="close-button" onClick={onClose}>X</span>
                    <div className="join-container">
                        <div className="card">
                            <h1 style={{color:'white'}}>Join as Admin</h1>
                            <input
                                type="email"
                                placeholder="Enter Committee Email"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Enter Password"
                                required
                            />
                            <button>Join</button>
                        </div>
                     <div className="card">
                            <h1 style={{color:'white'}}>Join as Co-com</h1>
                            <input
                                type="email"
                                placeholder="Enter Joining Code"
                                required
                            />
                            <button>Join</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;