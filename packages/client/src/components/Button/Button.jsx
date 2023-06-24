import styles from "./Button.module.css";

function Button({ children, onClick, type, className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
}
export default Button;
