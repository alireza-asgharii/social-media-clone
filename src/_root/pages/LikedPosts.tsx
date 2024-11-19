import GridPostList from "../../components/shared/GridPostList";
import Spiner from "../../components/shared/Spinner";
import useTitle from "../../hooks/Title";
import { useGetCurrentUser } from "../../lib/react-query/queriesAndMutation";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  useTitle("Liked posts");

  if (!currentUser)
    return (
      <div className="flex-center h-full w-full">
        <Spiner />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPosts;
