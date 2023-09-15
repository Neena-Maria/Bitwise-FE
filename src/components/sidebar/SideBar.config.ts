export type SideNavItem = {
  id: string;
  name: string;
  path: string;
};
export const sideNavItems: SideNavItem[] = [
  {
    id: "myDocs",
    name: "Text Editor",
    path: "/documents",
  },
  {
    id: "docs",
    name: "Docs",
    path: "/google-docs",
  },
  {
    id: "board",
    name: "Task Board",
    path: "/board",
  },
];
