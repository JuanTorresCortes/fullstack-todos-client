import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ToDoCard from "../Components/ToDoCard";

const HomePage = () => {
  const { toDoList, url, setShouldRefresh } = useOutletContext();
  const { data } = toDoList;

  // Check if data is an array and perform the sorting operation
  const sortedData = Array.isArray(data)
    ? [...data].sort((a, b) => {
        if (a.isComplete && !b.isComplete) return -1;
        if (!a.isComplete && b.isComplete) return 1;
        return 0;
      })
    : [];
  return (
    <div>
      {/* Check if the data is successfully fetched */}
      {toDoList.success && (
        <div className="home-card">
          {/* Map over the blogs data and render a BlogCard for each blog */}
          {sortedData.reverse().map((todo) => (
            <ToDoCard
              key={todo._id}
              todo={todo}
              url={url}
              setShouldRefresh={setShouldRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

// import React from "react";
// import { useOutletContext } from "react-router-dom";
// import ToDoCard from "../Components/ToDoCard";

// const HomePage = () => {
//   const { toDoList, url, setShouldRefresh } = useOutletContext();
//   const { data } = toDoList;

//   // Sort the data array based on the isCompleted property
//   const sortedData = [...data].sort((a, b) => {
//     if (a.isComplete && !b.isComplete) return 1;
//     if (!a.isComplete && b.isComplete) return -1;
//     return 0;
//   });

//   return (
//     <div>
//       <h1>Fullstack ToDo Application</h1>
//       {/* Check if the data is successfully fetched */}
//       {toDoList.success && (
//         <div>
//           {/* Map over the sorted data array and render a ToDoCard for each todo */}
//           {sortedData.map((todo) => (
//             <ToDoCard
//               key={todo._id}
//               todo={todo}
//               url={url}
//               setShouldRefresh={setShouldRefresh}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;
