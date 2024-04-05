type Post = {
  text: string;
  topic: string | null;
  author: string;
  creationDate: Date;
};

const examplePost: Post = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  topic: "main",
  author: "admin",
  creationDate: new Date(),
};

const posts: Post[] = [examplePost];

// TODO: add validation and sanitization for inputs
export const addPost = ({ author, topic, text }: Post) => {
  const topicValue = topic === "" || !topic ? null : topic.trim();

  posts.unshift({
    author: author.trim(),
    text: text.trim(),
    topic: topicValue,
    creationDate: new Date(),
  });
};

export const getAllPosts = () => JSON.stringify(posts);

// TODO: add validation and sanitization for inputs
export const getAllPostsByTopic = (requestedTopic: Post["topic"]) =>
  posts.filter(({ topic }) => topic === requestedTopic);
