import { updateLabel } from "../../../api";
import PopIn, { PopContent, PopInTrigger } from "../../../components/PopIn";
import { accessibleColor } from "../../../utils/hexToRGB";
import LabelForm from "../LabelForm";
import styles from "./LabelEdit.module.css";

function LabelEdit({ label, setLabelList }) {
  const handleSubmit = async (formValues) => {
    const newLabel = await updateLabel({ ...formValues, id: label.id });
    setLabelList((prevLabels) =>
      prevLabels.map((prevLabel) =>
        label.id === prevLabel.id ? newLabel : prevLabel
      )
    );
  };

  return (
    <PopIn>
      <PopInTrigger
        className={styles.label}
        style={{ backgroundColor: label.color }}
      >
        <span style={{ color: accessibleColor(label.color) }}>
          {label.title}
        </span>
      </PopInTrigger>

      <PopContent>
        <LabelForm
          label={label}
          setLabelList={setLabelList}
          onSubmit={handleSubmit}
        ></LabelForm>
      </PopContent>
    </PopIn>
  );
}

export default LabelEdit;
