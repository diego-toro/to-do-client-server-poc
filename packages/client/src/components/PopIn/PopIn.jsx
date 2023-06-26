import { createContext, useContext, useState } from "react";
import Card from "../Card";
import { useKeySubscription } from "../../utils";
import styles from "./PopIn.module.css";

const PopInContext = createContext({});

export function PopContent({
  children,
  wrapperClassName,
  backgroundClassName,
  className,
  ...props
}) {
  const { reconcileFocus, blurPopIn } = useContext(PopInContext);

  useKeySubscription(() => blurPopIn());

  return reconcileFocus ? (
    <>
      <div
        className={`${styles.popBackground} ${backgroundClassName}`}
        onClick={() => blurPopIn()}
      />
      <div className={`${styles.popContent} ${wrapperClassName ?? ""}`}>
        <Card className={className} {...props}>
          {children}
        </Card>
      </div>
    </>
  ) : null;
}

export function PopInTrigger({ children, className, ...props }) {
  const { focusPopIn } = useContext(PopInContext);

  return (
    <button
      {...props}
      onClick={focusPopIn}
      className={`${styles.control} ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

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
