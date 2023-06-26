import { FiTrash2 } from "react-icons/fi";
import { updateLabel, deleteLabel } from "../../../api";
import IconButton from "../../../components/IconButton";
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

  const handleDelete = async (event) => {
    event.stopPropagation();
    if (confirm("Are you sure?")) {
      await deleteLabel(label.id);
      setLabelList((prevLabels) =>
        prevLabels.filter(({ id }) => id !== label.id)
      );
    }
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
        <IconButton type="button" onClick={handleDelete}>
          <FiTrash2 />
        </IconButton>
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
