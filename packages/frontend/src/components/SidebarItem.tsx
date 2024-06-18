import React from "react";
import { IconType } from "react-icons";

type SidebarItemProps = {
  icon: IconType;
  label: string;
  onClick?: () => void;
  active?: boolean;
  expanded: boolean;
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
      className={`p-3 mt-2 text-[var(--text-color)] flex items-center rounded-full cursor-pointer duration-500 ${
        active ? "bg-purple-200" : "hover:bg-violet-500 hover:text-white"
      }`}
      onClick={onClick}
    >
      <Icon className="h-6 w-6 text-center" />
      <span className={`ml-4 ${expanded ? "inline-block" : "hidden"}`}>
        {label}
      </span>
    </div>
  );
};

export default SidebarItem;
