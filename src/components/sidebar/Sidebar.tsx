import { MutableRefObject, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import logo from "../../icons/logo.png";
import { SideNavItem, sideNavItems } from "./SideBar.config";
import NavSection from "./NavSection";

const SideNavBar = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<SideNavItem>(
    sideNavItems[0]
  );

  const sidebarRef = useRef() as MutableRefObject<HTMLDivElement>;

  const handleNavigate = (path: any) => {
    navigate(path);
  };

  return (
    <>
      <div
        ref={sidebarRef}
        aria-label="Sidebar"
        id="side-nav-bar"
        className="absolute z-[100] flex h-screen justify-center overflow-y-scroll bg-white py-5 border-r border-zinc-400 overflow-x-hidden "
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
                    handleNavigate(item.path);
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
