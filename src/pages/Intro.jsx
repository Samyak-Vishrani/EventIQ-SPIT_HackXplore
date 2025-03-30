import React, { useEffect, useState } from 'react';
import '../styles/Intro.css';
import bg_1 from "../assets/bg-1.jpg";
import { useNavigate } from 'react-router-dom';
import url from "../apis/urls";

const Intro = () => {

  const navigate = useNavigate();

  const [events, setEvents] = useState([
    { id: 1, eventName: "Annual Tech Symposium", committee: "Computer Science Club", date: "2025-04-15", venue: "Main Auditorium", status: "Upcoming" },
    { id: 2, eventName: "Cultural Festival", committee: "Arts Association", date: "2025-04-02", venue: "College Grounds", status: "Active" },
    { id: 3, eventName: "Career Fair", committee: "Placement Cell", date: "2025-03-30", venue: "Engineering Block", status: "Active" },
    { id: 4, eventName: "Alumni Meet", committee: "Alumni Association", date: "2025-04-10", venue: "Conference Hall", status: "Upcoming" },
    { id: 5, eventName: "Sports Tournament", committee: "Sports Committee", date: "2025-03-25", venue: "Sports Complex", status: "Completed" },
    { id: 6, eventName: "Workshop on AI", committee: "IEEE Student Chapter", date: "2025-04-08", venue: "CS Lab", status: "Upcoming" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.committee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === 'All' ||
      event.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Upcoming': return 'status-upcoming';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLogin = () => {
    navigate("/login");
  }

  const handleRegister = () => {
    navigate("/register");
  }

  return (
    <div className="intro-container">

      <div style={{ display: 'flex', justifyContent: 'right', padding: '2vh 2vw', marginTop: '5vh' }}>

        <button style={{ padding: '1vh 2vw', background: 'var(--light-red)', cursor: 'pointer', marginRight: '10px' }} onClick={handleLogin} > Login </button>

        <button style={{ padding: '1vh 2vw', background: 'var(--light-red)', cursor: 'pointer' }} onClick={handleRegister} > Register </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ textAlign: 'center', color: 'white', fontFamily: 'Quicksand', fontWeight: '1000', fontSize: '40px' }}>EventIQ</h1>
        <p style={{ color: 'white', textAlign: 'center', width: '60vw' }}>EventIQ streamlines event planning by empowering admins with AI-driven task management. It efficiently assigns tasks across departments—logistics, technical, and creatives—ensuring smooth coordination. Additionally, it features automated poster generation using simple, user-friendly prompts, making event branding effortless.</p>
        <img style={{ width: '80vw', textAlign: 'center' }} src={bg_1} />
      </div>

      <div className="intro-header">
        <h1>College Events Dashboard</h1>
        <div className="intro-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search events or committees"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="search-icon">🔍</span>
          </div>
          {/* <div className="filter-buttons">
            <button 
              className={selectedFilter === 'All' ? 'active' : ''} 
              onClick={() => handleFilterChange('All')}
            >
              All
            </button>
            <button 
              className={selectedFilter === 'Active' ? 'active' : ''} 
              onClick={() => handleFilterChange('Active')}
            >
              Active
            </button>
            <button 
              className={selectedFilter === 'Upcoming' ? 'active' : ''} 
              onClick={() => handleFilterChange('Upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={selectedFilter === 'Completed' ? 'active' : ''} 
              onClick={() => handleFilterChange('Completed')}
            >
              Completed
            </button>
          </div> */}
        </div>
      </div>

      <div className="intro-content">
        {/* <div className="events-summary">
          <div className="summary-card">
            <h3>Active Events</h3>
            <p>{events.filter(e => e.status === 'Active').length}</p>
          </div>
          <div className="summary-card">
            <h3>Upcoming Events</h3>
            <p>{events.filter(e => e.status === 'Upcoming').length}</p>
          </div>
          <div className="summary-card">
            <h3>Total Committees</h3>
            <p>{new Set(events.map(e => e.committee)).size}</p>
          </div>
        </div> */}

        <div className="events-table-container">
          <h2>Events List</h2>
          <table className="events-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Organizing Committee</th>
                <th>Date</th>
                {/* <th>Venue</th>
                <th>Status</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <tr key={event.id}>
                    <td className="event-name">{event.eventName}</td>
                    <td>{event.committee}</td>
                    <td>{formatDate(event.date)}</td>
                    {/* <td>{event.venue}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(event.status)}`}>
                        {event.status}
                      </span>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-events">No events found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Intro;