import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Parent from "./components/Parent";
import About from "./components/About";
import FolderFiles from "./components/FolderFiles";
import { AppProvider } from "./context/AppContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/parent", element: <Parent /> },
      { path: "/parent/:folderName", element: <FolderFiles /> },
      { path: "/about", element: <About /> },
    ],
  },
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
