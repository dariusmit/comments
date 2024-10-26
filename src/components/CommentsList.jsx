"use strict";

import CommentsCard from "./CommentsCard";

function CommentsList({
  commentsList,
  textAreaDisabled,
  changeTextAreaStatus,
  UpdateCommentsList,
}) {
  return (
    <>
      {commentsList &&
        commentsList.length !== 0 &&
        commentsList.map((comment) => {
          return (
            <div className="p-4" key={comment.id}>
              <CommentsCard
                commentsList={commentsList}
                comment={comment}
                textAreaDisabled={textAreaDisabled}
                changeTextAreaStatus={changeTextAreaStatus}
                UpdateCommentsList={UpdateCommentsList}
              />
              {comment.replies &&
                comment.replies.length !== 0 &&
                comment.replies.map((reply) => {
                  return (
                    <div key={reply.id} className="pl-6 pt-4">
                      <CommentsCard
                        commentsList={commentsList}
                        comment={reply}
                        textAreaDisabled={textAreaDisabled}
                        changeTextAreaStatus={changeTextAreaStatus}
                        UpdateCommentsList={UpdateCommentsList}
                      />
                    </div>
                  );
                })}
            </div>
          );
        })}
    </>
  );
}

export default CommentsList;
