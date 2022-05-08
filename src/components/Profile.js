import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePosts } from "../feature/checkProfile/checkProfileSlice";
import { getProfileInfo } from "../feature/checkProfile/checkProfileSlice";
import PostItem from "./PostItem";

function Profile() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.checkProfileReducer.profileId);
  const postList = useSelector((state) => state.checkProfileReducer.postList);
  const userInfo = useSelector(
    (state) => state.checkProfileReducer.profileInfo
  );

  useEffect(() => {
    if (userId !== null) {
      dispatch(getProfilePosts(userId));
      dispatch(getProfileInfo(userId));
    }
  }, []);

  return (
    <div>

      {postList !== null ? (
        postList.map((postItem) => {
          return (
            <PostItem
              key={postItem.id}
              postId={postItem.id}
              userId={postItem.userId}
              firstName={userInfo.firstName}
              lastName={userInfo.lastName}
              content={postItem.content}
              image={postItem.image}
              likeList={postItem.like}
              shareList={postItem.share}
              commentList={postItem.comment}
              postDate={postItem.createdAt}
            />
          );
        })
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default Profile;
