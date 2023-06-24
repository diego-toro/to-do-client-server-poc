import styles from "./IconButton.module.css";

function IconButton({ children, onClick, type }) {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
export default IconButton;
