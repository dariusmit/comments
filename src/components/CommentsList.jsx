"use strict";

import CommentsCard from "./CommentsCard";

function CommentsList({ commentsData, updateCommentsData, currentUser }) {
  return (
    <>
      {commentsData &&
        commentsData.length !== 0 &&
        commentsData.map((comment) => {
          return (
            <div className="p-4" key={comment.id}>
              <CommentsCard
                comment={comment}
                updateCommentsData={updateCommentsData}
                currentUser={currentUser}
                commentsData={commentsData}
              />
              {comment.replies &&
                comment.replies.length !== 0 &&
                comment.replies.map((reply) => {
                  return (
                    <div key={reply.id} className="pl-6 pt-4">
                      <CommentsCard
                        comment={reply}
                        updateCommentsData={updateCommentsData}
                        currentUser={currentUser}
                        commentsData={commentsData}
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
