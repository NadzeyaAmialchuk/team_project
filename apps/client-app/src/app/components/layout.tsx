import { ReactNode } from "react";
import Dashboard from "./dashboard";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Dashboard />
      <main>{children}</main>
    </div>
  );
}
