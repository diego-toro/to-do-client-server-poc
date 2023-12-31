import { updateTask, deleteTask } from "../../../api";
import { useClickAway } from "../../../utils";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import styles from "./TaskItem.module.css";
import IconButton from "../../../components/IconButton";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function InlineEditForm({ task, setEditingId, setTaskList }) {
  const inputRef = useRef();
  const ref = useClickAway(() => {
    setEditingId(null);
  });

  const handleUpdateTaskContent = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const editableFields = Object.fromEntries(formData);

    const newTask = await updateTask({ ...task, ...editableFields });
    setTaskList((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === newTask.id ? newTask : prevTask
      )
    );

    setEditingId(null);
  };

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  return (
    <form ref={ref} onSubmit={handleUpdateTaskContent}>
      <div className={styles.background} onClick={() => setEditingId(null)} />
      <Card className={styles.content}>
        <div>
          <textarea
            ref={inputRef}
            className={styles.textarea}
            name="title"
            defaultValue={task.title}
            required
          />
        </div>

        <Button type="submit">Save</Button>
      </Card>
    </form>
  );
}

function TaskItem({ task, setTaskList, editingId, setEditingId }) {
  const handleDelete = async (event) => {
    event.preventDefault();
    if (confirm("Are you sure?")) {
      await deleteTask(task.id);
      setTaskList((prevTasks) => prevTasks.filter(({ id }) => id !== task.id));
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setEditingId(task.id);
  };
  return (
    <Card className={styles.taskItem}>
      <Link to={`${task.id}`}>
        <div className={styles.taskContent}>
          <span>{task.title}</span>
          <div className={styles.buttonGroup}>
            <IconButton type="button" onClick={handleEdit}>
              <FiEdit2 />
            </IconButton>
            <IconButton type="button" onClick={handleDelete}>
              <FiTrash2 />
            </IconButton>
          </div>
        </div>
      </Link>

      {task.id === editingId ? (
        <InlineEditForm
          task={task}
          setEditingId={setEditingId}
          setTaskList={setTaskList}
        />
      ) : null}
    </Card>
  );
}

export default TaskItem;
