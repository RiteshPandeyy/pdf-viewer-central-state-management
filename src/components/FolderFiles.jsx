import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import { useAppContext } from "../context/AppContext";

export default function FolderFiles() {
  const { folderName } = useParams();
  const { state, dispatch } = useAppContext();
  const { selectedFolder, checkedFiles, currentIndex, isModalOpen } = state;

  useEffect(() => {
    fetch("/pdfs.json")
      .then((res) => res.json())
      .then((data) => {
        const folder = data.find((f) => f.folder === folderName);
        dispatch({ type: "SET_SELECTED_FOLDER", payload: folder });
        dispatch({ type: "SET_FILES", payload: [] });
      })
      .catch((err) => console.error("Fetching the error", err));
  }, [folderName, dispatch]);

  function handleClick() {
    if (checkedFiles.length > 0) {
      dispatch({ type: "SET_INDEX", payload: 0 });
      dispatch({ type: "TOGGLE_MODAL", payload: true });
    }
  }

  function handleDownload() {
    if (checkedFiles.length === 0) return;
    const selectedFiles = selectedFolder.files.filter((f) =>
      checkedFiles.includes(f.id)
    );
    selectedFiles.forEach((file) => {
      const link = document.createElement("a");
      link.href = file.path;
      link.download = file.name + ".pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  if (!selectedFolder) return <p className="text-gray-500">Loading ...</p>;

  const selectedFiles = selectedFolder.files.filter((f) =>
    checkedFiles.includes(f.id)
  );
  const currentFile = selectedFiles[currentIndex];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        {selectedFolder.folder}
      </h1>

      <button
        onClick={() =>
          dispatch({
            type: "SET_FILES",
            payload:
              checkedFiles.length === selectedFolder.files.length
                ? []
                : selectedFolder.files.map((f) => f.id),
          })
        }
        className="px-4 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 active:scale-95"
      >
        {checkedFiles.length === selectedFolder.files.length
          ? "Deselect All"
          : "Select All"}
      </button>

      <ul className="space-y-3">
        {selectedFolder.files.map((file) => (
          <li
            key={file.id}
            className="flex items-center justify-between bg-white/70 backdrop-blur-sm border border-white/40 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer"
            onClick={() => dispatch({ type: "TOGGLE_FILE", payload: file.id })}
          >
            <span className="text-gray-700 font-medium">{file.name}</span>
            <input
              type="checkbox"
              checked={checkedFiles.includes(file.id)}
              onChange={() =>
                dispatch({ type: "TOGGLE_FILE", payload: file.id })
              }
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 pointer-events-none"
            />
          </li>
        ))}
      </ul>

      <div className="flex space-x-4">
        <button
          disabled={checkedFiles.length === 0}
          onClick={handleClick}
          className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 active:scale-95 disabled:opacity-50"
        >
          Preview
        </button>
        <button
          disabled={checkedFiles.length === 0}
          onClick={handleDownload}
          className="px-6 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 active:scale-95 disabled:opacity-50"
        >
          Download
        </button>
      </div>

      {isModalOpen && currentFile && (
        <Modal onClose={() => dispatch({ type: "TOGGLE_MODAL", payload: false })}>
          <h2 className="text-xl font-semibold mb-3">{currentFile.name}</h2>
          <div className="border rounded-xl h-[70vh] overflow-hidden shadow-inner">
            <iframe
              src={currentFile.path}
              title={currentFile.name}
              width="100%"
              height="100%"
              className="rounded-lg"
            ></iframe>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() =>
                dispatch({ type: "SET_INDEX", payload: Math.max(currentIndex - 1, 0) })
              }
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 active:scale-95 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-gray-600">
              {currentIndex + 1} / {selectedFiles.length}
            </span>
            <button
              onClick={() =>
                dispatch({
                  type: "SET_INDEX",
                  payload: Math.min(currentIndex + 1, selectedFiles.length - 1),
                })
              }
              disabled={currentIndex === selectedFiles.length - 1}
              className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 active:scale-95 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
