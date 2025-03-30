import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import url from "../apis/urls";
import '../styles/EventsDashboard.css';

const EventDetails = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const token = Cookies.get("token");
        console.log("token: " + token);

        const fetchData = async() => {
            try {
                const response = await fetch(`${url}/event`, {
                    method: "GET",
                    headers: {
                        "Authorization": `bearer ${token}`
                    }
                });

                const data = await response.json();
                console.log(response);
                console.log(data);

                const filteredData = data.filter(data => (data.committeeId ? data.committeeId.name : "") === "Unicode");
                console.log(filteredData);

                setEvents(filteredData);
            }
            catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, [])

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
                            <th>Venue</th>
                            <th>Date</th>
                            <th>Description</th>
                            {/* <th>Category</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr
                                key={event.id}
                                onClick={() => handleEventClick(event.id)}
                                className="event-row"
                            >
                                <td className="event-name">{event.event_name.toUpperCase()}</td>
                                <td>{event.event_venue}</td>
                                <td>{new Date(event.event_date).toLocaleDateString('en-IN')}</td>
                                <td>{event.event_description}</td>
                                {/* <td>
                                    <span className="category-badge">
                                        {event.category}
                                    </span>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventDetails;
