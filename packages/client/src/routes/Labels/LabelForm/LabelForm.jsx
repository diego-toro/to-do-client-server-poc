import { useRef } from "react";
import Button from "../../../components/Button";
import styles from "./LabelForm.module.css";
import { colors } from "./constans";

function ColorItem({ color, name, required, checked }) {
  return (
    <label className={styles.colorItem}>
      <input
        type="radio"
        id={color}
        name={name}
        defaultChecked={checked}
        value={color}
        required={required}
      />
      <div className={styles.colorBox} style={{ backgroundColor: color }} />
    </label>
  );
}
function LabelForm({ label, onSubmit }) {
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    onSubmit(Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className={styles.title}>{label ? "Edit" : "Add"} Label</h4>
      <hr />
      <div className={styles.addTask}>
        <label htmlFor="label-title">Title</label>
        <input
          ref={inputRef}
          id="label-title"
          name="title"
          type="text"
          className={styles.input}
          placeholder="..."
          defaultValue={label?.title}
          autoFocus
          required
        />

        <label htmlFor="color">Select a Color</label>
        <div className={styles.colorWrapper}>
          {Object.values(colors).map((color) => (
            <ColorItem
              key={color}
              color={color}
              name="color"
              checked={label?.color === color}
              required
            />
          ))}
        </div>
      </div>
      <hr />
      <Button type="submit">{label ? "Save" : "Add"}</Button>
    </form>
  );
}

export default LabelForm;
