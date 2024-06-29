import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setBrightnessLevel, setSoundLevel } from "../store/features/systemSettingSlice";

interface StatusCardProps {
  shutDown: () => void;
  lockScreen: () => void;
  visible: boolean;
  toggleVisible: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  shutDown,
  lockScreen,
  visible,
  toggleVisible,
}) => {
  const dispatch = useDispatch();
  const { soundLevel, brightnessLevel } = useSelector((state: RootState) => state.systemSetting);

  useEffect(() => {
    adjustBrightness(brightnessLevel);
  }, []);

  const handleSoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSoundLevel(parseInt(e.target.value)));
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    dispatch(setBrightnessLevel(value));
    adjustBrightness(value);
  };

  const adjustBrightness = (value: number) => {
    const brightnessValue = 1.2 / 100 * value + 0.25;
    document.getElementById('ubuntu-screen')!.style.filter = `brightness(${brightnessValue})`;
  };

  const handleClickLock = () => {
    toggleVisible();
    lockScreen();
  }

  const handleClickShutdown = () => {
    toggleVisible();
    shutDown();
  }

  return (
    <div
      className={`absolute right-3 top-10 w-64 bg-grey rounded-md shadow-md text-sm ${visible ? "block" : "hidden"
        }`}
    >
      <div className="absolute w-0 h-0 -top-1 right-6 top-arrow-up" />
      <div className="w-64 py-1.5 flex items-center justify-center bg-cool-grey hover:bg-warm-grey hover:bg-opacity-50">
        <div className="w-8">
          <img
            width="16px"
            height="16px"
            src="./icons/status/headphone.svg"
            alt="ubuntu headphone"
          />
        </div>
        <input
          type="range"
          onChange={handleSoundChange}
          className="ubuntu-slider w-2/3"
          name="sound_range"
          min="0"
          max="100"
          value={soundLevel.toString()}
          step="1"
        />
      </div>
      <div className="w-64 py-1.5 flex items-center justify-center bg-cool-grey hover:bg-warm-grey hover:bg-opacity-50">
        <div className="w-8">
          <img
            width="16px"
            height="16px"
            src="./icons/status/brightness.svg"
            alt="ubuntu brightness"
          />
        </div>
        <input
          type="range"
          onChange={handleBrightnessChange}
          className="ubuntu-slider w-2/3"
          name="brightness_range"
          min="0"
          max="100"
          value={brightnessLevel.toString()}
          step="1"
        />
      </div>
      <div className="w-64 flex content-center justify-center bg-cool-grey">
        <div className="w-2/4 border-black border-opacity-50 border-b my-2 border-solid" />
      </div>
      <div className="w-64 py-1.5 flex items-center justify-center bg-cool-grey hover:bg-warm-grey hover:bg-opacity-50">
        <div className="w-8">
          <img
            width="16px"
            height="16px"
            src="./icons/status/network.svg"
            alt="ubuntu wifi"
          />
        </div>
        <div className="w-2/3 flex items-center justify-between text-gray-400">
          <span>Free WIFI</span>
          <div className="arrow-custom-right" />
        </div>
      </div>
      <div className="w-64 py-1.5 flex items-center justify-center bg-cool-grey hover:bg-warm-grey hover:bg-opacity-50">
        <div className="w-8">
          <img
            width="16px"
            height="16px"
            src="./icons/status/bluetooth.svg"
            alt="ubuntu bluetooth"
          />
        </div>
        <div className="w-2/3 flex items-center justify-between text-gray-400">
          <span>Off</span>
          <div className="arrow-custom-right" />
        </div>
      </div>
      <div className="w-64 py-1.5 flex items-center justify-center bg-cool-grey hover:bg-warm-grey hover:bg-opacity-50">
        <div className="w-8">
          <img
            width="16px"
            height="16px"
            src="./icons/status/battery.svg"
            alt="ubuntu battery"
          />
        </div>
        <div className="w-2/3 flex items-center justify-between text-gray-400">
          <span>3:20 Remaining (80%)</span>
          <div className="arrow-custom-right" />
        </div>
      </div>
      <div className="w-64 flex content-center justify-center bg-cool-grey">
        <div className="w-2/4 border-black border-opacity-50 border-b my-2 border-solid" />
      </div>
      <div
        id="open-settings"
        className="w-64 py-1.5 flex items-center justify-center bg-cool-grey hover:bg-warm-grey hover:bg-opacity-50"
      >
        <div className="w-8">
          <img
            width="16px"
            height="16px"
            src="./icons/status/setting.svg"
            alt="ubuntu settings"
          />
        </div>
        <div className="w-2/3 flex items-center justify-between">
          <span>Settings</span>
        </div>
      </div>
      <div
        onClick={handleClickLock}
        className="w-64 py-1.5 flex items-center justify-center bg-cool-grey hover:bg-warm-grey hover:bg-opacity-50"
      >
        <div className="w-8">
          <img
            width="16px"
            height="16px"
            src="./icons/status/lock.svg"
            alt="ubuntu lock"
          />
        </div>
        <div className="w-2/3 flex items-center justify-between">
          <span>Lock</span>
        </div>
      </div>
      <div
        onClick={handleClickShutdown}
        className="w-64 py-1.5 flex items-center justify-center bg-cool-grey hover:bg-warm-grey hover:bg-opacity-50"
      >
        <div className="w-8">
          <img
            width="16px"
            height="16px"
            src="./icons/status/shutdown.svg"
            alt="ubuntu power"
          />
        </div>
        <div className="w-2/3 flex items-center justify-between">
          <span>Power Off</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
