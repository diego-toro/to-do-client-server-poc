import { FiTag } from "react-icons/fi";
import Page from "../../components/Page";
import Pane from "../../components/Pane";
import styles from "./Labels.module.css";

function Labels() {
  return (
    <Page
      title={
        <>
          <FiTag />
          Labels
        </>
      }
    >
      <Pane className={styles.labels}>Content goes here</Pane>
    </Page>
  );
}

export default Labels;
