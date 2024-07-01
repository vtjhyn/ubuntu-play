import { useState, useEffect } from 'react';

interface DesktopMenuProps {
    active: boolean;
    openApp: (appId: string) => void;
    addNewFolder: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ active, openApp, addNewFolder }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        document.addEventListener('fullscreenchange', checkFullScreen);
        return () => {
            document.removeEventListener('fullscreenchange', checkFullScreen);
        };
    }, []);

    const openSettings = () => {
        openApp("settings");
    };

    const checkFullScreen = () => {
        if (document.fullscreenElement) {
            setIsFullScreen(true);
        } else {
            setIsFullScreen(false);
        }
    };

    const goFullScreen = () => {
        try {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div id="desktop-menu" className={`${active ? "block" : "hidden"} cursor-default w-52 context-menu-bg border text-left font-light border-gray-900 rounded text-white py-4 absolute z-50 text-sm`}>
            <div onClick={addNewFolder} className="w-full py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">New Folder</span>
            </div>
            <div onClick={openSettings} className="w-full py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">Settings</span>
            </div>
            <div onClick={goFullScreen} className="w-full py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">{isFullScreen ? "Exit" : "Enter"} Full Screen</span>
            </div>
        </div>
    );
};

export default DesktopMenu;
