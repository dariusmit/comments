"use strict";

import { motion } from "framer-motion";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

function ReplyBox({
  comment,
  currentUser,
  replyValue,
  updateReplyValue,
  replyToComment,
}) {
  const [emptyInputError, setInputError] = useState("");

  return (
    <motion.form
      id={comment.id}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (replyValue !== "") {
          setInputError("");
          updateReplyValue("");
          return replyToComment(e, comment.id);
        } else {
          return setInputError("Please enter a reply text...");
        }
      }}
    >
      <div className="border border-[#5357B6] rounded-md w-full mt-4">
        <p className="text-[#5357B6] font-medium pl-4 pt-2 pb-2">
          @{comment.user.username}
        </p>
        <TextareaAutosize
          id={comment.id}
          className="w-full px-4 pb-4 focus:border-none focus:outline-none"
          placeholder="add a reply..."
          onChange={(e) => {
            updateReplyValue(e.target.value);
          }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-red-500 text-[3.47vw] mb-4"
      >
        {emptyInputError}
      </motion.p>
      <div className="flex items-center justify-between w-full">
        <img className="w-[32px] h-[32px]" src={currentUser.image.png} />
        <motion.input
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className=" w-1/3 p-2 bg-[#5357B6] rounded-md text-white"
          type="submit"
          value="Reply"
        />
      </div>
    </motion.form>
  );
}

export default ReplyBox;
