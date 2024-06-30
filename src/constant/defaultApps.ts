import { Chrome, Setting, Trash, Gedit } from "../components/application";

export interface ApplicationTypes {
  id: string;
  title: string;
  icon: string;
  favourite: boolean;
  shortcut: boolean;
  screen: () => JSX.Element;
}

const defaultApps: ApplicationTypes[] = [
  {
    id: "chrome",
    title: "Google Chrome",
    icon: "./icons/apps/chrome.png",
    favourite: true,
    shortcut: true,
    screen: Chrome,
  },
  {
    id: "settings",
    title: "Settings",
    icon: "./icons/apps/gnome-control-center.png",
    favourite: true,
    shortcut: true,
    screen: Setting,
  },
  {
    id: "trash",
    title: "Trash",
    icon: "./icons/system/trash-shortcut.png",
    favourite: true,
    shortcut: true,
    screen: Trash,
  },
  {
    id: "gedit",
    title: "Contact Me",
    icon: "./icons/apps/gedit.png",
    favourite: true,
    shortcut: true,
    screen: Gedit,
  },
];

export default defaultApps;
