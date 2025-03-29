// import React from 'react';
// import "../styles/eventDetails.css";

// const EventDetails = () => {
//   // Sample event data (replace with dynamic data as needed)
//   const event = {
//     title: "Tech Conference 2025",
//     createdBy: "Technology Committee",
//     venue: "Grand Hall, City Center",
//     date: "April 15, 2025",
//     time: "10:00 AM - 4:00 PM",
//     description: "An annual conference discussing the latest advancements in technology, AI, and software development.",
//     category: "Technology & Innovation",
//     posters: [
//       "https://via.placeholder.com/300", // Replace with actual poster URLs
//       "https://via.placeholder.com/300"
//     ],
//     details: "This event will bring together industry experts, developers, and tech enthusiasts to explore the future of technology. Join us for insightful talks, panel discussions, and networking sessions."
//   };

//   return (
//     <div className='event-details-page'>
//       <h1>{event.title}</h1>
//       <table className='event-info'>
//         <tr>
//           <td style={{width:'30%'}}><strong>Created by</strong></td>
//           <td>{event.createdBy}</td>
//         </tr>
//         <tr>
//           <td><strong>Venue</strong></td>
//           <td>{event.venue}</td>
//         </tr>
//         <tr>
//           <td><strong>Date</strong></td>
//           <td>{event.date}</td>
//         </tr>
//         <tr>
//           <td><strong>Time</strong></td>
//           <td>{event.time}</td>
//         </tr>
//         <tr>
//           <td><strong>Category</strong></td>
//           <td>{event.category}</td>
//         </tr>
//         <tr>
//           <td><strong>Description</strong></td>
//           <td>{event.description}</td>
//         </tr>
//       </table>

//       <div className='event-posters'>
//         <h2>Posters</h2>
//         <div className='poster-container'>
//           {event.posters.map((poster, index) => (
//             <img key={index} src={poster} alt={`Poster ${index + 1}`} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EventsDashboard.css';

const EventDetails = () => {
  const navigate = useNavigate();
  
  const [events, setEvents] = useState([
    { 
      id: 1, 
      eventName: "Annual Tech Symposium", 
      date: "2025-04-15", 
      time: "10:00 AM - 4:00 PM", 
      venue: "Main Auditorium", 
      category: "Technology" 
    },
    { 
      id: 2, 
      eventName: "Cultural Festival", 
      date: "2025-04-02", 
      time: "5:30 PM - 9:00 PM", 
      venue: "College Grounds", 
      category: "Cultural" 
    },
    { 
      id: 3, 
      eventName: "Career Fair", 
      date: "2025-03-30", 
      time: "9:00 AM - 3:00 PM", 
      venue: "Engineering Block", 
      category: "Career" 
    },
    { 
      id: 4, 
      eventName: "Alumni Meet", 
      date: "2025-04-10", 
      time: "6:00 PM - 8:30 PM", 
      venue: "Conference Hall", 
      category: "Networking" 
    },
    { 
      id: 5, 
      eventName: "Sports Tournament", 
      date: "2025-03-25", 
      time: "2:00 PM - 6:00 PM", 
      venue: "Sports Complex", 
      category: "Sports" 
    },
    { 
      id: 6, 
      eventName: "Workshop on AI", 
      date: "2025-04-08", 
      time: "11:00 AM - 1:00 PM", 
      venue: "CS Lab", 
      category: "Workshop" 
    },
    { 
      id: 1, 
      eventName: "Annual Tech Symposium", 
      date: "2025-04-15", 
      time: "10:00 AM - 4:00 PM", 
      venue: "Main Auditorium", 
      category: "Technology" 
    },
    { 
      id: 2, 
      eventName: "Cultural Festival", 
      date: "2025-04-02", 
      time: "5:30 PM - 9:00 PM", 
      venue: "College Grounds", 
      category: "Cultural" 
    },
    { 
      id: 3, 
      eventName: "Career Fair", 
      date: "2025-03-30", 
      time: "9:00 AM - 3:00 PM", 
      venue: "Engineering Block", 
      category: "Career" 
    },
    { 
      id: 4, 
      eventName: "Alumni Meet", 
      date: "2025-04-10", 
      time: "6:00 PM - 8:30 PM", 
      venue: "Conference Hall", 
      category: "Networking" 
    },
    { 
      id: 5, 
      eventName: "Sports Tournament", 
      date: "2025-03-25", 
      time: "2:00 PM - 6:00 PM", 
      venue: "Sports Complex", 
      category: "Sports" 
    },
    { 
      id: 6, 
      eventName: "Workshop on AI", 
      date: "2025-04-08", 
      time: "11:00 AM - 1:00 PM", 
      venue: "CS Lab", 
      category: "Workshop" 
    },
  ]);

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard-container">
      <div className="events-table-container">
        <h2>Events</h2>
        <table className="events-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr 
                key={event.id} 
                onClick={() => handleEventClick(event.id)}
                className="event-row"
              >
                <td className="event-name">{event.eventName}</td>
                <td>{event.venue}</td>
                <td>{formatDate(event.date)}</td>
                <td>{event.time}</td>
                <td>
                  <span className="category-badge">
                    {event.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventDetails;
