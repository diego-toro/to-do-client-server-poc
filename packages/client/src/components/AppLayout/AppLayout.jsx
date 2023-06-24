import { NavLink, Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.headerNav}>
          <h1 className={styles.title}>Le Board</h1>

          <NavLink className={styles.link} to={`/`}>
            <span>Tasks</span>
          </NavLink>

          <NavLink className={styles.link} to={`/labels`}>
            <span>Labels</span>
          </NavLink>
        </nav>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
}
export default AppLayout;
