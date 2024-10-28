"use strict";

import CommentsCard from "./CommentsCard";

function CommentsList({ commentsData, UpdateCommentsData, currentUser }) {
  return (
    <>
      {commentsData &&
        commentsData.length !== 0 &&
        commentsData.map((comment) => {
          return (
            <div className="p-4" key={comment.id}>
              <CommentsCard
                comment={comment}
                UpdateCommentsData={UpdateCommentsData}
                currentUser={currentUser}
                commentType="parent"
              />
            </div>
          );
        })}
    </>
  );
}

export default CommentsList;
