import { FiTag } from "react-icons/fi";
import Page from "../../components/Page";
import Pane from "../../components/Pane";
import styles from "./Labels.module.css";
import { getLabels } from "../../api";
import { useEffect, useState } from "react";
import LabelCreate from "./LabelCreate";
import { accessibleColor } from "../../utils/hexToRGB";

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
        {labelList.map((label) => (
          <button
            key={label.id}
            className={styles.label}
            style={{ backgroundColor: label.color }}
          >
            <span style={{ color: accessibleColor(label.color) }}>
              {label.title}
            </span>
          </button>
        ))}

        <LabelCreate setLabelList={setLabelList} />
      </Pane>
    </Page>
  );
}

export default Labels;
