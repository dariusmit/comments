"use strict";

import { useState } from "react";

function InputBox({ UpdateCommentsData, currentUser }) {
  let [inputValue, updateInputValue] = useState("");

  function submitComment(e) {
    e.preventDefault();
    if (inputValue !== "") {
      UpdateCommentsData((prev) => {
        return [
          ...prev,
          {
            id: prev.length + 66,
            content: inputValue,
            createdAt: "Current time",
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
    <form className="p-4 w-full" onSubmit={submitComment}>
      <textarea
        className="border rounded-md w-full p-4 mb-4"
        placeholder="Add a comment..."
        rows="4"
        cols="50"
        onChange={(e) => {
          updateInputValue(e.target.value);
        }}
      />
      <div className="flex items-center justify-between w-full">
        <img className="w-[32px] h-[32px]" src={currentUser.image.png} />
        <input
          className=" w-1/3 p-4 bg-[#5357B6] rounded-md text-white font-bold"
          type="submit"
          value="Send"
        />
      </div>
    </form>
  );
}

export default InputBox;
