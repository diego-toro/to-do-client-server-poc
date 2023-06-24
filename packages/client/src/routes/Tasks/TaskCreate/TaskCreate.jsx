import { useCallback, useRef, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { addTask } from "../../../api";
import Button from "../../../components/Button/Button";
import { useClickAway, useKeySubscription } from "../../../utils";
import styles from "./TaskCreate.module.css";

function TaskCreateForm({ setTaskList, setEditingId, setFocus }) {
  const inputRef = useRef();

  const callback = useCallback(() => {
    setFocus(false);
  }, [setFocus]);

  const ref = useClickAway(callback);

  useKeySubscription(callback);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const task = await addTask(Object.fromEntries(formData));

    setTaskList((prevTasks) => prevTasks.concat([task]));
    inputRef.current.value = "";
    setEditingId(null);
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className={styles.addTask}>
      <input
        ref={inputRef}
        name="title"
        type="text"
        className={styles.input}
        placeholder="Add Task..."
        autoFocus
        required
      />

      <button
        type="button"
        className={styles.icon}
        onClick={() => setFocus(false)}
      >
        <FiX />
      </button>

      <Button type="submit" className={styles.button}>
        Add
      </Button>
    </form>
  );
}

function TaskCreate({ setTaskList, setEditingId }) {
  const [focus, setFocus] = useState(false);

  return (
    <>
      {!focus ? (
        <button className={styles.control} onClick={() => setFocus(true)}>
          <FiPlus className={styles.icon} />
          <span>Add Task...</span>
        </button>
      ) : (
        <TaskCreateForm
          setTaskList={setTaskList}
          setEditingId={setEditingId}
          setFocus={setFocus}
        />
      )}
    </>
  );
}

export default TaskCreate;
