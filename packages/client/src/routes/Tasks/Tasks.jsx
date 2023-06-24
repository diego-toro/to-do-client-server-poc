import { useEffect, useState } from "react";
import { getTasks } from "../../api";
import Page from "../../components/Page";
import Pane from "../../components/Pane/Pane";
import TaskCreate from "./TaskCreate";
import TaskItem from "./TaskItem";
import styles from "./Tasks.module.css";
import { FiColumns } from "react-icons/fi";

function Tasks() {
  const [taskList, setTaskList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTaskList(tasks);
    };
    fetchTasks();
  }, []);

  return (
    <Page
      title={
        <>
          <FiColumns />
          Tasks
        </>
      }
    >
      <div className={styles.columns}>
        <Pane className={styles.tasks}>
          <Pane.Header title="To Do" />
          {taskList.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              setTaskList={setTaskList}
              editingId={editingId}
              setEditingId={setEditingId}
            />
          ))}

          <TaskCreate setTaskList={setTaskList} setEditingId={setEditingId} />
        </Pane>
        <Pane className={styles.tasks}>
          <Pane.Header title="Doing" />

          <TaskCreate setTaskList={setTaskList} setEditingId={setEditingId} />
        </Pane>
        <Pane className={styles.tasks}>
          <Pane.Header title="Done" />

          <TaskCreate setTaskList={setTaskList} setEditingId={setEditingId} />
        </Pane>
      </div>
    </Page>
  );
}

export default Tasks;
