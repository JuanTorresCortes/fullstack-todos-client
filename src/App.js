import logo from "./logo.svg";
import "./App.css";
import NavBar from "./Components/NavBar";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const url = process.env.REACT_APP_URL_ENDPOINT;

function App() {
  const [toDoList, setTodoList] = useState({});
  return (
    <div className="App">
      <NavBar />
      <Outlet context={(toDoList, setTodoList)} />
    </div>
  );
}

export default App;
