import { MutableRefObject, useRef, useState } from "react";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../../icons/logo.png";
import { SideNavItem, sideNavItems } from "./SideBar.config";
import NavSection from "./NavSection";

const SideNavBar = () => {
  const navigate = useNavigate();

  const { pathname: currentPath } = useLocation();
  const { id } = useParams();
  const checkIfPathMatchesCurrentPath = () => {
    if (currentPath.includes("/documents")) return sideNavItems[0];
    else if (currentPath.includes("/google-docs")) return sideNavItems[1];
    else if (currentPath.includes("/board")) return sideNavItems[2];
    else return sideNavItems[0];
  };

  const [selectedMenu, setSelectedMenu] = useState<SideNavItem>(
    checkIfPathMatchesCurrentPath
  );

  const sidebarRef = useRef() as MutableRefObject<HTMLDivElement>;

  const handleNavigate = (path: any) => {
    navigate(path);
  };

  const getPath = (item: SideNavItem) => {
    if (item.id === "myDocs") return "/documents";
    else if (item.id === "docs") return "/google-docs";
    else if (item.id === "board") return "/board";
    else return "";
  };

  return (
    <>
      <div
        ref={sidebarRef}
        aria-label="Sidebar"
        id="side-nav-bar"
        className="z-[100] flex h-screen justify-center overflow-y-scroll bg-white py-5 border-r border-zinc-400 overflow-x-hidden "
      >
        <div className="w-72">
          <div className="px-2.5">
            <Link to={"/login"} className="flex items-center ml-8">
              <img src={logo} alt="logo" className="h-12 w-12" />
              <p className="text-lg font-extrabold ml-8">BITWISE</p>
            </Link>
          </div>
          <hr className="border border-black my-2 0" />
          <div className="space-y-4 px-2.5 mt-10">
            {sideNavItems.map((navItem) => {
              return (
                <NavSection
                  key={navItem.id}
                  item={navItem}
                  selectedItem={selectedMenu}
                  onSelect={(item) => {
                    setSelectedMenu(item);
                    const path = getPath(item);
                    handleNavigate(`/workspace/${id}${path}`);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavBar;
