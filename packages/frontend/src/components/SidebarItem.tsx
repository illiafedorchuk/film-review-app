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
      className={`p-2  mt-2 flex items-center font-semibold rounded-md px-4 cursor-pointer duration-500  ${
        active ? "" : "hover:bg-violet-100 "
      }`}
      onClick={onClick}
    >
      <Icon className="h-6 w-5 text-center" />
      <span className={`ml-4 w-5 ${expanded ? "inline" : "hidden"} `}>
        {label}
      </span>
    </div>
  );
};

export default SidebarItem;
