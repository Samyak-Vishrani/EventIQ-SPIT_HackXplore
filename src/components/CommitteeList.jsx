import React, { useState } from "react";
import "../styles/CommitteeList.css";
import Modal from "./Model";

const CommitteeList = () => {
    const [committees] = useState(["Unicode", "Synapse", "ACM"]);
    const [selectedCommittee, setSelectedCommittee] = useState(null);

    return (
        <div className="committee-list-page">
            <h1>Committee Lists</h1>
            {committees.map((com, index) => (
                <div key={index} className="committee-box">
                    <h1>{com}</h1>
                    <button onClick={() => setSelectedCommittee(com)}>Join</button>
                </div>
            ))}

            {selectedCommittee && (
                <Modal committee={selectedCommittee} onClose={() => setSelectedCommittee(null)} />
            )}
        </div>
    );
};

export default CommitteeList;