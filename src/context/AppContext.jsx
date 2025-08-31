import { createContext, useReducer, useContext } from "react";

const initialState = {
  folders: [],
  selectedFolder: null,
  checkedFiles: [],
  currentIndex: 0,
  isModalOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FOLDERS":
      return { ...state, folders: action.payload };
    case "SET_SELECTED_FOLDER":
      return { ...state, selectedFolder: action.payload };
    case "TOGGLE_FILE":
      return {
        ...state,
        checkedFiles: state.checkedFiles.includes(action.payload)
          ? state.checkedFiles.filter((id) => id !== action.payload)
          : [...state.checkedFiles, action.payload],
      };
    case "SET_FILES":
      return { ...state, checkedFiles: action.payload };
    case "SET_INDEX":
      return { ...state, currentIndex: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, isModalOpen: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
