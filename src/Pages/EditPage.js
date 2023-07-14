import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

const EditPage = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  const { toDoList, setShouldRefresh, url } = useOutletContext();
  const allTodo = toDoList.data;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (allTodo) {
      const foundTodo = allTodo.find((todo) => todo._id === id);
      if (foundTodo) {
        setTitle(foundTodo.title);
        setPriority(foundTodo.priority);
        setDescription(foundTodo.description);
      }
    }
  }, [id, toDoList]);

  const handleEdit = async (e) => {
    e.preventDefault();
    setShouldRefresh(true);

    const body = {
      title,
      description,
      priority,
    };

    const response = await fetch(`${url}/todo/update-one/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const updateTodo = await response.json();
    setShouldRefresh(false);
    console.log(updateTodo);
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Todo</h1>
      <form onSubmit={handleEdit}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          style={{ width: "37em" }}
          value={title}
          type="text"
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
        <button style={{ backgroundColor: "green" }}>Edit Todo</button>
      </form>
    </div>
  );
};

export default EditPage;
