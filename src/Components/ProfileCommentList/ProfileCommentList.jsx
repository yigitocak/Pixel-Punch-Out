import "./ProfileCommentList.scss";
import { ProfileCommentsItem } from "../ProfileCommentsItem/ProfileCommentsItem";

export const ProfileCommentList = ({
  comments,
  username,
  profileId,
  reRender,
  user,
  setFlashMessage,
  setFlashSuccess,
  setShowSnackbar,
}) => {
  const sortedComments = comments.sort((a, b) => b.timestamp - a.timestamp);
  return (
    <section className="comment">
      <ul className="comment__list">
        {sortedComments.map((comment) => {
          return (
            <ProfileCommentsItem
              key={comment.commentId}
              comment={comment.comment}
              timestamp={comment.timestamp}
              username={username}
              commentId={comment.commentId}
              profileId={profileId}
              reRender={reRender}
              id={comment.id}
              user={user}
              setFlashSuccess={setFlashSuccess}
              setFlashMessage={setFlashMessage}
              setShowSnackbar={setShowSnackbar}
            />
          );
        })}
      </ul>
    </section>
  );
};
