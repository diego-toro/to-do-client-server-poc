import { useContext } from "react";
import styles from "./PopIn.module.css";
import { PopInContext } from "./PopInContext";

export function PopInTrigger({ children, className, ...props }) {
  const { focusPopIn } = useContext(PopInContext);

  return (
    <div
      role="button"
      {...props}
      onClick={focusPopIn}
      className={`${styles.control} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
