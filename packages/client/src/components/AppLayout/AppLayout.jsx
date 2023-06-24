import { Link, Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.headerNav}>
          <h1 className={styles.title}>Le Board</h1>

          <Link className={styles.link} to={`/`}>
            <span>Tasks</span>
          </Link>

          <Link className={styles.link} to={`/labels`}>
            <span>Labels</span>
          </Link>
        </nav>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
}
export default AppLayout;
