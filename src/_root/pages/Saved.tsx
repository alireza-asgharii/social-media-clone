import { Models } from "appwrite";

import { useGetCurrentUser } from "../../lib/react-query/queriesAndMutation";
import Spiner from "../../components/shared/Spinner";
import GridPostList from "../../components/shared/GridPostList";
import ErrorProvider from "../../providers/ErrorProvider";

const Saved = () => {
  const { data: currentUser, isError } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <div className="saved-container">
      <div className="flex w-full max-w-5xl gap-2">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold w-full text-left">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Spiner />
      ) : (
        <ErrorProvider error={isError}>
          <ul className="flex w-full max-w-5xl justify-center gap-9">
            {savePosts.length === 0 ? (
              <p className="text-light-4">No available posts</p>
            ) : (
              <GridPostList posts={savePosts} showStats={false} />
            )}
          </ul>
        </ErrorProvider>
      )}
    </div>
  );
};

export default Saved;
