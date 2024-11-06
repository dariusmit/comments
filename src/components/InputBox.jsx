"use strict";

import { useState } from "react";
import useDateHelpers from "../hooks/useDateHelpers";
import { motion } from "framer-motion";
import TextareaAutosize from "react-textarea-autosize";

function InputBox({
  updateCommentsData,
  currentUser,
  commentsData,
  idCounter,
  setIDcounter,
}) {
  const [inputValue, updateInputValue] = useState("");
  const [emptyInputError, setInputError] = useState("");
  const { day, currentTime, currentDate } = useDateHelpers();

  const newCommentObject = {
    id: idCounter,
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
      setIDcounter((prev) => prev + 1);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
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
      <TextareaAutosize
        id={commentsData.length + 999}
        className="border rounded-md w-full p-4 focus:outline-none focus:!border-[#5357B6]"
        placeholder="add a comment..."
        value={inputValue}
        onChange={(e) => {
          updateInputValue(e.target.value);
        }}
      />
      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-red-500 text-[3.47vw] mb-[3.27vw]"
      >
        {emptyInputError}
      </motion.p>
      <div className="flex items-center justify-between w-full">
        <img className="w-[32px] h-[32px]" src={currentUser.image.png} />
        <motion.input
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className=" w-1/3 px-4 py-3 bg-[#5357B6] rounded-lg text-white"
          type="submit"
          value="SEND"
        />
      </div>
    </motion.form>
  );
}

export default InputBox;
