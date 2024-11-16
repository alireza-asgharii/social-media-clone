import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import SearchResults from "../../components/shared/SearchResults";
import GridPostList from "../../components/shared/GridPostList";
import {
  useGetPosts,
  useSearchPosts,
} from "../../lib/react-query/queriesAndMutation";
import useDebounce from "../../hooks/useDebounce";
import Spiner from "../../components/shared/Spinner";

import { useInView } from "react-intersection-observer";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");
  const { ref, inView } = useInView();

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  // Loading
  if (!posts) return <Spiner />;

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((items) => items?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h2-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex w-full gap-1 rounded-lg bg-dark-4 px-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />

          <Input
            type="text"
            className="explore-search"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="flex-between mb-7 mt-16 w-full max-w-5xl">
          <h3 className="body-bold md:h3-bold">Popular Today</h3>

          <div className="flex-center cursor-pointer gap-3 rounded-xl bg-dark-3 px-4 py-2">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <img
              src="/assets/icons/filter.svg"
              alt="filter"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-5xl flex-wrap gap-9">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchPosts={searchPosts?.documents}
          />
        ) : shouldShowPosts ? (
          <p className="mt-10 w-full text-center text-light-4">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Spiner />
        </div>
      )}
    </div>
  );
};

export default Explore;
