import { API_URL } from "../config";

export type Post = {
  text: string;
  topic: string;
  author: string;
  creationDate: Date;
};

const get = async (path: string) => await fetch(`${API_URL}/${path}`);

const post = async (path: string, body: Record<string, unknown>) =>
  await fetch(`${API_URL}/${path}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getAllPosts = async () => {
  const response = await get("posts");
  const body = await response.json();

  return body;
};

export const createPost = async (newPost: Omit<Post, "creationDate">) => {
  const response = await post("posts", newPost);

  return response;
};

export const getPostsByTopic = async (topic: string) => {
  const response = await get(`posts/topic/${topic}`);
  const body = await response.json();

  return body;
};
