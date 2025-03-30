import React, { useEffect, useState } from "react";
import "../styles/CommitteeList.css";
import Modal from "./Model";
import url from "../apis/urls"

const CommitteeList = () => {
    const [committees, setCommittees] = useState([]);
    const [selectedCommittee, setSelectedCommittee] = useState(null);

    useEffect(() => {
        fetch(`${url}/committee`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCommittees(data);
            })
            .catch(error => console.error("Error fetching committees:", error));
    }, []);

    return (
        <div className="committee-list-page">
            <h1>Committee Lists</h1>
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'left', width:'100%'}}>
                {committees.map((committee, index) => (
                    <div key={committee._id || index} className="committee-box">
                        <h1>{committee.name}</h1>
                        <button onClick={() => setSelectedCommittee(committee)}>Join</button>
                    </div>
                ))}
            </div>

            {selectedCommittee && (
                <Modal committee={selectedCommittee} onClose={() => setSelectedCommittee(null)} />
            )}
        </div>
    );
};

export default CommitteeList;