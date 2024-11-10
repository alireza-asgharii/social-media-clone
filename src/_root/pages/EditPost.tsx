import { useParams } from "react-router-dom";
import PostForm from "../../components/forms/PostForm";
import { useGetPostById } from "../../lib/react-query/queriesAndMutation";
import Spiner from "../../components/shared/Spinner";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post, isPending: isPostLoading } = useGetPostById(id!);

  if (isPostLoading) return <Spiner />;
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start w-full max-w-5xl justify-start gap-3">
          <img
            src="/assets/icons/add-post.svg"
            alt="add"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold w-full text-left">Edit post</h2>
        </div>

        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};

export default EditPost;
