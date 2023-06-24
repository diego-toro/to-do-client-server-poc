import styles from "./Pane.module.css";

function Pane({ children, className }) {
  return <div className={`${styles.pane} ${className}`}>{children}</div>;
}

function PaneHeader({ title }) {
  return (
    <div className={styles.titleWrapper}>
      <h4>{title}</h4>
    </div>
  );
}

Pane.Header = PaneHeader;
export default Pane;
