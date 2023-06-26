import { useContext } from "react";
import Card from "../Card";
import { useKeySubscription } from "../../utils";
import styles from "./PopIn.module.css";
import { PopInContext } from "./PopInContext";

const popContentWrapper = (Component) =>
  function PropContentWrapper(props) {
    const { reconcileFocus } = useContext(PopInContext);

    return reconcileFocus ? <Component {...props} /> : null;
  };

export const PopContent = popContentWrapper(function PopContent({
  children,
  wrapperClassName,
  backgroundClassName,
  className,
  ...props
}) {
  const { blurPopIn } = useContext(PopInContext);

  useKeySubscription(() => {
    blurPopIn();
  });

  return (
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
  );
});
