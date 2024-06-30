import { TrashItem } from "../store/features/trashDataSlice";

const defaultTrash: TrashItem[] = [
  { id: "1", name: "node_modules", icon: "./icons/system/folder-icon.png" },
  { id: "2", name: "abandoned project", icon: "./icons/system/folder-icon.png" },
  { id: "3", name: "project final", icon: "./icons/system/folder-icon.png" },
  { id: "4", name: "project ultra-final", icon: "./icons/system/folder-icon.png" },
];

export default defaultTrash;
