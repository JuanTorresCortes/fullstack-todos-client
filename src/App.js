import "./App.css";
import NavBar from "./Components/NavBar";
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const [toDoList, setTodoList] = useState({});
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const navigate = useNavigate();

  const url = process.env.REACT_APP_URL_ENDPOINT;

  // Fetch data from the server
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${url}/todo/all-todo`);
      const data = await response.json();
      setTodoList(data);
    };
    getData();
    console.log(toDoList);
  }, [url, shouldRefresh]);

  // Function to handle the creation of a new blog
  const handleCreateToDo = async (todo) => {
    const response = await fetch(`${url}/todo/create-one`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    setShouldRefresh(false);
    console.log("data", data);
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (confirmCancel) {
      navigate("/");
    }
  };

  return (
    <div className="App">
      <h1>Fullstack ToDo Application</h1>
      <NavBar />
      <br />
      <Outlet
        context={{
          toDoList,
          setTodoList,
          setShouldRefresh,
          handleCreateToDo,
          handleCancel,
          url,
        }}
      />
    </div>
  );
}

export default App;
