import { FiTag } from "react-icons/fi";
import Page from "../../components/Page";
import Pane from "../../components/Pane";
import styles from "./Labels.module.css";
import { getLabels } from "../../api";
import { useEffect, useState } from "react";
import LabelCreate from "./LabelCreate";
import LabelEdit from "./LabelEdit";

function Labels() {
  const [labelList, setLabelList] = useState([]);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const tasks = await getLabels();
        setLabelList(tasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLabels();
  }, []);

  return (
    <Page
      title={
        <>
          <FiTag />
          Labels
        </>
      }
    >
      <Pane className={styles.labelsContent}>
        <div className={styles.container}>
          {labelList.map((label) => (
            <LabelEdit
              key={label.id}
              label={label}
              setLabelList={setLabelList}
            />
          ))}

          <LabelCreate setLabelList={setLabelList} />
        </div>
      </Pane>
    </Page>
  );
}

export default Labels;
