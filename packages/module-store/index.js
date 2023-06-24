import { useDebugValue } from "react";
import useSyncExternalStoreExports from "use-sync-external-store/shim/with-selector";
import { produce } from "immer";

const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;

function createStoreApi(initialValues) {
  let state = initialValues;
  const listeners = new Set();

  function setState(partial) {
    const nextState = partial(state);
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = nextState;
      listeners.forEach((listener) => listener(state, previousState));
    }
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.add(listener);
    // Unsubscribe
    return () => listeners.delete(listener);
  }

  function destroy() {
    listeners.clear();
  }

  return {
    setState,
    getState,
    subscribe,
    destroy,
  };
}

function useBoundStore(api, selector = api.getState, equalityFn) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}

export function createModuleState(initialValues, middlewares) {
  const api = createStoreApi(initialValues);

  const useModuleState = (selector = (state) => state, equalityFn) =>
    useBoundStore(api, selector, equalityFn);

  const setModuleState = (modifier) => {
    api.setState((state) => produce(state, modifier));
  };

  return { useModuleState, setModuleState };
}
