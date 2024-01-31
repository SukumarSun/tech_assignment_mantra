import React from "react";
import "./PersonDetails.css"; 

const PersonDetails = ({ data, onDelete,addDropData}) => {
  const handleDelete = () => {

    onDelete(data.id);
  };

  const handleDragStart = (e,Person) => {
    addDropData(Person)
    e.dataTransfer.setData(`person${data.id}`, Person);
  }


  return (
    <div className="person-details" draggable onDragStart={(e)=>handleDragStart(e,data)}>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
      <p>Age: {data.age}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PersonDetails