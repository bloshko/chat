import { useState } from "react";
import "./App.css";
import { CreatePostForm } from "./components/CreatePostForm/CreatePostForm";
import { FilterForm } from "./components/FilterForm/FilterForm";
import { PostList } from "./components/PostList/PostList";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

type Filter = string | null;

export const App = () => {
  // TODO: move postsFilter to React Context
  const [postsFilter, setPostsFilter] = useState<Filter>(null);

  // TODO: change URL in browser to reflect the filter being shown (use e.x react-router)
  const handleOnFilter = (filter: Filter) => setPostsFilter(filter);

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <h1>Chat</h1>
        <PostList requestedTopic={postsFilter || undefined} />
        <FilterForm onFilter={handleOnFilter} />
        <CreatePostForm />
      </main>
    </QueryClientProvider>
  );
};
