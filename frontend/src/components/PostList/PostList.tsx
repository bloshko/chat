import { useEffect, useRef } from "react";
import { usePostsQuery } from "./query";
import styles from "./styles.module.css";

export const PostList = ({ requestedTopic }: { requestedTopic?: string }) => {
  const { data: posts } = usePostsQuery(requestedTopic);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      section.scrollTop = section.scrollHeight;
    }
  }, [sectionRef]);

  const hasNoPosts = posts?.length === 0;

  return (
    <section ref={sectionRef} className={styles.postList}>
      {hasNoPosts && <p className={styles.noPosts}>No posts yet</p>}

      {posts?.map(({ text, topic, author, creationDate }, index) => (
        // Here I decided to use index for key since I don't expect that elements will be removed.
        // In real life project I would use a unique identifier for each post that, hopefully, is returned from the endpoint.
        <div key={index} className={styles.post}>
          <div className={styles.title}>
            <h3 className={styles.author}>{author}</h3>
            <span className={styles.date}>
              {new Date(creationDate).toLocaleString()}
            </span>
          </div>
          <h4 className={styles.topic}>{topic}</h4>
          <p className={styles.text}>{text}</p>
        </div>
      ))}
    </section>
  );
};
