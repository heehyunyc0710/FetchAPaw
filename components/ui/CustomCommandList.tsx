import { ReactNode } from "react";
import { CommandList } from "./command";

interface CommandListProps {
    children: ReactNode;
    className?: string;
  }
  
  function CustomCommandList({ children, className }: CommandListProps) {
    return <CommandList className={className}>{children}</CommandList>;
  }

  export default CustomCommandList;