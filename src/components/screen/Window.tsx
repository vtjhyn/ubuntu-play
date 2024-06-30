import { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';


interface WindowProps {
    id: string;
    title: string;
    screen: () => JSX.Element;
    minimized: (id: string) => void;
    isMinimized: boolean;
    isFocused: boolean;
    focus: (id: string) => void;
    hideSideBar: (id: string, hide: boolean) => void;
    closed: (id: string) => void;
    hideAllSideBar: () => void;
}

const Window: React.FC<WindowProps> = ({
    id,
    title,
    screen,
    minimized,
    isMinimized,
    isFocused,
    focus,
    hideSideBar,
    closed,
    hideAllSideBar
}) => {
    const [cursorType, setCursorType] = useState<string>("cursor-default");
    const [width, setWidth] = useState<number>(60);
    const [height, setHeight] = useState<number>(85);
    const [closedApp, setClosedApp] = useState<boolean>(false);
    const [maximized, setMaximized] = useState<boolean>(false);
    const [parentSize, setParentSize] = useState<{ height: number; width: number }>({ height: 100, width: 100 });

    const startX: number = 235;
    const startY: number = 25;

    useEffect(() => {
        setDefaultWindowDimension();
        window.addEventListener('resize', resizeBoundaries);

        return () => {
            window.removeEventListener('resize', resizeBoundaries);
        };
    }, []);

    const setDefaultWindowDimension = () => {
        if (window.innerWidth < 640) {
            setHeight(60);
            setWidth(85);
            resizeBoundaries();
        } else {
            setHeight(85);
            setWidth(60);
            resizeBoundaries();
        }
    };

    const resizeBoundaries = () => {
        setParentSize({
            height: window.innerHeight - (window.innerHeight * (height / 100.0)) - 28,
            width: window.innerWidth - (window.innerWidth * (width / 100.0))
        });
    };

    const changeCursorToMove = () => {
        focusWindow();
        if (maximized) {
            restoreWindow();
        }
        setCursorType("cursor-move");
    };

    const changeCursorToDefault = () => {
        setCursorType("cursor-default");
    };

    const handleVerticalResize = () => {
        setHeight(height + 0.1);
        resizeBoundaries();
    }

    const handleHorizontalResize = () => {
        setWidth(width + 0.1);
        resizeBoundaries();
    }

    const handleWindowsPosition = () => {
        const r = document.querySelector("#" + id) as HTMLElement | null;
        if (r) {
            r.style.setProperty("--window-transform-x", `${startX}px`);
            r.style.setProperty("--window-transform-y", `${startY}px`);
        }
    };

    const handleOverlap = () => {
        var r = document.querySelector("#" + id);
        if (r) {
            var rect = r.getBoundingClientRect();
            if (parseFloat(rect.x.toFixed(1)) < 50) {
                hideSideBar(id, true);
            } else {
                hideSideBar(id, false);
            }
        }
    };

    const focusWindow = () => {
        focus(id);
    };

    const minimizeWindow = () => {
        let posx = -310;
        if (maximized) {
            posx = -510;
        }
        handleWindowsPosition();
        const sidebarApp = document.querySelector("#sidebar-" + id) as HTMLElement | null;
        const currentWindow = document.querySelector("#" + id) as HTMLElement | null;
        if (sidebarApp && currentWindow) {
            const sidebBarApp = sidebarApp.getBoundingClientRect();
            const translateY = parseFloat(sidebBarApp.y.toFixed(1)) - 240;
            const translateX = `${posx}px`;
            currentWindow.style.transform = translateY < 0 ? `translate(${translateX}, 0px) scale(0.2)` : `translate(${translateX}, ${translateY}px) scale(0.2)`;
        }
        minimized(id);
        closed(id);
    };


    const restoreWindow = () => {
        const r = document.querySelector("#" + id) as HTMLElement | null;
        if (r) {
            setDefaultWindowDimension();
            const posx = r.style.getPropertyValue("--window-transform-x");
            const posy = r.style.getPropertyValue("--window-transform-y");
            r.style.transform = `translate(${posx},${posy})`;
            setTimeout(() => {
                setMaximized(false);
                handleOverlap();
            }, 300);
        }
    };

    const maximizeWindow = () => {
        hideAllSideBar();
        if (maximized) {
            restoreWindow();
        } else {
            focusWindow();
            const r = document.querySelector("#" + id) as HTMLElement | null;
            if (r) {
                handleWindowsPosition();
                r.style.transform = `translate(-1pt,-2pt)`;
                setMaximized(true);
                setHeight(96.3);
                setWidth(100.2);
                hideSideBar(id, true);
            }
        }
    };

    const closeWindow = () => {
        handleWindowsPosition();
        setClosedApp(true);
        setTimeout(() => {
            hideSideBar(id, false);
            closed(id);
        }, 300);
    };


    return (
        <Draggable
            axis="both"
            handle=".bg-window-title"
            grid={[1, 1]}
            scale={1}
            onStart={changeCursorToMove}
            onStop={changeCursorToDefault}
            onDrag={handleOverlap}
            allowAnyClick={false}
            defaultPosition={{ x: startX, y: startY }}
            bounds={{ left: 0, top: 0, right: parentSize.width, bottom: parentSize.height }}
        >
            <div style={{ width: `${width}%`, height: `${height}%` }}
                className={`${cursorType} ${closedApp ? "closed-window" : ""} ${maximized ? "duration-300 rounded-none" : "rounded-lg rounded-b-none"} ${isMinimized ? "opacity-0 invisible duration-200" : ""} ${isFocused ? "z-30" : "z-20 notFocused"} opened-window overflow-hidden min-w-1/4 min-h-1/4 main-window absolute window-shadow border-black border-opacity-40 border border-t-0 flex flex-col`}
                id={id}
            >
                <WindowYBorder resize={handleVerticalResize} />
                <WindowXBorder resize={handleHorizontalResize} />
                <WindowTopBar title={title} />
                <WindowEditButtons minimize={minimizeWindow} maximize={maximizeWindow} isMaximised={maximized} close={closeWindow} id={id} />
                <WindowMainScreen screen={screen} />
            </div>
        </Draggable>
    );
};

export default Window;


function WindowTopBar({ title }: { title: string }) {
    return (
        <div className='relative bg-window-title border-t-2 border-white border-opacity-5 py-1.5 px-3 text-white w-full select-none'>
            <div className='flex justify-center text-sm font-bold'>{title}</div>
        </div>
    );
}

const WindowYBorder = ({ resize }: { resize: () => void }) => {
    const trpImgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (trpImgRef.current) {
            trpImgRef.current.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            trpImgRef.current.style.opacity = '0';
        }
    }, []);
    return (
        <div className=" window-y-border border-transparent border-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onDragStart={(e) => { e.dataTransfer.setDragImage(trpImgRef.current as HTMLImageElement, 0, 0) }} onDrag={resize} />
    );
}

const WindowXBorder = ({ resize }: { resize: () => void }) => {
    const trpImgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (trpImgRef.current) {
            trpImgRef.current.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            trpImgRef.current.style.opacity = '0';
        }
    }, []);
    return (
        <div className=" window-x-border border-transparent border-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onDragStart={(e) => { e.dataTransfer.setDragImage(trpImgRef.current as HTMLImageElement, 0, 0) }} onDrag={resize}>
        </div>
    );
}

const WindowEditButtons = ({ id, minimize, maximize, isMaximised, close }: { id: string, minimize: () => void, maximize: () => void, isMaximised: boolean, close: () => void }) => {
    return (
        <div className="absolute select-none right-0 top-0 mt-1 mr-1 flex justify-center items-center">
            <span className="mx-1.5 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center" onClick={minimize}>
                <img
                    src="./icons/window/window-minimize.svg"
                    alt="ubuntu window minimize"
                    className="h-5 w-5 inline"
                />
            </span>
            {
                (isMaximised
                    ?
                    <span className="mx-2 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center" onClick={maximize}>
                        <img
                            src="./icons/window/window-restore.svg"
                            alt="ubuntu window restore"
                            className="h-5 w-5 inline"
                        />
                    </span>
                    :
                    <span className="mx-2 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center" onClick={maximize}>
                        <img
                            src="./icons/window/window-maximize.svg"
                            alt="ubuntu window maximize"
                            className="h-5 w-5 inline"
                        />
                    </span>
                )
            }
            <button tabIndex={-1} id={`close-${id}`} className="mx-1.5 focus:outline-none cursor-default bg-orange bg-opacity-90 hover:bg-opacity-100 rounded-full flex justify-center mt-1 h-5 w-5 items-center" onClick={close}>
                <img
                    src="./icons/window/window-close.svg"
                    alt="ubuntu window close"
                    className="h-5 w-5 inline"
                />
            </button>
        </div>
    );
}

const WindowMainScreen = ({ screen }: { screen: () => JSX.Element }) => {
    return (
        <div className="w-full flex-grow z-20 max-h-full overflow-y-auto windowMainScreen bg-drk-abrgn">
            {screen()}
        </div>
    );
}