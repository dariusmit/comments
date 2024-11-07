"use strict";

import { useState } from "react";
import swal from "sweetalert";
import useDateHelpers from "../hooks/useDateHelpers";
import { motion } from "framer-motion";
import ReplyBox from "./ReplyBox";
import ReplyButtonsStack from "./ReplyButtonsStack";
import TextareaAutosize from "react-textarea-autosize";

function CommentsCard({
  comment,
  currentUser,
  updateCommentsData,
  commentsData,
  idCounter,
  setIDcounter,
}) {
  const [scoreView, updateScoreView] = useState(Number(comment.score));
  const [textAreaDisabled, changeTextAreaStatus] = useState(true);
  const [replyBoxEnabled, enableReplyBox] = useState(false);
  const [replyValue, updateReplyValue] = useState("");
  const [editValue, updateEditValue] = useState(comment.content);

  const { day, currentTime, currentDate } = useDateHelpers();

  const parentStateCopy = structuredClone(commentsData);

  const newCommentObject = {
    id: idCounter,
    content: editValue !== "" ? editValue : replyValue,
    createdAt: `${currentDate} ${day}, ${currentTime}`,
    score: 0,
    replyingTo: comment.user.username,
    user: currentUser,
    replies: [],
  };

  function updateComment(id) {
    if (editValue !== "") {
      for (let i = 0; i < commentsData.length; i++) {
        if (commentsData[i].id === id) {
          parentStateCopy[i].content =
            editValue !== "" ? editValue : replyValue;
          updateCommentsData(parentStateCopy);
          break;
        } else {
          if (commentsData[i].replies.length !== 0) {
            for (let j = 0; j < commentsData[i].replies.length; j++) {
              if (commentsData[i].replies[j].id === id) {
                parentStateCopy[i].replies[j].content =
                  editValue !== "" ? editValue : replyValue;
                updateCommentsData(parentStateCopy);
                break;
              }
            }
          }
        }
      }
      setIDcounter((prev) => prev + 1);
      changeTextAreaStatus(true);
    } else {
      deleteComment(id);
    }
  }

  function deleteComment(id) {
    swal("Are you sure you want to DELETE a comment? This can't be undone!", {
      dangerMode: true,
      buttons: true,
    }).then((okay) => {
      if (okay) {
        for (let i = 0; i < commentsData.length; i++) {
          if (commentsData[i].id === id) {
            updateCommentsData((prev) => {
              return prev.filter((item) => item.id !== id);
            });
            break;
          } else {
            if (commentsData[i].replies.length !== 0) {
              for (let j = 0; j < commentsData[i].replies.length; j++) {
                if (commentsData[i].replies[j].id === id) {
                  parentStateCopy[i].replies = parentStateCopy[
                    i
                  ].replies.filter((item) => item.id !== id);
                  updateCommentsData(parentStateCopy);
                  break;
                }
              }
            }
          }
        }
      }
    });
  }

  function replyToComment(e, id) {
    e.preventDefault();
    if (replyBoxEnabled) {
      enableReplyBox(false);
    } else {
      enableReplyBox(true);
    }
    if (replyValue !== "") {
      for (let i = 0; i < commentsData.length; i++) {
        if (commentsData[i].id === id) {
          parentStateCopy[i].replies.push(newCommentObject);
          updateCommentsData(parentStateCopy);
          break;
        } else {
          if (commentsData[i].replies.length !== 0) {
            for (let j = 0; j < commentsData[i].replies.length; j++) {
              if (commentsData[i].replies[j].id === id) {
                parentStateCopy[i].replies.push(newCommentObject);
                updateCommentsData(parentStateCopy);
                break;
              }
            }
          }
        }
      }
      setIDcounter((prev) => prev + 1);
      updateReplyValue("");
    }
  }

  function increaseScore(id) {
    for (let i = 0; i < commentsData.length; i++) {
      if (commentsData[i].id === id) {
        parentStateCopy[i].score++;
        updateCommentsData(parentStateCopy);
        break;
      } else {
        if (commentsData[i].replies.length !== 0) {
          for (let j = 0; j < commentsData[i].replies.length; j++) {
            if (commentsData[i].replies[j].id === id) {
              parentStateCopy[i].replies[j].score++;
              updateCommentsData(parentStateCopy);
              break;
            }
          }
        }
      }
    }
  }

  function decreaseScore(id) {
    for (let i = 0; i < commentsData.length; i++) {
      if (commentsData[i].id === id) {
        parentStateCopy[i].score--;
        updateCommentsData(parentStateCopy);
        break;
      } else {
        if (commentsData[i].replies.length !== 0) {
          for (let j = 0; j < commentsData[i].replies.length; j++) {
            if (commentsData[i].replies[j].id === id) {
              parentStateCopy[i].replies[j].score--;
              updateCommentsData(parentStateCopy);
              break;
            }
          }
        }
      }
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 rounded-md mb-[4.27vw] desktop:rounded-lg desktop:relative desktop:pl-24 desktop:mb-[1.39vw]"
      >
        <div className="flex items-center mb-[4.27vw] desktop:mb-[0.9vw]">
          <img
            className="w-[8.53vw] h-[8.53vw] mr-[4.27vw] desktop:w-[2.22vw] desktop:h-[2.22vw] desktop:mr-[1.11vw]"
            src={comment.user.image.png}
          />
          <p className="font-medium text-[#334253] mr-[4.27vw] desktop:mr-[1.11vw]">
            {comment.user.username}
          </p>
          {comment.user.username === currentUser.username && (
            <p className="p-1 py-0 text-[3.47vw] mr-[4.27vw] rounded-md bg-[#5357B6] text-white desktop:text-[0.9vw] desktop:mr-[1.11vw]">
              you
            </p>
          )}
          <p>{comment.createdAt}</p>
        </div>
        <div
          className={`rounded-md border !resize-none mb-[4.27vw] textarea text-[4.27vw] leading-[6.4vw] break-words desktop:mb-0 ${
            textAreaDisabled === false ? `border-[#5357B6]` : `border-white`
          }`}
        >
          <p
            className={`text-[#5357B6] font-medium desktop:text-[1vw] desktop:leading-[1.67vw] ${
              !textAreaDisabled && `px-4 pt-2`
            }`}
          >
            {comment.replyingTo !== undefined && `@${comment.replyingTo}`}
          </p>
          <TextareaAutosize
            id={comment.id}
            className={`!resize-none textarea text-[4.27vw] disabled:bg-white disabled:text-#67727E disabled:opacity-100 leading-[6.4vw] break-words focus:border-none focus:outline-none desktop:text-[0.9vw] desktop:leading-[1.5vw] desktop:mb-[1vw] ${
              !textAreaDisabled && `px-4 pt-1`
            }`}
            onChange={(e) => updateEditValue(e.target.value)}
            disabled={textAreaDisabled}
            defaultValue={comment.content}
          />
        </div>
        <div className="flex justify-between items-center">
          <div
            className="flex justify-between font-medium bg-[#F5F6FA] px-4 py-2 rounded-lg min-w-[20vw] desktop:flex-col desktop:min-w-[2.78vw] desktop:items-center desktop:px-2 
          desktop:absolute desktop:left-0 desktop:top-0 desktop:ml-4 desktop:mt-4 desktop:h-[6vw]"
          >
            <motion.button
              whileHover={{ scale: 1.6 }}
              whileTap={{ scale: 0.9 }}
              className="mr-2 text-[#C5C6EF] desktop:mr-0 desktop:text-[1vw]"
              onClick={() => {
                increaseScore(comment.id);
                updateScoreView((prev) => prev + 1);
              }}
            >
              +
            </motion.button>
            <p className="flex justify-center mr-2 min-w-[10vw] text-[#5357B6] desktop:mr-0 desktop:min-w-[1.78vw] desktop:text-[0.9vw]">
              {scoreView}
            </p>
            <motion.button
              whileHover={{ scale: 1.6 }}
              whileTap={{ scale: 0.9 }}
              className="text-[#C5C6EF] desktop:text-[1vw]"
              onClick={() => {
                decreaseScore(comment.id);
                updateScoreView((prev) => prev - 1);
              }}
            >
              -
            </motion.button>
          </div>
          <ReplyButtonsStack
            comment={comment}
            currentUser={currentUser}
            textAreaDisabled={textAreaDisabled}
            updateComment={updateComment}
            changeTextAreaStatus={changeTextAreaStatus}
            deleteComment={deleteComment}
            replyToComment={replyToComment}
            updateEditValue={updateEditValue}
          />
        </div>
        {replyBoxEnabled && (
          <ReplyBox
            comment={comment}
            currentUser={currentUser}
            replyValue={replyValue}
            updateReplyValue={updateReplyValue}
            replyToComment={replyToComment}
          />
        )}
      </motion.div>
    </>
  );
}

export default CommentsCard;
