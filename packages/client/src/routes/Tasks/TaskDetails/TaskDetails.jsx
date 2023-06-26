import { FiColumns } from "react-icons/fi";
import Page from "../../../components/Page";
import { Link, useParams } from "react-router-dom";
import Pane from "../../../components/Pane";
import styles from "./TaskDetails.module.css";
import { useEffect, useState } from "react";
import { getTask, updateTask } from "../../../api";
import Card from "../../../components/Card";
import Button from "../../../components/Button";

const options = [
  { value: "TO_DO", label: "TO DO" },
  { value: "DOING", label: "DOING" },
  { value: "DONE", label: "DONE" },
];

function TaskDetails() {
  const { id } = useParams();

  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const task = await getTask(id);
      setTask(task);
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const editableFields = Object.fromEntries(formData);
    const newTask = await updateTask({ ...task, ...editableFields });
    setTask(newTask);
    console.log(
      "🚀 ~ file: TaskDetails.jsx:33 ~ handleSubmit ~ newTask:",
      newTask
    );
  };

  const handleOptionChange = async (event) => {
    const newTask = await updateTask({ ...task, status: event.target.value });
    setTask(newTask);
  };

  return (
    <Page
      title={
        <>
          <FiColumns />
          <Link to="/tasks">Tasks</Link> / {id}
        </>
      }
    >
      <Pane className={styles.details}>
        <form onSubmit={handleSubmit}>
          <section className={styles.fieldWrapper}>
            <Card className={styles.title}>
              <input
                type="text"
                name="title"
                className={styles.input}
                defaultValue={task?.title}
              />
            </Card>
            <Card className={styles.description}>
              <textarea
                name="description"
                className={styles.textarea}
                defaultValue={task?.description}
                placeholder="Add a description..."
              />
            </Card>

            <Button type="submit" className={styles.saveButton}>
              Save
            </Button>
          </section>
        </form>
        <aside>
          <select value={task?.status} onChange={handleOptionChange}>
            <option value="">Select...</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </aside>
      </Pane>
    </Page>
  );
}

export default TaskDetails;
