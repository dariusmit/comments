"use strict";

import { useState } from "react";
import swal from "sweetalert";
import useDateHelpers from "../hooks/useDateHelpers";

function CommentsCard({
  comment,
  currentUser,
  updateCommentsData,
  commentsData,
}) {
  const [score, changeScore] = useState(Number(comment.score));
  const [textAreaDisabled, changeTextAreaStatus] = useState(true);
  const [idCounter, setIDcounter] = useState(99);
  const [replyBox, enableReplyBox] = useState(false);
  const [replyValue, updateReplyValue] = useState("");
  const [editValue, updateEditValue] = useState("");
  const [emptyInputError, setInputError] = useState("");

  const parentStateCopy = structuredClone(commentsData);

  const { day, currentTime, currentDate } = useDateHelpers();

  const newCommentObject = {
    id: comment.replies.length + idCounter,
    content: editValue !== "" ? editValue : replyValue,
    createdAt: `${currentDate} ${day}, ${currentTime}`,
    score: 0,
    user: currentUser,
    replies: [],
  };

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
    swal("Are you sure you want to DELETE a comment?", {
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
    if (replyBox) {
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

  return (
    <>
      <div className="bg-white p-4 rounded-md mb-[4.27vw]">
        <div className="flex items-center mb-[4.27vw]">
          <img
            className="w-[8.53vw] h-[8.53vw] mr-[4.27vw]"
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
        <p className="text-[#5357B6] font-medium">
          {comment.replyingTo !== undefined ? `@${comment.replyingTo}` : null}
        </p>
        <span
          className={
            textAreaDisabled === false
              ? "pb-2 rounded-md border border-[#5357B6] p-2 w-full mb-[4.27vw] textarea text-[4.27vw] leading-[6.4vw]"
              : "pb-2 rounded-md border border-white w-full mb-[4.27vw] textarea text-[4.27vw] leading-[6.4vw]"
          }
          role="textbox"
          onChange={(e) => updateEditValue(e.target.value)}
          contentEditable={!textAreaDisabled}
        >{` ${comment.content}`}</span>
        <div className="flex justify-between items-center">
          <div className="flex justify-between font-medium bg-[#F5F6FA] px-4 py-2 rounded-lg min-w-[20vw]">
            <button
              className="mr-2 text-[#C5C6EF]"
              onClick={() => {
                changeScore((prev) => prev + 1);
              }}
            >
              +
            </button>
            <p className="flex justify-center mr-2 min-w-[10vw] text-[#5357B6]">
              {score}
            </p>
            <button
              className="text-[#C5C6EF]"
              onClick={
                score !== 0
                  ? () => {
                      changeScore((prev) => prev - 1);
                    }
                  : null
              }
            >
              -
            </button>
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
              className="flex items-center justify-center w-[17.6vw]"
            >
              <img className="mr-[1.6vw]" src="../../images/icon-reply.svg" />
              <button className="text-[#5357B6] font-medium">Reply</button>
            </div>
          )}
        </div>
        {replyBox && (
          <form
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
            <textarea
              className="border rounded-md w-full p-4 mt-4"
              placeholder={`${comment.user.username} Add a reply`}
              rows="4"
              cols="50"
              onChange={(e) => {
                updateReplyValue(e.target.value);
              }}
            />
            <p className="text-red-500 text-[3.47vw] mb-4">{emptyInputError}</p>
            <div className="flex items-center justify-between w-full">
              <img className="w-[32px] h-[32px]" src={currentUser.image.png} />
              <input
                className=" w-1/3 p-2 bg-[#5357B6] rounded-md text-white"
                type="submit"
                value="Reply"
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default CommentsCard;
