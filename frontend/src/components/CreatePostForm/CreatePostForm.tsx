import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles.module.css";
import { useCreatePostMutation } from "./mutation";

const defaultValues = { author: "", topic: "", text: "" };

type Field = keyof typeof defaultValues;

export const CreatePostForm = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const { mutate } = useCreatePostMutation();

  const getHandleOnChange =
    (fieldName: Field) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues({ ...formValues, [fieldName]: event.target.value });
    };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate(formValues, {
      onSuccess: () =>
        setFormValues({
          ...defaultValues,
          author: formValues.author,
        }),
    });
  };

  return (
    // TODO: use react-hook-form (because of its ease of showing errors and handling inputs)
    // TODO: show errors for each field if backend fails validation
    <form className={styles.postForm} onSubmit={handleOnSubmit}>
      <h2>Create post</h2>
      <label htmlFor="author">Author</label>
      <input
        required
        onChange={getHandleOnChange("author")}
        id="author"
        type="text"
        value={formValues.author}
        minLength={4}
        maxLength={20}
      />

      <label htmlFor="topic">Topic</label>
      <input
        onChange={getHandleOnChange("topic")}
        id="topic"
        type="text"
        value={formValues.topic}
      />

      <label htmlFor="text">Post text</label>
      <textarea
        required
        className={styles.text}
        onChange={getHandleOnChange("text")}
        id="text"
        maxLength={140}
        value={formValues.text}
      />

      {/* TODO: add loading indicator to show that request is being handled */}
      <button className={styles.submit} type="submit">
        Create
      </button>
    </form>
  );
};
