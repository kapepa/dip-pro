import { FC, ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode,
}

const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div>
      {children}
    </div>
  )
}

export default DashboardLayout;