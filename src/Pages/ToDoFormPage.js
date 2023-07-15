import React from "react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const ToDoFormPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const { handleCreateToDo, setShouldRefresh } = useOutletContext();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setShouldRefresh(true);

    // set newToDo with state data
    const newToDo = {
      title,
      description,
      priority,
    };

    // Call the handleCreateToDo function with the newToDo data
    handleCreateToDo(newToDo);

    navigate("/");
  };
  return (
    <div>
      <h1>Create ToDo Form</h1>
      <hr style={{ width: "50%" }} />

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <br />
        <input
          style={{ width: "37em" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <label htmlFor="description">Description: </label>
        <br />
        <textarea
          value={description}
          cols="60"
          rows="5"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <label htmlFor="priority">Priority: </label>
        <br />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        <br />
        <button style={{ backgroundColor: "green" }}>Create ToDo</button>
      </form>
      <button style={{ backgroundColor: "red" }} onClick={() => navigate("/")}>
        cancel
      </button>
      <br />
      <hr style={{ width: "50%" }} />
    </div>
  );
};

export default ToDoFormPage;
