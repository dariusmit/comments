"use strict";

import { useState } from "react";

function InputBox({ commentsList, UpdateCommentsList, currentUser }) {
  let [inputValue, updateInputValue] = useState("");

  //Need correct ID, accounting for inner arrays also
  /*
  function sumArrayLengths() {
    if (currentUser) {
      let sum = 0;
      let totalLength = 0;
      console.log(commentsList.length);

      for (let i = 0; i < commentsList.length; i++) {
        for (let i = 0; i < commentsList.replies.length; i++) {
          sum += commentsList.replies.length;
        }
      }

      totalLength = sum + commentsList.length;
      return totalLength;
    }
  }
    */

  function submitComment(e) {
    e.preventDefault();
    UpdateCommentsList((prev) => {
      return [
        ...prev,
        {
          id: prev.length + 66,
          content: inputValue,
          createdAt: "Current time",
          score: 0,
          user: currentUser,
          replies: [],
          disabled: true,
        },
      ];
    });
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
