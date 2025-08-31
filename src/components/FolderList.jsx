import { Link } from "react-router-dom";

export default function FolderList({ showParents }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {showParents.map((parents) => (
        <div
          key={parents.folder}
          className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow p-6 hover:shadow-md hover:scale-[1.01] transition"
        >
          <Link
            to={`/parent/${parents.folder}`}
            className="text-lg font-semibold text-blue-700"
          >
             {parents.folder}
          </Link>
        </div>
      ))}
    </div>
  );
}
