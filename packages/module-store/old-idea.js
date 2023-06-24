// createV2S.js
const defaultReducer = (state) => state;

const createV2S = (INITIAL_STATE, {identifir, reducer = defaultReducer,persisted: ['']} ) => {

  const Context = createContext(INITIAL_STATE);
  const { store, dispatch } = useReducer(reducer, INITIAL_STATE);
  const useV2SSelector = (selector) => selector(store);
  const useV2SContext = () => useContext(Context);
  const useV2SUpdate = (actionCreator) => dispatch(actionCreator);

  const FakeProvider = () => <Context.Provider value={{ store, dispatch }} />;

  return {
    useV2SSelector,
    useV2SContext,
    useV2SUpdate,
    FakeProvider,
  };
};

// state.js

 const {reducer, actions} = createReducer()
export {actions}
export const {
    FakeProvider: ComponentProvider,
    useV2SSelector: useComponentStateSelector,
    useV2SContext: useComponentStateContext,
    useV2SUpdate: useComponentStateUpdate,
} = createV2S({search: '', status: null}, reducer)

// Component.jsx
const Component = () =>{
    return <ComponentProvider>
        <div>
            <Toggle></Toggle>
            <Dialog></Dialog>
            <ContentComponent/>
        </div>
    </ComponentProvider>
}


// ContentComponent

const ContentComponent = () => {
    const search = useComponentStateSelector(leSelector)
    const update = useComponentStateUpdate()

    return <input value={search} onChange={value => update(updateValue(value))}/>
}