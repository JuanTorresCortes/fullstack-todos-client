import React from "react";
import { useNavigate } from "react-router-dom";

const ToDoCard = ({ todo, url, setShouldRefresh }) => {
  const navigate = useNavigate();

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

  return (
    <div
      className="todo-card"
      style={{
        backgroundColor: todo.isComplete ? "green" : "red",
      }}
    >
      <h2>{todo.title}</h2>
      <button
        onClick={handleSetToDoComplete}
        style={{ backgroundColor: todo.isComplete ? "red" : "green" }}
      >
        Toggle Complete
      </button>
      <p>ID: {todo._id}</p>
      <p>Description: {todo.description}</p>
      <p>Priority: {todo.priority}</p>
      <p>Is Complete: {todo.isComplete ? "Yes" : "No"}</p>
      <p>Creation Date: {todo.creationDate}</p>
      <p>Last Modified: {todo.lastModified}</p>
      <p>Completed Date: {todo.isComplete ? todo.completedDate : "N/A"}</p>

      <br />
      <button
        style={{ backgroundColor: "blue" }}
        onClick={() => navigate(`/edit/${todo._id}`)}
      >
        Edit Todo
      </button>
      <br />
      <button
        onClick={handleDeleteToDo}
        style={{ backgroundColor: "red", marginBottom: "1em" }}
      >
        Delete
      </button>
    </div>
  );
};

export default ToDoCard;
