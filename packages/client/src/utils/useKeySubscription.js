import { useEffect, useRef } from "react";
import { debounce } from "lodash-es";

const defaultKeys = ["Escape"];

export function useKeySubscription(callback, keys = defaultKeys) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = debounce(callback, 50);
  }, [callback]);

  const savedKeys = useRef(keys);

  useEffect(() => {
    savedKeys.current = keys;
  }, [keys]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (savedKeys.current.includes(event.key)) {
        event.preventDefault();
        savedCallback.current();
      }
    };

    const rootElement = document.getElementById("root") ?? document;

    rootElement.addEventListener("keydown", keyDownHandler);

    return () => {
      rootElement.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
}
