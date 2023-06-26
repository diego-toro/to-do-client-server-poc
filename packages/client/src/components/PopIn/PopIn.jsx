import { useState } from "react";
import styles from "./PopIn.module.css";
import { PopInContext } from "./PopInContext";

function PopIn({ children, className, shouldOpen, onTrigger, onClose }) {
  const [focus, setFocus] = useState(false);

  const contollableProps = [shouldOpen, onTrigger, onClose].filter(
    (prop) => prop === undefined
  );

  const isUncontrolled = contollableProps.length === 3;
  const isControlled = contollableProps.length === 0;

  const focusPopIn = (event) => {
    isControlled ? onTrigger(event) : setFocus(true);
  };

  const blurPopIn = () => {
    isControlled ? onClose() : setFocus(false);
  };

  if (!isControlled && !isUncontrolled) {
    console.warn(
      "Controlled PopIn should have shouldOpen, onTrigger, and onClose props"
    );
  }

  const reconcileFocus = isControlled ? shouldOpen : focus;

  return (
    <PopInContext.Provider value={{ reconcileFocus, focusPopIn, blurPopIn }}>
      <div className={`${styles.container} ${className ?? ""}`}>{children}</div>
    </PopInContext.Provider>
  );
}

export default PopIn;
