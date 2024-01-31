import React, { useState, useRef } from "react";
import Modal from "react-modal";
import "./App.css";
import PersonDetails from "./PersonDetails";


Modal.setAppElement("#root");
const App = () => {
  const [data, setData] = useState({
    "0-18": [],
    "18-25": [],
    "25-40": [],
    "40+": [],
  });

  const [dropData,setDropData]=useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPersonId, setEditPersonId] = useState(null);

  
  
  const handleOnDrop = (e)=>{
    const Person = e.dataTransfer.getData("Person")
    setDropData([...dropData,Person])
  }

  console.log(dropData)

  const addDropData=(personObj)=>{
    setDropData([...dropData,personObj])
  }

  const handleOnDropOver=(e)=>{
    e.preventDefault()
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditPersonId(null);
  };

  const handleEdit = (id) => {
    setEditPersonId(id);
    openModal();
  };

  const handleDelete = (categoryId, id) => {
    setData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[categoryId] = updatedData[categoryId].filter((person) => person.id !== id);
      return updatedData;
    });
  };

  const AddMember = ({ setData }) => {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const ageRef = useRef();

    const addValues = (e) => {
      e.preventDefault();
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const phone = phoneRef.current.value;
      const age = parseInt(ageRef.current.value);

      const newMember = {
        id: Date.now(),
        name,
        email,
        phone,
        age,
      };

      if (editPersonId !== null) {
        setData((prevData) => {
          const updatedData = { ...prevData };
          const category = age <= 18 ? "0-18" : age <= 25 ? "18-25" : age <= 40 ? "25-40" : "40+";
          const index = updatedData[category].findIndex((person) => person.id === editPersonId);
          if (index !== -1) {
            updatedData[category][index] = newMember;
          }
          return updatedData;
        });
        setEditPersonId(null);
      } else {
        setData((prevData) => {
          const updatedData = { ...prevData };
          const category = age <= 18 ? "0-18" : age <= 25 ? "18-25" : age <= 40 ? "25-40" : "40+";
          updatedData[category].push(newMember);
          return updatedData;
        });
      }

      nameRef.current.value = "";
      emailRef.current.value = "";
      phoneRef.current.value = "";
      ageRef.current.value = "";

      closeModal();
    };

    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Member"
        className="modal"
        overlayClassName="overlay"
      >
        <form className="form" onSubmit={addValues}>
          <div className="each">
            <label className="each_label">Name:</label>
            <input type="text" name="name" placeholder="Enter name" ref={nameRef} />
          </div>
          <div className="each">
            <label className="each_label">Email:</label>
            <input type="text" name="email" placeholder="Enter email" ref={emailRef} />
          </div>
          <div className="each">
            <label className="each_label">Phone:</label>
            <input type="text" name="phone" placeholder="Enter phone" ref={phoneRef} />
          </div>
          <div className="each">
            <label className="each_label">Age:</label>
            <input type="number" name="age" placeholder="Enter age" ref={ageRef} />
          </div>
          <div className="each">
            <button className="add_model" type="submit">
              Submit
            </button>
          </div>
          <div className="each">
            <button className="add_model cancel_button" type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    );
  };

  return (
    <div className="tableWrap">
      <button className="button" onClick={openModal}>
        Add
      </button>

      <AddMember setData={setData} />

      <div className="below">
        {Object.entries(data).map(([category, persons]) => (
          <div className="category" key={category}>
            <h2>{category}</h2>
            {persons.map((person) => (
              <div className="person" key={person.id}>
                <PersonDetails data={person} onDelete={() => handleDelete(category, person.id)} addDropData={addDropData}/>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <div className="drop_container">
          <h1>Drop the Selected Candidates Here below</h1>
          <div className="shortlisted" onDragOver={handleOnDropOver}>
          
                  {dropData.map((each,index)=>(
                    <div className="person" key={index}>
                      <PersonDetails data={each} key={index}/>  
                    </div>
                  ))}
          </div>
        </div>
     
      </div>
      
    </div>
  );
};

export default App;


// onDrop={handleOnDrop}