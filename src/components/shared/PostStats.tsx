import React, { useEffect, useState } from "react";
import { Models } from "appwrite";

import { checkIsLiked } from "../../lib/utils";

import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "../../lib/react-query/queriesAndMutation";

type props = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: props) => {
  const likesList: string[] = post?.likes.map(
    (user: Models.Document) => user.$id,
  );

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record?.post.$id === post?.$id,
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ likesArray: newLikes, postId: post?.$id ?? "" });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavePost(savedPostRecord.$id);
    } else {
      setIsSaved(true);
      savePost({ postId: post?.$id ?? "", userId });
    }
  };

  return (
    <div className="z-20 flex items-center justify-between">
      <div className="flex gap-2">
        <img
          src={`${checkIsLiked(likes, userId) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}`}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-default md:cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="like"
          width={20}
          height={20}
          onClick={handleSavePost}
          className="cursor-default md:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
