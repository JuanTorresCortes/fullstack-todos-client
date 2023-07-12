import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // Main App component
    children: [
      {
        index: true, // Set this as the default route
        path: "/", // Path for the Blogs component
        element: <HomePage />, // Render the Blogs component when the path matches
      },
      {
        path: "blog-form", // Path for the BlogForm component
        element: <BlogForm />, // Render the BlogForm component when the path matches
      },
      {
        path: "edit/:id",
        element: <EditForm />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
