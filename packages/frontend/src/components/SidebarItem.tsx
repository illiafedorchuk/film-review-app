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
      className={`p-2.5 mt-2 flex items-center font-semibold rounded-md px-4 justify-center cursor-pointer ${
        active ? "" : "hover:bg-violet-400  hover:text-white"
      }`}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 text-center" />
      {expanded || !label ? (
        <span className="sr-only">{label}</span>
      ) : (
        <span className="text-[15px] ml-4 flex-1">{label}</span>
      )}
    </div>
  );
};

export default SidebarItem;
