// Maincomp.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/SidebarMain.jsx";

const Maincomp = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />

   
      <div className="ml-64 flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Maincomp;
