import { FiTag } from "react-icons/fi";
import Page from "../../components/Page";
import Pane from "../../components/Pane";
import styles from "./Labels.module.css";
import LabelCreate from "./LabelCreate";
import LabelEdit from "./LabelEdit";
import { useLabelsData } from "../../models/useLabelsData";

function Labels() {
  const [labelList, setLabelList] = useLabelsData();

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
