import { useState, useEffect } from 'react';

interface DesktopMenuProps {
    active: boolean;
    openApp: (appId: string) => void;
    addNewFolder: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = (props) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        document.addEventListener('fullscreenchange', checkFullScreen);
        return () => {
            document.removeEventListener('fullscreenchange', checkFullScreen);
        };
    }, []);

    const openTerminal = () => {
        props.openApp("terminal");
    };

    const openSettings = () => {
        props.openApp("settings");
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
        <div id="desktop-menu" className={`${props.active ? "block" : "hidden"} cursor-default w-52 context-menu-bg border text-left font-light border-gray-900 rounded text-white py-4 absolute z-50 text-sm`}>
            <div onClick={props.addNewFolder} className="w-full py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">New Folder</span>
            </div>
            <Divider />
            <div className="w-full py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5 text-gray-400">
                <span className="ml-5">Paste</span>
            </div>
            <Divider />
            <div className="w-full py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5 text-gray-400">
                <span className="ml-5">Show Desktop in Files</span>
            </div>
            <div onClick={openTerminal} className="w-full py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">Open in Terminal</span>
            </div>
            <Divider />
            <div onClick={openSettings} className="w-full py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">Change Background...</span>
            </div>
            <Divider />
            <div className="w-full py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5 text-gray-400">
                <span className="ml-5">Display Settings</span>
            </div>
            <div onClick={openSettings} className="w-full py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">Settings</span>
            </div>
            <Divider />
            <div onClick={goFullScreen} className="w-full py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-5">{isFullScreen ? "Exit" : "Enter"} Full Screen</span>
            </div>
        </div>
    );
};

const Divider: React.FC = () => (
    <div className="flex justify-center w-full">
        <div className="border-t border-gray-900 py-1 w-2/5"></div>
    </div>
);

export default DesktopMenu;
