"use strict";

import { useState } from "react";
import useDateHelpers from "../hooks/useDateHelpers";

function InputBox({ updateCommentsData, currentUser, commentsData }) {
  const [inputValue, updateInputValue] = useState("");
  const [emptyInputError, setInputError] = useState("");
  const { day, currentTime, currentDate } = useDateHelpers();

  const newCommentObject = {
    id: commentsData.length + 66,
    content: inputValue,
    createdAt: `${currentDate} ${day}, ${currentTime}`,
    score: 0,
    user: currentUser,
    replies: [],
  };

  function submitComment(e) {
    e.preventDefault();
    if (inputValue !== "") {
      updateCommentsData((prev) => {
        return [...prev, newCommentObject];
      });
      updateInputValue("");
    }
  }

  return (
    <form
      className="p-[4.27vw] bg-white rounded-md w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (inputValue !== "") {
          setInputError("");
          updateInputValue("");
          return submitComment(e);
        } else {
          return setInputError("Please enter a comment text...");
        }
      }}
    >
      <textarea
        className="border rounded-md w-full p-4"
        placeholder="Add a comment..."
        rows="4"
        cols="50"
        onChange={(e) => {
          updateInputValue(e.target.value);
        }}
      />
      <p className="text-red-500 text-[3.47vw] mb-[3.27vw]">
        {emptyInputError}
      </p>
      <div className="flex items-center justify-between w-full">
        <img className="w-[32px] h-[32px]" src={currentUser.image.png} />
        <input
          className=" w-1/3 px-4 py-3 bg-[#5357B6] rounded-lg text-white"
          type="submit"
          value="SEND"
        />
      </div>
    </form>
  );
}

export default InputBox;
