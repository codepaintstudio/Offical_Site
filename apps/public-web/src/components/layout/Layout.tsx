import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return <div className="relative min-h-screen bg-[#F4F4EE] text-[#0A0A0A]">{children}</div>;
}
