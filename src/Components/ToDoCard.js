import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ToDoCard = ({ todo, url, setShouldRefresh }) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false); // State for toggling details

  const handleSetToDoComplete = async () => {
    setShouldRefresh(true);
    //
    const updatedToDo = {
      isComplete: !todo.isComplete,
      completedDate: !todo.isComplete ? Date.now() : null,
    };

    const response = await fetch(`${url}/todo/update-Completed/${todo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedToDo),
    });
    const data = await response.json();
    console.log("data", data);
    setShouldRefresh(false);
  };

  const handleDeleteToDo = async () => {
    setShouldRefresh(true);
    const response = await fetch(`${url}/todo/delete-one/${todo._id}`, {
      method: "DELETE",
    });
    const deletedBlog = await response.json();
    // navigate("/");
    console.log(deletedBlog);
    setShouldRefresh(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails); // Toggles the value of showDetails
  };

  return (
    <div
      className="todo-card"
      style={{
        backgroundColor: todo.isComplete ? "green" : "red",
      }}
    >
      <div>
        <small>Priority: {todo.priority}</small>

        <h2>{todo.title}</h2>
        <button
          onClick={handleSetToDoComplete}
          style={{ backgroundColor: todo.isComplete ? "red" : "green" }}
        >
          Toggle Complete
        </button>
      </div>

      {/* Render description and creation date */}
      <div>
        <p>Description: {todo.description}</p>
        <p>Creation Date: {todo.creationDate}</p>
        <p>Is Complete: {todo.isComplete ? "Yes" : "No"}</p>
      </div>

      {/* Render details section if showDetails is true */}
      {showDetails && (
        <div>
          <p>ID: {todo._id}</p>
          <p>Last Modified: {todo.lastModified}</p>
          <p>Completed Date: {todo.isComplete ? todo.completedDate : "N/A"}</p>
        </div>
      )}

      <div>
        <br />
        <button
          style={{ backgroundColor: "blue" }}
          onClick={() => navigate(`/edit/${todo._id}`)}
        >
          Edit Todo
        </button>
        <br />
        <button onClick={handleDeleteToDo} style={{ backgroundColor: "red" }}>
          Delete
        </button>
        <br />
        <button style={{ backgroundColor: "orange" }} onClick={toggleDetails}>
          Toggle for details
        </button>
      </div>
    </div>
  );
};

export default ToDoCard;
