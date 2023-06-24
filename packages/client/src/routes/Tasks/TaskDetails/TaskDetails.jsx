import { FiColumns } from "react-icons/fi";
import Page from "../../../components/Page";
import { Link, useParams } from "react-router-dom";
import Pane from "../../../components/Pane/Pane";
import styles from "./TaskDetails.module.css";

function TaskDetails() {
  const { id } = useParams();

  return (
    <Page
      title={
        <>
          <FiColumns />
          <Link to="/tasks">Tasks</Link>
          &gt; {id}
        </>
      }
    >
      <Pane className={styles.details}>Content goes here</Pane>
    </Page>
  );
}

export default TaskDetails;
