import BackgroundImage from "../../themes/BackgroundImage";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Sidebar from "../navigation/Sidebar";
import { useState } from "react";
import Window from "./Window";
import defaultApps from "../../constant/defaultApps";

const Desktop = () => {
  const { bgImage } = useSelector((state: RootState) => state.systemSetting)
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [openedApps, setOpennedApps] = useState<string[]>([]);
  const [focusedApp, setFocusedApps] = useState<Record<string, boolean>>({});
  const [overlappedWindows, setOverlappedWindows] = useState<Record<string, boolean>>({});
  const [minimizedWindows, setMinimizedWindows] = useState<Record<string, boolean>>({});

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


  return (
    <div className={" h-full w-full flex flex-col items-end justify-start content-start flex-wrap-reverse pt-8 bg-transparent relative overflow-hidden overscroll-none window-parent"}>
      <div style={{ backgroundImage: `url(${BackgroundImage[bgImage]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPositionX: "center" }} className="bguntu-img absolute -z-10 top-0 right-0 overflow-hidden h-full w-full" />

      <Sidebar
        show={showSidebar}
        openedApps={openedApps}
        minimizedApps={minimizedWindows}
        focusedApp={focusedApp}
        openApp={openApp}
        showAllApps={() => { }}
      />

      {/* {defaultApps.map((app) => (
        <div
          className="p-1 m-px z-10 bg-white bg-opacity-0 hover:bg-opacity-20 focus:bg-orange focus:bg-opacity-50 focus:border-yellow-700 focus:border-opacity-100 border border-transparent outline-none rounded select-none w-24 h-20 flex flex-col justify-start items-center text-center text-xs font-normal text-white"
          id={app.id}
          onDoubleClick={() => openApp(app.id)}
        >
          <img width="40px" height="40px" className="mb-1 w-10" src={app.icon} alt={"Ubuntu " + app.title} />
          {app.title}
        </div>
      ))} */}


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
  )
}

export default Desktop