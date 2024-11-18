import { Models } from "appwrite";
import Spiner from "../../components/shared/Spinner";
import {
  useGetRecentPosts,
  useGetUsers,
} from "../../lib/react-query/queriesAndMutation";
import PostCard from "../../components/shared/PostCard";
import Creator from "../../components/shared/Creator";

const Home = () => {
  const {
    data: posts,
    isPending: isPostsLoading,
    // isError: isPostsError,
  } = useGetRecentPosts();

  const { data: users, isPending: isLoadingUsers } = useGetUsers(10);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold w-full text-left">Home feed</h2>

          {/* posts */}
          {isPostsLoading && !posts ? (
            <Spiner />
          ) : (
            <ul className="flex w-full flex-1 flex-col gap-9">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id}>
                  <PostCard key={post.$id} post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h2 className="h3-bold md:h2-bold w-full text-left">Top Creator</h2>
        {isLoadingUsers ? (
          <Spiner />
        ) : (
          <div className="grid grid-cols-2 gap-4 pt-10">
            {users?.documents?.map((creator) => <Creator creator={creator} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
