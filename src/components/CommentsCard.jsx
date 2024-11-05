"use strict";

import { useState } from "react";
import swal from "sweetalert";
import useDateHelpers from "../hooks/useDateHelpers";
import { motion, AnimatePresence } from "framer-motion";
import ReplyBox from "./ReplyBox";

function CommentsCard({
  comment,
  currentUser,
  updateCommentsData,
  commentsData,
  isVisible,
}) {
  const [scoreView, updateScoreView] = useState(Number(comment.score));
  const [textAreaDisabled, changeTextAreaStatus] = useState(true);
  const [idCounter, setIDcounter] = useState(99);
  const [replyBoxEnabled, enableReplyBox] = useState(false);
  const [replyValue, updateReplyValue] = useState("");
  const [editValue, updateEditValue] = useState("");

  const { day, currentTime, currentDate } = useDateHelpers();

  const newCommentObject = {
    id: comment.replies.length + idCounter,
    content: editValue !== "" ? editValue : replyValue,
    createdAt: `${currentDate} ${day}, ${currentTime}`,
    score: 0,
    replyingTo: comment.user.username,
    user: currentUser,
    replies: [],
  };

  const parentStateCopy = structuredClone(commentsData);

  function saveEditedComment(id) {
    if (editValue !== "") {
      for (let i = 0; i < commentsData.length; i++) {
        if (commentsData[i].id === id) {
          parentStateCopy[i] = newCommentObject;
          updateCommentsData(parentStateCopy);
          break;
        } else {
          if (commentsData[i].replies.length !== 0) {
            for (let j = 0; j < commentsData[i].replies.length; j++) {
              if (commentsData[i].replies[j].id === id) {
                parentStateCopy[i].replies = newCommentObject;
                updateCommentsData(parentStateCopy);
                break;
              }
            }
          }
        }
      }
      setIDcounter((prev) => prev + 1);
    }
    changeTextAreaStatus(true);
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

  function discardEdit(id) {
    let savedBodyText = "";
    for (let i = 0; i < commentsData.length; i++) {
      if (commentsData[i].id === id) {
        savedBodyText = parentStateCopy[i].content;
        parentStateCopy[i].content = `${savedBodyText} `;
        updateCommentsData(parentStateCopy);
        break;
      } else {
        if (commentsData[i].replies.length !== 0) {
          for (let j = 0; j < commentsData[i].replies.length; j++) {
            if (commentsData[i].replies[j].id === id) {
              savedBodyText = parentStateCopy[i].replies[j].content;
              parentStateCopy[i].replies[j].content = `${savedBodyText} `;
              updateCommentsData(parentStateCopy);
              break;
            }
          }
        }
      }
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
      <AnimatePresence>
        {!isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-md mb-[4.27vw]"
          >
            <div className="flex items-center mb-[4.27vw]">
              <img
                className="w-[8.53vw] h-[8.53vw] mr-[4.27vw] desktop:w-[2.22vw] desktop:h-[2.22vw]"
                src={comment.user.image.png}
              />
              <p className="font-medium text-[#334253] mr-[4.27vw]">
                {comment.user.username}
              </p>
              {comment.user.username === currentUser.username && (
                <p className="p-1 py-0 text-[3.47vw] mr-[4.27vw] rounded-md bg-[#5357B6] text-white">
                  you
                </p>
              )}
              <p>{comment.createdAt}</p>
            </div>
            <div
              className={`rounded-md border !resize-none mb-[4.27vw] textarea text-[4.27vw] leading-[6.4vw] break-words ${
                textAreaDisabled === false ? `border-[#5357B6]` : `border-white`
              }`}
            >
              <p
                className={
                  textAreaDisabled === false
                    ? "text-[#5357B6] font-medium pl-4 py-2"
                    : "text-[#5357B6] font-medium"
                }
              >
                {comment.replyingTo !== undefined && `@${comment.replyingTo}`}
              </p>
              <span
                className={`!resize-none textarea text-[4.27vw] leading-[6.4vw] break-words focus:border-none focus:outline-none ${
                  textAreaDisabled === false ? `px-4 pb-4` : `mb-[4.27vw]`
                }`}
                role="textbox"
                onChange={(e) => updateEditValue(e.target.value)}
                contentEditable={!textAreaDisabled}
              >
                {comment.content}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-between font-medium bg-[#F5F6FA] px-4 py-2 rounded-lg min-w-[20vw]">
                <motion.button
                  whileHover={{ scale: 1.6 }}
                  whileTap={{ scale: 0.9 }}
                  className="mr-2 text-[#C5C6EF]"
                  onClick={() => {
                    increaseScore(comment.id);
                    updateScoreView((prev) => prev + 1);
                  }}
                >
                  +
                </motion.button>
                <p className="flex justify-center mr-2 min-w-[10vw] text-[#5357B6]">
                  {scoreView}
                </p>
                <motion.button
                  whileHover={{ scale: 1.6 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[#C5C6EF]"
                  onClick={() => {
                    decreaseScore(comment.id);
                    updateScoreView((prev) => prev - 1);
                  }}
                >
                  -
                </motion.button>
              </div>
              {comment.user.username === currentUser.username ? (
                <>
                  <div className="flex gap-2 font-medium">
                    {!textAreaDisabled ? (
                      <button
                        className="mr-2 text-[#5357B6]"
                        onClick={() => saveEditedComment(comment.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <div className="flex items-center justify-center">
                        <img
                          className="mr-[2.13vw]"
                          src="../../images/icon-edit.svg"
                        />
                        <button
                          className="mr-2 text-[#5357B6]"
                          onClick={() => changeTextAreaStatus(false)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                    {!textAreaDisabled ? (
                      <button
                        className="mr-2"
                        onClick={() => {
                          changeTextAreaStatus(true);
                          discardEdit(comment.id);
                        }}
                      >
                        Discard
                      </button>
                    ) : (
                      <div className="flex items-center justify-center">
                        <img
                          className="mr-[2.13vw]"
                          src="../../images/icon-delete.svg"
                        />
                        <button
                          className="mr-2 text-[#ED6368]"
                          onClick={() => deleteComment(comment.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div
                  onClick={replyToComment}
                  className="flex items-center hover:cursor-pointer justify-center w-[17.6vw]"
                >
                  <img
                    className="mr-[1.6vw]"
                    src="../../images/icon-reply.svg"
                  />
                  <button className="text-[#5357B6] font-medium">Reply</button>
                </div>
              )}
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
        )}
      </AnimatePresence>
    </>
  );
}

export default CommentsCard;
