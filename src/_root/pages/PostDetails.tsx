import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeletePost,
  useGetPostById,
} from "../../lib/react-query/queriesAndMutation";
import Spiner from "../../components/shared/Spinner";
import DefaultProfile from "../../components/shared/DefaultProfile";
import { timeAgo } from "../../lib/utils";
import { useUserContext } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import PostStats from "../../components/shared/PostStats";
import { toast } from "../../hooks/use-toast";

import AlertModal from "../../components/shared/AlertModal";
import { useModal } from "../../context/ModalContext";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useUserContext();

  const { openModal } = useModal();

  const { mutate: deletePost, isPending: isDeletePostLoading } =
    useDeletePost();
  const { data: post, isPending } = useGetPostById(id!);

  const handleDeletePost = () => {
    openModal(
      "Do you want to delete the post?",
      "This will make the post unavailable.",
      () =>
        deletePost(
          { postId: post?.$id!, imageId: post?.imageId },
          {
            onSuccess: () => {
              toast({ title: "Delete post successfully" });
              navigate("/");
            },
          },
        ),
      "Delete",
    );
  };

  return (
    <div className="post_details-container">
      {isPending ? (
        <Spiner />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                {post?.creator?.imageUrl && (
                  <img
                    src={post?.creator?.imageUrl}
                    alt="profile"
                    className="h-8 w-8 rounded-full lg:h-12 lg:w-12"
                  />
                )}
                {!post?.creator?.imageUrl && (
                  <DefaultProfile value={post?.creator?.name[0]} />
                )}

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator?.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {timeAgo(post?.$createdAt ?? "")}
                    </p>
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user?.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={18}
                    height={18}
                  />
                </Link>
                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${user?.id !== post?.creator.$id && "hidden"}`}
                  disabled={isDeletePostLoading}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={18}
                    height={18}
                  />
                  {isDeletePostLoading && <Spiner />}
                </Button>
                <AlertModal />
              </div>
            </div>

            <hr className="w-full border border-dark-4/80" />
            <div className="small-medium lg:base-regular flex w-full flex-1 flex-col">
              <p>{post?.caption}</p>
              <ul className="mt-2 flex gap-1">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
