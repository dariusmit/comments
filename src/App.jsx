"use strict";

import { useState } from "react";
import CommentsList from "./components/CommentsList";
import InputBox from "./components/InputBox";
import { useEffect } from "react";

function App() {
  let [commentsList, UpdateCommentsList] = useState(null);
  let [currentUser, setCurrentUser] = useState(null);
  let [textAreaDisabled, changeTextAreaStatus] = useState(true);

  async function getData() {
    const path = "./src/data/data.json";
    try {
      const req = await fetch(path);
      const res = await req.json();
      UpdateCommentsList(res.comments);
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
      {commentsList !== null ? (
        <CommentsList
          commentsList={commentsList}
          textAreaDisabled={textAreaDisabled}
          changeTextAreaStatus={changeTextAreaStatus}
          UpdateCommentsList={UpdateCommentsList}
        />
      ) : null}

      {currentUser !== null ? (
        <InputBox
          commentsList={commentsList}
          UpdateCommentsList={UpdateCommentsList}
          currentUser={currentUser}
        />
      ) : null}
    </div>
  );
}

export default App;
