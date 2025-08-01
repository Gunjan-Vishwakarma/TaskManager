import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="bg-blue-30 grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
