import { useEffect } from "react";
import FolderList from "./FolderList";
import { useAppContext } from "../context/AppContext";

export default function Parent() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    fetch("/pdfs.json")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET_FOLDERS", payload: data }))
      .catch((err) => console.error("Error Loading Please wait..", err));
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Available Folders</h2>
      <div className="bg-white/70 backdrop-blur-md border border-gray-300 rounded-2xl shadow-sm p-6">
        <FolderList showParents={state.folders} />
      </div>
    </div>
  );
}
