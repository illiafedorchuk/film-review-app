import React from "react";
import { IconType } from "react-icons";

type SidebarItemProps = {
  icon: IconType;
  label: string;
  onClick?: () => void;
  active?: boolean;
  expanded: boolean;
  value?: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  onClick,
  active,
  expanded,
}) => {
  return (
    <div
      className={`p-2.5 mt-2 flex items-center font-semibold rounded-md px-4 justify-center cursor-pointer hover:duration-300 ${
        active ? "" : "hover:bg-violet-200  hover:text-violet-500"
      }`}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 text-center" />
      {expanded && <span>{label}</span>}
    </div>
  );
};

export default SidebarItem;
