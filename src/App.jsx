"use strict";

import { useState } from "react";
import CommentsList from "./components/CommentsList";
import InputBox from "./components/InputBox";
import { useEffect } from "react";

function App() {
  const [commentsData, updateCommentsData] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(commentsData));
  }, [commentsData]);

  async function getData() {
    const path = "./src/data/data.json";
    try {
      const req = await fetch(path);
      const res = await req.json();
      updateCommentsData(res.comments);
      setCurrentUser(res.currentUser);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {commentsData && (
        <CommentsList
          commentsData={commentsData}
          currentUser={currentUser}
          updateCommentsData={updateCommentsData}
        />
      )}
      {currentUser && (
        <InputBox
          updateCommentsData={updateCommentsData}
          currentUser={currentUser}
          commentsData={commentsData}
        />
      )}
    </div>
  );
}

export default App;
