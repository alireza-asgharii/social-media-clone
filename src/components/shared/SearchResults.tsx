import { Models } from "appwrite";
import Spiner from "./Spinner";
import GridPostList from "./GridPostList";

type props = {
  searchPosts?: Models.Document[];
  isSearchFetching: boolean;
};

const SearchResults = ({ isSearchFetching, searchPosts }: props) => {
  if (isSearchFetching) return <Spiner />;

  if (searchPosts && searchPosts?.length > 0)
    return <GridPostList posts={searchPosts} />;

  return (
    <p className="mt-10 w-full text-center text-light-4">No result found</p>
  );
};

export default SearchResults;
