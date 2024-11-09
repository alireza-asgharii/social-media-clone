import { Models } from "appwrite";
import Spiner from "../../components/shared/Spinner";
import { useGetRecentPosts } from "../../lib/react-query/queriesAndMutation";
import PostCard from "../../components/shared/PostCard";

const Home = () => {
  const {
    data: posts,
    isPending: isPostsLoading,
    // isError: isPostsError,
  } = useGetRecentPosts();

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
    </div>
  );
};

export default Home;
