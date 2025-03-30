import axiosPublic from "../services/axiosPublic";
import { useQuery } from "@tanstack/react-query";
const fetchBooks = async ({
  seed,
  locale,
  avgLikes,
  avgReviews,
  startIndex = 0,
}) => {
  const response = await axiosPublic.get("/books", {
    // url mane plain text convert from object
    params: { seed, locale, avgLikes, avgReviews, startIndex, count: 20 },
  });
  return response.data;
};

export const useBooks = (seed, locale, avgLikes, avgReviews) => {
  return useQuery({
    queryKey: ["books", seed, locale, avgLikes, avgReviews],
    queryFn: () => fetchBooks({ seed, locale, avgLikes, avgReviews }),
    staleTime: Infinity,
  });
};
