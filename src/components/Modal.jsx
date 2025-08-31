import ReactDOM from "react-dom";

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white/80 backdrop-blur-md border border-white/40 w-11/12 max-w-4xl rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
