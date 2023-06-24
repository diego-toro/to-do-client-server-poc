import { useEffect, useRef } from "react";
import { debounce } from "lodash-es";

const events = ["mousedown", "touchstart"];

export const useClickAway = (onClickAway) => {
  const ref = useRef(null);
  const savedCallback = useRef(onClickAway);

  useEffect(() => {
    savedCallback.current = debounce(onClickAway, 50, {
      leading: true,
      trailing: false,
    });
  }, [onClickAway]);

  useEffect(() => {
    const handler = (event) => {
      const { current: el } = ref;

      el && !el.contains(event.target) && savedCallback.current(event);
    };

    const rootElement = document.getElementById("root") ?? document;

    for (const eventName of events) {
      rootElement.addEventListener(eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        rootElement.addEventListener(eventName, handler);
      }
    };
  }, [ref]);

  return ref;
};
