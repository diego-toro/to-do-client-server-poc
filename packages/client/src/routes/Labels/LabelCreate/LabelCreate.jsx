import { FiPlus } from "react-icons/fi";
import { addLabel } from "../../../api";
import PopIn, { PopContent, PopInTrigger } from "../../../components/PopIn";
import LabelCreateForm from "../LabelForm";
import styles from "./TaskCreate.module.css";

function LabelCreate({ setLabelList }) {
  const handleSubmit = async (formValues) => {
    const newLabel = await addLabel(formValues);
    setLabelList((prevLabels) => prevLabels.concat([newLabel]));
  };

  return (
    <PopIn>
      <PopInTrigger className={styles.control}>
        <FiPlus className={styles.icon} />
        <span>Add Label...</span>
      </PopInTrigger>

      <PopContent>
        <LabelCreateForm
          setLabelList={setLabelList}
          onSubmit={handleSubmit}
        ></LabelCreateForm>
      </PopContent>
    </PopIn>
  );
}

export default LabelCreate;
