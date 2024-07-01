import BackgroundImage from "../../themes/BackgroundImage";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Sidebar from "../navigation/Sidebar";
import { MouseEvent, useEffect, useState } from "react";
import Window from "./Window";
import defaultApps from "../../constant/defaultApps";
import DesktopApp from "../view/DesktopApp";
import AllApp from "../view/AllApp";
import DesktopMenu from "../menu/DesktopMenu";
import ApplicationMenu from "../menu/ApplicationMenu";

const Desktop = () => {
  const { bgImage } = useSelector((state: RootState) => state.systemSetting)
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [openedApps, setOpennedApps] = useState<string[]>([]);
  const [focusedApp, setFocusedApps] = useState<Record<string, boolean>>({});
  const [overlappedWindows, setOverlappedWindows] = useState<Record<string, boolean>>({});
  const [minimizedWindows, setMinimizedWindows] = useState<Record<string, boolean>>({});
  const [showAllApps, setShowAllApps] = useState<boolean>(false);
  const [contextMenu, setContextMenu] = useState<Record<string, boolean>>({ desktop: false, application: false });
  const [showNameBar, setShowNameBar] = useState<boolean>(false);

  const handleShowSidebar = (id: string | null, hide: boolean) => {
    if (hide === showSidebar) return;

    if (id === null) {
      if (hide === false) {
        setShowSidebar(false);
      } else {
        for (const key in overlappedWindows) {
          if (overlappedWindows[key]) {
            setShowSidebar(true);
            return;
          }
        }
      }
      return;
    }

    if (hide === false) {
      for (const key in overlappedWindows) {
        if (overlappedWindows[key] && key !== id) return;
      }
    }

    let newOverlappedWindows = { ...overlappedWindows };
    newOverlappedWindows[id] = hide;
    setShowSidebar(hide);
    setOverlappedWindows(newOverlappedWindows);
  }

  const openApp = (id: string) => {
    setMinimizedWindows(prevMinimizedWindows => {
      let newMinimizedWindows = { ...prevMinimizedWindows, [id]: false };
      return newMinimizedWindows;
    });

    setFocusedApps(prevFocusedApps => {
      let newFocusedWindows = { ...prevFocusedApps, [id]: true };
      return newFocusedWindows;
    });

    if (!openedApps.includes(id)) {
      setOpennedApps(prevOpenedApps => [...prevOpenedApps, id]);
    }
  }

  const closeApp = (id: string) => {
    setFocusedApps({ ...focusedApp, [id]: false });
    setOpennedApps(openedApps.filter((appId) => appId !== id));
  }

  const onFocusedApp = (id: string) => {
    setFocusedApps(prevFocusedApps => {
      let newFocusedApps = Object.keys(prevFocusedApps).reduce((acc, appId) => {
        acc[appId] = appId === id;
        return acc;
      }, {} as { [key: string]: boolean });
      return newFocusedApps;
    });
  };

  const onMinimizedApp = (id: string) => {
    setMinimizedWindows({ ...minimizedWindows, [id]: true });
    setFocusedApps({ ...focusedApp, [id]: false });
  }

  const addNewFolder = () => {
    setShowNameBar(true)
  }

  const addApplication = (appName: string) => {
    appName = appName.trim();
    let folder_id = appName.replace(/\s+/g, "-").toLowerCase();
    defaultApps.push({
      id: `new-folder-${folder_id}`,
      title: appName,
      icon: "./icons/system/folder-icon.png",
      favourite: false,
      shortcut: false,
      screen: () => <></>,
    });
    let newFolder = JSON.parse(localStorage.getItem("newFolder") || "[]");
    newFolder.push({ id: `new-folder-${folder_id}`, name: appName });
    localStorage.setItem("newFolder", JSON.stringify(newFolder));

    setShowNameBar(false);
    updateApplication()
  }

  const updateApplication = () => {
    let focused_windows = {}
    let minimized_windows = {}

    defaultApps.forEach((app) => {
      focused_windows = {
        ...focused_windows,
        [app.id]:
          focusedApp[app.id] !== undefined ||
            focusedApp[app.id] !== null
            ? focusedApp[app.id]
            : false,
      };
      minimized_windows = {
        ...minimized_windows,
        [app.id]:
          minimizedWindows[app.id] !== undefined ||
            minimizedWindows[app.id] !== null
            ? minimizedWindows[app.id]
            : false,
      };
    });
    setFocusedApps(focused_windows);
  }

  const checkContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    hideAllContextMenu();

    const target = e.target as HTMLDivElement;
    const contextType = target.dataset.context || "application";

    if (contextType === "desktop-area") {
      showContextMenu(e, "desktop");
    } else if (contextType === "application") {
      showContextMenu(e, "application");
    }
  };

  const showContextMenu = (e: MouseEvent, menuName: string) => {
    e.preventDefault();

    const { posx, posy } = getMenuPosition(e);
    const contextMenuElement = document.getElementById(`${menuName}-menu`);

    if (!contextMenuElement) return;

    const menuWidth = contextMenuElement.offsetWidth;
    const menuHeight = contextMenuElement.offsetHeight;

    let adjustedPosX = posx;
    let adjustedPosY = posy;

    if (posx + menuWidth > window.innerWidth) {
      adjustedPosX -= menuWidth;
    }
    if (posy + menuHeight > window.innerHeight) {
      adjustedPosY -= menuHeight;
    }

    contextMenuElement.style.left = `${adjustedPosX}px`;
    contextMenuElement.style.top = `${adjustedPosY}px`;

    setContextMenu((prevContextMenu) => ({
      ...prevContextMenu,
      [menuName]: true,
    }));
  };

  const hideAllContextMenu = () => {
    let menus = contextMenu;
    Object.keys(menus).forEach((key) => {
      menus[key] = false;
    });
    setContextMenu(menus);
  };

  const getMenuPosition = (e: MouseEvent) => {
    let posx = e.pageX || 0;
    let posy = e.pageY || 0;

    if (typeof posx === "undefined" || typeof posy === "undefined") {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }

    return { posx, posy };
  };

  const setContextListeners = () => {
    document.addEventListener("contextmenu", checkContextMenu as any);
    document.addEventListener("click", hideAllContextMenu);
  };

  const removeContextListeners = () => {
    document.removeEventListener("contextmenu", checkContextMenu as any);
    document.removeEventListener("click", hideAllContextMenu);
  };

  const setEventListeners = () => {
    const openSettingsButton = document.getElementById("open-settings");
    if (openSettingsButton) {
      openSettingsButton.addEventListener("click", (e) => { e.preventDefault(); openApp("settings") });
    }
  };

  useEffect(() => {
    setContextListeners();
    setEventListeners();
    checkForNewFolders();

    return () => {
      removeContextListeners();
    }
  }, [])

  const checkForNewFolders = () => {
    let newFolder = localStorage.getItem("newFolder");

    if (!newFolder) {
      localStorage.setItem("newFolder", JSON.stringify([]));
      newFolder = "[]";
    }

    const parsedFolder = JSON.parse(newFolder) as { id: string; name: string }[];

    parsedFolder.forEach((folder) => {
      const existingFolder = defaultApps.find(app => app.id === `new-folder-${folder.id}`);
      if (!existingFolder) {
        defaultApps.push({
          id: `new-folder-${folder.id}`,
          title: folder.name,
          icon: "./icons/system/folder-icon.png",
          favourite: false,
          shortcut: false,
          screen: () => <></>,
        });
      }
    });

    updateApplication();
  };



  const renderNameBar = () => {
    const addFolder = () => {
      const folderNameInput = document.getElementById("folder-name-input") as HTMLInputElement | null;
      if (folderNameInput) {
        const folder_name = folderNameInput.value;
        addApplication(folder_name);
      } else {
        console.error("Folder name input element not found");
      }
    };

    let removeCard = () => {
      setShowNameBar(false)
    };

    return (
      <div className="absolute rounded-md top-1/2 left-1/2 text-center text-white font-light text-sm bg-ub-cool-grey transform -translate-y-1/2 -translate-x-1/2 sm:w-96 w-3/4 z-50">
        <div className="w-full flex flex-col justify-around items-start pl-6 pb-8 pt-6">
          <span>New folder name</span>
          <input
            className="outline-none mt-5 px-1 w-10/12  context-menu-bg border-2 border-yellow-700 rounded py-0.5"
            id="folder-name-input"
            type="text"
            autoComplete="off"
            spellCheck="false"
            autoFocus={true}
          />
        </div>
        <div className="flex">
          <div
            onClick={addFolder}
            className="w-1/2 px-4 py-2 border border-gray-900 border-opacity-50 border-r-0 hover:bg-ub-warm-grey hover:bg-opacity-10 hover:border-opacity-50"
          >
            Create
          </div>
          <div
            onClick={removeCard}
            className="w-1/2 px-4 py-2 border border-gray-900 border-opacity-50 hover:bg-ub-warm-grey hover:bg-opacity-10 hover:border-opacity-50"
          >
            Cancel
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={" h-full w-full flex flex-col items-end justify-start content-start flex-wrap-reverse pt-8 bg-transparent relative overflow-hidden overscroll-none window-parent"}>
      <div style={{ backgroundImage: `url(${BackgroundImage[bgImage]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPositionX: "center" }} className="bguntu-img absolute -z-10 top-0 right-0 overflow-hidden h-full w-full" />

      <Sidebar
        show={showSidebar}
        openedApps={openedApps}
        minimizedApps={minimizedWindows}
        focusedApp={focusedApp}
        openApp={openApp}
        showAllApps={() => setShowAllApps(!showAllApps)}
      />

      {defaultApps.map((app, index) => (
        <DesktopApp key={index} id={app.id} icon={app.icon} name={app.title} openApp={() => openApp(app.id)} />
      ))}

      <div
        className="absolute h-full w-full bg-transparent"
        data-context="desktop-area"
      >

        {defaultApps.map((app, index) => {
          if (openedApps.includes(app.id)) {
            return (
              <Window
                key={index}
                id={app.id}
                screen={app.screen}
                title={app.title}
                closed={closeApp}
                focus={onFocusedApp}
                isFocused={focusedApp[app.id]}
                hideSideBar={handleShowSidebar}
                minimized={onMinimizedApp}
                isMinimized={minimizedWindows[app.id]}
                hideAllSideBar={() => setShowSidebar(!showSidebar)}
              />
            )
          }
        })}
      </div>

      <DesktopMenu
        active={contextMenu.desktop}
        openApp={openApp}
        addNewFolder={addNewFolder}
      />

      <ApplicationMenu active={contextMenu.application} />

      {showNameBar ? renderNameBar() : null}

      {showAllApps && (
        <AllApp apps={defaultApps} openApp={openApp} />
      )}
    </div>
  )
}

export default Desktop