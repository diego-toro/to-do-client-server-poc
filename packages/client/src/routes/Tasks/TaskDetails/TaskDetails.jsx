import { FiColumns } from "react-icons/fi";
import Page from "../../../components/Page";
import { Link, useParams } from "react-router-dom";
import Pane from "../../../components/Pane";
import styles from "./TaskDetails.module.css";
import { useEffect, useState } from "react";
import { getTask, updateTask } from "../../../api";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { useLabelsData } from "../../../models/useLabelsData";
import Dropdown, { DropdownItem } from "../../../components/Dropdown/Dropdown";
import { accessibleColor } from "../../../utils/hexToRGB";

const options = {
  TO_DO: "TO DO",
  DOING: "DOING",
  DONE: "DONE",
};

function TaskDetails() {
  const { id } = useParams();
  const [labelList] = useLabelsData();

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
  };

  const handleOptionChange = async (value) => {
    const newTask = await updateTask({ ...task, status: value });
    setTask(newTask);
  };

  const handleLabelsChange = async (value) => {
    const newTask = await updateTask({
      ...task,
      labels: value.map((id) => ({ id })),
    });

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
          <Dropdown
            placeHolder="Select..."
            value={task?.status}
            label={options[task?.status]}
            onChange={handleOptionChange}
          >
            {Object.keys(options).map((key) => (
              <DropdownItem key={key} value={key}>
                {options[key]}
              </DropdownItem>
            ))}
          </Dropdown>
          <hr />
          <Dropdown
            multiple
            placeHolder="Select..."
            value={task?.labels.map((label) => label.id)}
            label={<LabelsSelected labels={task?.labels} />}
            onChange={handleLabelsChange}
          >
            {labelList.map((label) => (
              <DropdownItem
                key={label.id}
                value={label.id}
                className={styles.dropdownItem}
              >
                <div
                  className={styles.colorDemo}
                  style={{ backgroundColor: label.color }}
                />
                {label.title}
              </DropdownItem>
            ))}
          </Dropdown>
        </aside>
      </Pane>
    </Page>
  );
}

function LabelsSelected({ labels }) {
  return (
    <div className={styles.labelsContainer}>
      {(labels ?? []).map((label) => (
        <div
          key={label.id}
          className={styles.label}
          style={{
            backgroundColor: label.color,
            color: accessibleColor(label.color),
          }}
        >
          {label.title}
        </div>
      ))}
    </div>
  );
}

export default TaskDetails;
