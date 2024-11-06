"use strict";

import CommentsCard from "./CommentsCard";

function CommentsList({
  commentsData,
  updateCommentsData,
  currentUser,
  idCounter,
  setIDcounter,
}) {
  return (
    <>
      {commentsData &&
        commentsData.length !== 0 &&
        commentsData.map((comment) => {
          return (
            <div key={comment.id}>
              <CommentsCard
                comment={comment}
                updateCommentsData={updateCommentsData}
                currentUser={currentUser}
                commentsData={commentsData}
                idCounter={idCounter}
                setIDcounter={setIDcounter}
              />
              <div className="border-l-2">
                {comment.replies &&
                  comment.replies.length !== 0 &&
                  comment.replies.map((reply) => {
                    return (
                      <div key={reply.id}>
                        <div className="pl-4 desktop:pl-6">
                          <CommentsCard
                            comment={reply}
                            updateCommentsData={updateCommentsData}
                            currentUser={currentUser}
                            commentsData={commentsData}
                            idCounter={idCounter}
                            setIDcounter={setIDcounter}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </>
  );
}

export default CommentsList;
