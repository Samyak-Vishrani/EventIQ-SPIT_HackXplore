import React, { useState, useRef, useEffect } from 'react';
import '../styles/ProfileButton.css';
import profile from '../assets/profile.svg';

const ProfileButton = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  // Sample user data - replace with actual user data from your auth system
  const userData = user || {
    name: "John Smith",
    email: "john.smith@college.edu",
    // avatar: name.split(' ')
    // .map((part) => part.charAt(0).toUpperCase())
    // .join('')
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...");
    // e.g. authService.logout();
    // redirect to login page or home page
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current && 
        !modalRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-container">
      <button 
        ref={buttonRef} 
        className="profile-button" 
        onClick={toggleModal}
        aria-label="Open profile menu"
      >
        {/* {userData.avatarUrl ? (
          <img src={userData.avatarUrl} alt={userData.name} className="avatar-img" />
        ) : (
          <div className="avatar-placeholder">{userData.avatar}</div>
        )} */}
        <img src={profile} />
      </button>

      {isModalOpen && (
        <div className="profile-modal" ref={modalRef}>
          <div className="modal-header">
            {/* <div className="avatar-large">
              {userData.avatarUrl ? (
                <img src={userData.avatarUrl} alt={userData.name} />
              ) : (
                <span>{userData.avatar}</span>
              )}
            </div> */}
            <div className="user-info">
              <h3>{userData.name}</h3>
              <p>{userData.email}</p>
            </div>
          </div>
          <div className="modal-divider"></div>
          <div className="modal-actions">
            <button className="logout-button" onClick={handleLogout}>
              <span className="logout-icon">⏻</span>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;