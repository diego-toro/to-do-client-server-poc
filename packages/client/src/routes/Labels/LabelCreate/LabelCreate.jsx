import { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { addLabel } from "../../../api";
import Button from "../../../components/Button/Button";
import styles from "./TaskCreate.module.css";
import { colors } from "./constans";

function ColorItem({ color, name, required }) {
  return (
    <label className={styles.colorItem}>
      <input
        type="radio"
        id={color}
        name={name}
        value={color}
        required={required}
      />
      <div className={styles.colorBox} style={{ backgroundColor: color }} />
    </label>
  );
}

function LabelCreateForm({ setLabelList }) {
  const inputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newLabel = await addLabel(Object.fromEntries(formData));
    setLabelList((prevLabels) => prevLabels.concat([newLabel]));
    inputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addTask}>
      <div>
        <label htmlFor="label-title">Title</label>
        <input
          ref={inputRef}
          id="label-title"
          name="title"
          type="text"
          className={styles.input}
          placeholder="..."
          autoFocus
          required
        />

        <div className={styles.colorWrapper}>
          {Object.values(colors).map((color) => (
            <ColorItem key={color} color={color} name="color" required />
          ))}
        </div>
      </div>
      <Button type="submit" className={styles.button}>
        Add
      </Button>
    </form>
  );
}

function LabelCreate({ setLabelList }) {
  const [focus, setFocus] = useState(false);

  return (
    <>
      {!focus ? (
        <button className={styles.control} onClick={() => setFocus(true)}>
          <FiPlus className={styles.icon} />
          <span>Add Label...</span>
        </button>
      ) : (
        <LabelCreateForm setLabelList={setLabelList} />
      )}
    </>
  );
}

export default LabelCreate;
