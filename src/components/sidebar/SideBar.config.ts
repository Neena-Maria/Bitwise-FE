export type SideNavItem = {
  id: string;
  name: string;
  path: string;
};
export const sideNavItems: SideNavItem[] = [
  {
    id: "editor",
    name: "Text Editor",
    path: "/editor",
  },
  {
    id: "docs",
    name: "Docs",
    path: "/docs",
  },
  {
    id: "board",
    name: "Task Board",
    path: "/board",
  },
];
