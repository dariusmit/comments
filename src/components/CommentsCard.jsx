"use strict";

import { useState } from "react";
import { produce } from "immer";

function CommentsCard({
  comment,
  currentUser,
  updateCommentsData,
  commentsData,
}) {
  let [score, changeScore] = useState(Number(comment.score));
  let [textAreaDisabled, changeTextAreaStatus] = useState(true);
  let [reply, updateReply] = useState(comment.replies);
  let [idCounter, setIDcounter] = useState(99);
  let [replyBox, enableReplyBox] = useState(false);
  let [replyValue, updateReplyValue] = useState("");

  function editComment() {
    if (textAreaDisabled) {
      changeTextAreaStatus(false);
    } else {
      changeTextAreaStatus(true);
    }
  }

  function saveComment() {
    console.log("edit saved");
    if (replyValue !== "") {
      updateReply((prev) => {
        return [
          ...prev,
          {
            id: comment.replies.length + idCounter,
            content: replyValue,
            createdAt: "Current time",
            score: 0,
            user: currentUser,
            replies: [],
          },
        ];
      });
      setIDcounter((prev) => prev + 1);
    }
    changeTextAreaStatus(true);
  }

  const parentStateCopy = structuredClone(commentsData);
  function deleteComment(id) {
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
              parentStateCopy[i].replies = parentStateCopy[i].replies.filter(
                (item) => item.id !== id
              );
              updateCommentsData(parentStateCopy);
              break;
            }
          }
        }
      }
    }
  }

  function replyToComment(e) {
    e.preventDefault();
    if (replyBox) {
      enableReplyBox(false);
    } else {
      enableReplyBox(true);
    }
    if (replyValue !== "") {
      updateReply((prev) => {
        return [
          ...prev,
          {
            id: comment.replies.length + idCounter,
            content: replyValue,
            createdAt: "Current time",
            score: 0,
            user: currentUser,
            replies: [],
          },
        ];
      });
      setIDcounter((prev) => prev + 1);
      updateReplyValue("");
    }
  }

  return (
    <>
      <div className="bg-white p-4 rounded-md">
        <div className="flex justify-between items-center pb-2">
          <img className="w-[32px] h-[32px]" src={comment.user.image.png} />
          <p>{comment.user.username}</p>
          <p>{comment.createdAt}</p>
        </div>
        <textarea
          className={
            textAreaDisabled === false
              ? "pb-2 border-2 border-orange-200 rounded-md overflow-hidden w-full h-[150px] resize-none"
              : "pb-2 border-2 border-white bg-white overflow-hidden w-full h-[150px] resize-none"
          }
          disabled={textAreaDisabled}
          defaultValue={comment.content}
        ></textarea>
        <div className="flex justify-between">
          <div className="flex">
            <button
              className="mr-2"
              onClick={() => {
                changeScore((prev) => prev + 1);
              }}
            >
              +
            </button>
            <p className="mr-2">{score}</p>
            <button
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
          {comment.user.username === "juliusomo" ? (
            <>
              <div>
                {!textAreaDisabled ? (
                  <button className="mr-2" onClick={saveComment}>
                    Save
                  </button>
                ) : (
                  <button className="mr-2" onClick={editComment}>
                    Edit
                  </button>
                )}
                {!textAreaDisabled ? (
                  <button
                    className="mr-2"
                    onClick={() => changeTextAreaStatus(true)}
                  >
                    Discard
                  </button>
                ) : (
                  <button
                    className="mr-2"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </>
          ) : (
            <button onClick={replyToComment}>Reply</button>
          )}
        </div>
        {replyBox && (
          <form className="p-4 w-full" onSubmit={replyToComment}>
            <textarea
              className="border rounded-md w-full p-4 mb-4"
              placeholder="Add a reply..."
              rows="4"
              cols="50"
              onChange={(e) => {
                updateReplyValue(e.target.value);
              }}
            />
            <div className="flex items-center justify-between w-full">
              <img className="w-[32px] h-[32px]" src={currentUser.image.png} />
              <input
                className=" w-1/3 p-2 bg-[#5357B6] rounded-md text-white font-bold"
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

/**
       {reply &&
        reply.length !== 0 &&
        reply.map((reply) => {
          return (
            <div key={reply.id} className="pl-6 pt-4">
              <CommentsCard
                comment={reply}
                currentUser={currentUser}
                commentsData={commentsData}
                updateCommentsData={updateCommentsData}
              />
            </div>
          );
        })}
 */

export default CommentsCard;
