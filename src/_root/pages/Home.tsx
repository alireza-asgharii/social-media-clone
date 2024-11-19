import { Models } from "appwrite";
import Spiner from "../../components/shared/Spinner";
import {
  useGetRecentPosts,
  useGetUsers,
} from "../../lib/react-query/queriesAndMutation";
import PostCard from "../../components/shared/PostCard";
import Creator from "../../components/shared/Creator";
import ErrorProvider from "../../providers/ErrorProvider";
import useTitle from "../../hooks/Title";

const Home = () => {
  const {
    data: posts,
    isPending: isPostsLoading,
    isError: isPostsError,
    error: postError,
    refetch: refetchPosts,
    isRefetching,
  } = useGetRecentPosts();

  const {
    data: users,
    isPending: isLoadingUsers,
    error: usersError,
    isError: isUsersError,
    refetch: refetchUsers,
    isRefetching: isRefetchingUsers,
  } = useGetUsers(10);

  useTitle("Home page");

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold w-full text-left">Home feed</h2>

          {/* posts */}
          <ErrorProvider
            error={isPostsError}
            message={postError?.message}
            refetch={refetchPosts}
            isRefetching={isRefetching}
          >
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
          </ErrorProvider>
        </div>
      </div>

      <div className="home-creators">
        <h2 className="h3-bold md:h2-bold w-full text-left">Top Creator</h2>
        <ErrorProvider
          error={isUsersError}
          message={usersError?.message}
          refetch={refetchUsers}
          isRefetching={isRefetchingUsers}
        >
          {isLoadingUsers ? (
            <Spiner />
          ) : (
            <div className="grid grid-cols-2 gap-4 pt-10">
              {users?.documents?.map((creator) => (
                <Creator creator={creator} />
              ))}
            </div>
          )}
        </ErrorProvider>
      </div>
    </div>
  );
};

export default Home;
