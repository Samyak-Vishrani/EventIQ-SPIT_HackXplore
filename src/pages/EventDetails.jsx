import React from 'react';
import "../styles/eventDetails.css";

const EventDetails = () => {
  // Sample event data (replace with dynamic data as needed)
  const event = {
    title: "Tech Conference 2025",
    createdBy: "Technology Committee",
    venue: "Grand Hall, City Center",
    date: "April 15, 2025",
    time: "10:00 AM - 4:00 PM",
    description: "An annual conference discussing the latest advancements in technology, AI, and software development.",
    category: "Technology & Innovation",
    posters: [
      "https://via.placeholder.com/300", // Replace with actual poster URLs
      "https://via.placeholder.com/300"
    ],
    details: "This event will bring together industry experts, developers, and tech enthusiasts to explore the future of technology. Join us for insightful talks, panel discussions, and networking sessions."
  };

  return (
    <div className='event-details-page'>
      <h1>{event.title}</h1>
      <table className='event-info'>
        <tr>
          <td style={{width:'30%'}}><strong>Created by</strong></td>
          <td>{event.createdBy}</td>
        </tr>
        <tr>
          <td><strong>Venue</strong></td>
          <td>{event.venue}</td>
        </tr>
        <tr>
          <td><strong>Date</strong></td>
          <td>{event.date}</td>
        </tr>
        <tr>
          <td><strong>Time</strong></td>
          <td>{event.time}</td>
        </tr>
        <tr>
          <td><strong>Category</strong></td>
          <td>{event.category}</td>
        </tr>
        <tr>
          <td><strong>Description</strong></td>
          <td>{event.description}</td>
        </tr>
      </table>

      <div className='event-posters'>
        <h2>Posters</h2>
        <div className='poster-container'>
          {event.posters.map((poster, index) => (
            <img key={index} src={poster} alt={`Poster ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
