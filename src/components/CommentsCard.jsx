"use strict";

import { useState } from "react";

function CommentsCard({
  commentsList,
  comment,
  textAreaDisabled,
  changeTextAreaStatus,
  UpdateCommentsList,
}) {
  let [score, changeScore] = useState(Number(comment.score));

  function editComment(id) {
    UpdateCommentsList(
      commentsList.map((comment) => {
        if (comment.id === id) {
          if (comment.disabled === true) {
            return { ...comment, disabled: false };
          } else return { ...comment, disabled: true };
        } else return comment;
      })
    );
  }

  function deleteComment() {
    console.log("comment deleted");
  }

  function replyToComment() {
    console.log("replied to comment");
  }

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center pb-2">
        <img className="w-[32px] h-[32px]" src={comment.user.image.png} />
        <p>{comment.user.username}</p>
        <p>{comment.createdAt}</p>
      </div>
      <textarea
        id={comment.id}
        className={
          comment.disabled === false
            ? "pb-2 bg-gray-400 overflow-hidden w-full h-auto min-h-[150px]"
            : "pb-2 bg-white overflow-hidden w-full h-auto min-h-[150px]"
        }
        disabled={comment.disabled}
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
            <button onClick={() => editComment(comment.id)}>Edit</button>
            <button onClick={deleteComment}>Delete</button>
          </>
        ) : (
          <button onClick={replyToComment}>Reply</button>
        )}
      </div>
    </div>
  );
}

export default CommentsCard;
