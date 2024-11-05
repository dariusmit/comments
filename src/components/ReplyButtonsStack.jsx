"use strict";

function ReplyButtonsStack({
  comment,
  currentUser,
  textAreaDisabled,
  updateComment,
  changeTextAreaStatus,
  deleteComment,
  replyToComment,
  updateEditValue,
}) {
  return (
    <>
      {comment.user.username === currentUser.username ? (
        <>
          <div className="flex gap-2 font-medium">
            {!textAreaDisabled ? (
              <button
                className="mr-2 text-[#5357B6]"
                onClick={() => {
                  updateComment(comment.id);
                }}
              >
                UPDATE
              </button>
            ) : (
              <div className="flex items-center justify-center">
                <img className="mr-[2.13vw]" src="../../images/icon-edit.svg" />
                <button
                  className="mr-2 text-[#5357B6]"
                  onClick={() => changeTextAreaStatus(false)}
                >
                  Edit
                </button>
              </div>
            )}
            {textAreaDisabled && (
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
          onClick={(e) => {
            updateEditValue("");
            replyToComment(e, comment.id);
          }}
          className="flex items-center hover:cursor-pointer justify-center w-[17.6vw]"
        >
          <img className="mr-[1.6vw]" src="../../images/icon-reply.svg" />
          <button className="text-[#5357B6] font-medium">Reply</button>
        </div>
      )}
    </>
  );
}

export default ReplyButtonsStack;
