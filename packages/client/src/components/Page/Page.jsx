import styles from "./Page.module.css";

function Page({ title, children }) {
  return (
    <>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </>
  );
}

export default Page;
