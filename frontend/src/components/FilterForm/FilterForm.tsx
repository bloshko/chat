import { ChangeEvent, useState, FormEvent } from "react";
import styles from "./styles.module.css";

interface FilterFormProps {
  onFilter: (filter: string | null) => void;
}

export const FilterForm = ({ onFilter }: FilterFormProps) => {
  const [topicFilter, setTopicFilter] = useState("");

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setTopicFilter(event.target.value);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onFilter(topicFilter);
  };

  const handleReset = () => {
    setTopicFilter("");
    onFilter(null);
  };

  return (
    // TODO: use react-hook-form (because of its ease of showing errors and handling inputs)
    // TODO: show errors for the field if backend fails validation
    <form className={styles.filterForm} onSubmit={handleOnSubmit}>
      <h2>Filter posts</h2>
      <label htmlFor="topic-filter">Topic</label>
      <input
        id="topic-filter"
        type="text"
        value={topicFilter}
        onChange={handleOnChange}
      />
      <div className={styles.controls}>
        <button className={styles.reset} type="reset" onClick={handleReset}>
          Reset filter
        </button>
        <button className={styles.submit} type="submit">
          Filter
        </button>
      </div>
    </form>
  );
};
