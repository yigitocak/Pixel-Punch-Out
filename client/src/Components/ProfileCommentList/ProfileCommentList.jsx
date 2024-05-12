import "./ProfileCommentList.scss";
import { ProfileCommentsItem } from "../ProfileCommentsItem/ProfileCommentsItem";

export const ProfileCommentList = ({
  comments,
  username,
  profileId,
  reRender,
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
              user={comment.username}
              timestamp={comment.timestamp}
              username={username}
              id={comment.commentId}
              profileId={profileId}
              reRender={reRender}
            />
          );
        })}
      </ul>
    </section>
  );
};
