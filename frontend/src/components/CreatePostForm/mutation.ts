import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../utils/api";
import { POSTS_BY_TOPIC_QUERY_KEY, POSTS_QUERY_KEY } from "../PostList/query";

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEY, POSTS_BY_TOPIC_QUERY_KEY],
      });
    },
    mutationFn: async (values: {
      author: string;
      topic: string;
      text: string;
    }) => {
      const response = await createPost(values);

      return response;
    },
  });

  return mutation;
};
