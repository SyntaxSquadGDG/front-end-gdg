import { useInfiniteQuery } from '@tanstack/react-query';

const usePaginatedQuery = (queryKey, fetchFunction, options = {}) => {
  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 1 }) => fetchFunction(pageParam),
      getNextPageParam: (lastPage, pages) => {
        const hasData = lastPage.length > 0;

        const isLastPage = !hasData || lastPage.length < 5; // Adjust length based on how many items are expected per page

        return hasData && !isLastPage ? pages.length + 1 : undefined;
      },
      refetchOnWindowFocus: false, // Default to false
      ...options, // Spread additional options
    });

  return { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage };
};

export default usePaginatedQuery;

