import React from "react";
import "./PersonDetails.css"; 

const PersonDetails = ({ data, onDelete }) => {
  const handleDelete = () => {

    onDelete(data.id);
  };

  return (
    <div className="person-details">
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
      <p>Age: {data.age}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PersonDetails;


