"use strict";

import { useState } from "react";
import CommentsList from "./components/CommentsList";
import InputBox from "./components/InputBox";
import { useEffect } from "react";

function App() {
  const [commentsData, updateCommentsData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [idCounter, setIDcounter] = useState(() => {
    return JSON.parse(localStorage.getItem("id counter")) || 99;
  });
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  const savedUser = JSON.parse(localStorage.getItem("current user")) || {};

  useEffect(() => {
    if (savedComments.length > 0 && Object.keys(savedUser).length > 0) {
      updateCommentsData(savedComments);
      setCurrentUser(savedUser);
    } else {
      getData();
      getUser();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(commentsData));
  }, [commentsData]);

  useEffect(() => {
    localStorage.setItem("current user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("id counter", JSON.stringify(idCounter));
  }, [idCounter]);

  async function getData() {
    const path = "./data.json";
    try {
      const req = await fetch(path);
      const res = await req.json();
      updateCommentsData(res.comments);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  }

  async function getUser() {
    const path = "./data.json";
    try {
      const req = await fetch(path);
      const res = await req.json();
      setCurrentUser(res.currentUser);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  }

  return (
    <div className="flex flex-col w-full desktop:mx-auto desktop:max-w-[700px]">
      {commentsData && commentsData.length !== 0 && (
        <CommentsList
          commentsData={commentsData}
          currentUser={currentUser}
          updateCommentsData={updateCommentsData}
          idCounter={idCounter}
          setIDcounter={setIDcounter}
        />
      )}
      {currentUser && Object.keys(currentUser).length > 0 && (
        <InputBox
          updateCommentsData={updateCommentsData}
          currentUser={currentUser}
          commentsData={commentsData}
          idCounter={idCounter}
          setIDcounter={setIDcounter}
        />
      )}
    </div>
  );
}

export default App;
