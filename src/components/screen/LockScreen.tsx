import { useEffect } from "react";
import BackgroundImage from "../../themes/BackgroundImage";
import useCurrentTime from "../../hooks/useCurrentTime";
import formatTime from "../../utils/formatTime";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface LockScreenProps {
    locked: boolean;
    unLockScreen: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ locked, unLockScreen }) => {
    const time = useCurrentTime();
    const { bgImage } = useSelector((state: RootState) => state.systemSetting)

    useEffect(() => {
        if (locked) {
            const handleUnlock = () => unLockScreen();
            window.addEventListener('click', handleUnlock);
            window.addEventListener('keypress', handleUnlock);

            return () => {
                window.removeEventListener('click', handleUnlock);
                window.removeEventListener('keypress', handleUnlock);
            };
        }
    }, [locked, unLockScreen]);

    return (
        <div
            id="lock-screen"
            style={{ zIndex: 100 }}
            className={`${locked ? "visible translate-y-0" : "invisible -translate-y-full"
                } absolute outline-none bg-black bg-opacity-90 transform duration-500 select-none top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen`}
        >
            <div
                style={{
                    backgroundImage: `url(${BackgroundImage[bgImage]})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionX: "center",
                }}
                className="absolute top-0 left-0 w-full h-full transform z-20 blur-md"
            />
            <div className="w-full h-full z-50 overflow-hidden relative flex flex-col justify-center items-center text-white">
                <div className="text-7xl">
                    <span>{formatTime(time, "HH:mm")}</span>
                </div>
                <div className="mt-4 text-xl font-medium">
                    <span>{formatTime(time, "DD MMMM YYYY")}</span>
                </div>
                <div className="mt-16 text-base">
                    Click or Press a key to unlock
                </div>
            </div>
        </div>
    );
};

export default LockScreen;
