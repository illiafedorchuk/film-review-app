/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  BiFilterAlt as BiFilterLeft,
  BiX,
  BiHome,
  BiBookmark as BiBookmarkFill,
  BiEnvelope,
  BiChat as BiChatLeftTextFill,
  BiArrowFromLeft,
  BiChevronRight,
  BiChevronLeft,
} from "react-icons/bi";
import SidebarItem from "./SidebarItem"; // Import the SidebarItem component
import { IconBaseProps } from "react-icons";

const Sidebar = ({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`absolute top-0 bottom-0 lg:left-0 ${
    expanded ? " w-[70px]" : "-left-[300px] w-[200px]"
} duration-100 p-2 overflow-y-auto text-center bg-white shadow h-screen z-10`}
    >
      <div className="text-gray-100 text-xl">
        <div className="flex justify-between items-center p-2">
          {expanded ? (
            <BiChevronRight
              className="text-gray-800 text-4xl cursor-pointer"
              onClick={toggleSidebar}
            />
          ) : (
            <BiChevronLeft
              className="text-gray-800 text-4xl cursor-pointer"
              onClick={toggleSidebar}
            />
          )}
        </div>
      </div>
      <hr className="my-2 text-gray-300" />
      <SidebarItem icon={BiHome} label="Home" expanded={expanded} />
      <SidebarItem icon={BiBookmarkFill} label="Bookmark" expanded={expanded} />
      <SidebarItem icon={BiEnvelope} label="Messages" expanded={expanded} />
      <SidebarItem
        icon={BiChatLeftTextFill}
        label="Chatbox"
        onClick={toggleSubMenu}
        hasSubMenu={true}
        isSubMenuOpen={isSubMenuOpen}
        expanded={expanded}
      />
      {isSubMenuOpen && (
        <>
          {/* Define icons for these items or remove icon prop if not needed */}
          <SidebarItem
            label="Social"
            expanded={expanded}
            icon={function (props: IconBaseProps): JSX.Element {
              throw new Error("Function not implemented.");
            }}
          />
          <SidebarItem
            label="Personal"
            expanded={expanded}
            icon={function (props: IconBaseProps): JSX.Element {
              throw new Error("Function not implemented.");
            }}
          />
          <SidebarItem
            label="Friends"
            expanded={expanded}
            icon={function (props: IconBaseProps): JSX.Element {
              throw new Error("Function not implemented.");
            }}
          />
        </>
      )}
      <SidebarItem icon={BiArrowFromLeft} label="Logout" expanded={expanded} />
    </div>
  );
};

export default Sidebar;
