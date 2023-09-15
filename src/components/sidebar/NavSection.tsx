import { SideNavItem } from "./SideBar.config";
import { ReactComponent as Board } from "../../icons/board.svg";
import { ReactComponent as GoogleDoc } from "../../icons/googleDoc.svg";
import { ReactComponent as Notes } from "../../icons/notes.svg";

interface NavSectionInterface {
  item: SideNavItem;
  selectedItem: SideNavItem;
  onSelect: (item: SideNavItem) => void;
}

const NavSection: React.FC<NavSectionInterface> = ({
  item,
  onSelect,
  selectedItem,
}) => {
  const { name, id } = item;

  const navSectionHeader = `text-body flex cursor-pointer rounded px-8 py-2.5 text-neutral-950  ${
    selectedItem.name === name ? "text-white bg-sky-300 font-bold hover:bg-sky-400":"hover:bg-[#E8EAEB] hover:font-medium"
  }`;

  const getSidebarIcon = () => {
    if (id === "editor") return <Notes />;
    else if (id === "docs") return <GoogleDoc />;
    else if (id === "board") return <Board />;
    else return "";
  };

  return (
    <div className="rounded-md">
      <div
        className={navSectionHeader}
        onClick={() => onSelect(item)}
        role="presentation"
      >
        {getSidebarIcon()}
        <div
          className={`flex w-full ml-4 items-center justify-between ${
            selectedItem.name === name && "text-black"
          }`}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default NavSection;
