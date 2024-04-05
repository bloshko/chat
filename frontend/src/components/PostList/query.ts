import { getAllPosts, getPostsByTopic, Post } from "../../utils/api";
import { useQuery } from "@tanstack/react-query";

export const POSTS_QUERY_KEY = "posts";
export const POSTS_BY_TOPIC_QUERY_KEY = "postsByTopic";

export const POSTS_POLLING_INTERVAL = 1000;

export const usePostsQuery = (requestedTopic?: string) => {
  const allPostsQuery = useQuery({
    queryKey: [POSTS_QUERY_KEY],
    enabled: !requestedTopic,
    // Polling all posts is not an efficient way to dynamically represent DB state.
    // Ideally I would use polling by index of last received element so backend returns only elements that I don't have.
    refetchInterval: POSTS_POLLING_INTERVAL,
    queryFn: async () => {
      const allPosts = await getAllPosts();

      return allPosts as Post[];
    },
  });

  const postsByTopicQuery = useQuery({
    queryKey: [POSTS_BY_TOPIC_QUERY_KEY],
    enabled: !!requestedTopic,
    refetchInterval: POSTS_POLLING_INTERVAL,
    queryFn: async () => {
      const postsByTopic = await getPostsByTopic(requestedTopic!);

      return postsByTopic as Post[];
    },
  });

  return requestedTopic ? postsByTopicQuery : allPostsQuery;
};
