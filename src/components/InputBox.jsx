"use strict";

import { useState } from "react";

function InputBox({ updateCommentsData, currentUser }) {
  let [inputValue, updateInputValue] = useState("");
  const [emptyInputError, setInputError] = useState("");

  function submitComment(e) {
    const date = new Date();
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const currentTime = hours + ":" + minutes.substring(1, 3);
    e.preventDefault();
    if (inputValue !== "") {
      updateCommentsData((prev) => {
        return [
          ...prev,
          {
            id: prev.length + 66,
            content: inputValue,
            createdAt: currentTime,
            score: 0,
            user: currentUser,
            replies: [],
          },
        ];
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
