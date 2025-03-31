import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosPublic } from "../api/axiosPublic";
import toast from "react-hot-toast";
import BookRow from "./BookRow";
import { FaRandom } from "react-icons/fa";

const BookTable = () => {
  const [seed, setSeed] = useState(42);
  const [locale, setLocale] = useState("en-US");
  const [avgLikes, setAvgLikes] = useState(5);
  const [avgReviews, setAvgReviews] = useState(3);
  const [expandedRow, setExpandedRow] = useState(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    // refetch,
  } = useInfiniteQuery({
    queryKey: ["books", seed, locale, avgLikes, avgReviews],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosPublic.get("/books", {
        params: {
          seed,
          page: pageParam,
          region: locale,
          avgLikes,
          avgReviews,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    initialPageParam: 1,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetchingNextPage ||
        !hasNextPage
      )
        return;
      fetchNextPage();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  if (error) {
    toast.error("Failed to fetch books");
    return <div>Error loading books</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6 space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1">
            <label className="block mb-2">Seed</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={seed}
                onChange={(e) => setSeed(Number(e.target.value))}
                className="border p-2 rounded flex-1"
              />
              <button
                onClick={() => setSeed(Math.floor(Math.random() * 1000000))}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                title="Random Seed"
              >
                <FaRandom />
              </button>
            </div>
          </div>

          <div className="flex-1">
            <label className="block mb-2">Language</label>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="en-US">English (US)</option>
              <option value="de-DE">German (Germany)</option>
              <option value="fr-FR">French (France)</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1">
            <label className="block mb-2">
              Average Likes: {avgLikes.toFixed(1)}
            </label>

            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={avgLikes}
              onChange={(e) => setAvgLikes(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-2">Average Reviews</label>

            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={avgReviews}
              onChange={(e) => setAvgReviews(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">ISBN</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Author(s)</th>
            <th className="p-3 text-left">Publisher</th>
          </tr>
        </thead>

        <tbody>
          {data?.pages?.flatMap((page) =>
            page.map((book) => (
              <BookRow
                key={book.isbn}
                book={book}
                isExpanded={expandedRow === book.isbn}
                onExpand={() =>
                  setExpandedRow(expandedRow === book.isbn ? null : book.isbn)
                }
              />
            ))
          )}
        </tbody>
      </table>

      {(isFetching || isFetchingNextPage) && (
        <div className="text-center p-4">Loading more books...</div>
      )}
    </div>
  );
};

export default BookTable;
