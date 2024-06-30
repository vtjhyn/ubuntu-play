import { useState } from "react";
// import { useDispatch } from "react-redux";
import SidebarItem from "./SidebarItem";
import defaultApps from "../../constant/defaultApps";

interface SidebarProps {
    show: boolean;
    openedApps: string[];
    minimizedApps: Record<string, boolean>;
    openApp: (id: string) => void;
    focusedApp: Record<string, boolean>;
    showAllApps: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ show, openedApps, minimizedApps, openApp, focusedApp, showAllApps }) => {
    // const dispatch = useDispatch();
    const [showTitle, setShowTitle] = useState<boolean>(false);

    return (
        <div
            className={`${show ? ' -translate-x-full ' : ''}
            absolute transform duration-300 select-none z-40 left-0 top-0 h-full pt-7 w-auto flex flex-col justify-start items-center border-black border-opacity-60 bg-black bg-opacity-50`}
        >

            {defaultApps.map((app) => {
                if(!app.shortcut) return
                return (
                    <SidebarItem
                        key={app.id}
                        app={app}
                        isOpen={openedApps.includes(app.id) || minimizedApps[app.id] === true}
                        isFocus={focusedApp[app.id]}
                        openApp={openApp}
                    />
                )
            })}
            <div
                className={`w-10 h-10 rounded m-1 hover:bg-white hover:bg-opacity-10 flex items-center justify-center`}
                style={{ marginTop: 'auto' }}
                onMouseEnter={() => {
                    setShowTitle(true);
                }}
                onMouseLeave={() => {
                    setShowTitle(false);
                }}
                onClick={showAllApps}
            >
                <div className='relative'>
                    <img
                        width='28px'
                        height='28px'
                        className='w-7'
                        src='./icons/system/view-app-grid.svg'
                        alt='Ubuntu view app'
                    />
                    <div
                        className={
                            (showTitle ? ' visible ' : ' invisible ') +
                            ' w-max py-0.5 px-1.5 absolute top-1 left-full ml-5 text-t-grey text-opacity-90 text-sm bg-grey bg-opacity-70 border-gray-400 border border-opacity-40 rounded-md'
                        }
                    >
                        Show Applications
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar