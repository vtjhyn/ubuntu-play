import { useState } from 'react';
import StatusMenu from '../menu/StatusMenu';
import formatTime from '../../utils/formatTime';
import useCurrentTime from '../../hooks/useCurrentTime';

interface NavbarProps {
  shutDown: () => void;
  lockScreen: () => void;
}

const icons = [
  {
    src: "./icons/status/network.svg",
    alt: "ubuntu wifi"
  },
  {
    src: "./icons/status/volume.svg",
    alt: "ubuntu sound"
  },
  {
    src: "./icons/status/battery.svg",
    alt: "ubuntu battery"
  }
];

const Navbar: React.FC<NavbarProps> = ({ shutDown, lockScreen }) => {
  const time = useCurrentTime();
  const [statusCardVisible, setStatusCardVisible] = useState(false);

  const toggleStatusCard = () => setStatusCardVisible(!statusCardVisible);

  return (
    <div className="main-navbar-vp absolute top-0 right-0 w-screen shadow-md flex justify-between items-center bg-grey text-t-grey text-sm select-none z-50">
      <div
        tabIndex={0}
        className="pl-3 pr-3 py-1 outline-none transition duration-100 ease-in-out border-b-2 border-transparent"
      >
        Activities
      </div>
      <div
        tabIndex={0}
        className="pl-2 pr-2 py-1 text-xs md:text-sm outline-none transition duration-100 ease-in-out border-b-2 border-transparent"
      >
        <span>{formatTime(time, 'DD MMM hh:mm A')}</span>
      </div>
      <div
        id="status-bar"
        tabIndex={0}
        onClick={toggleStatusCard}
        className="relative pr-3 pl-3 py-1 outline-none transition duration-100 ease-in-out border-b-2 border-transparent"
      >
        <div className="flex justify-center items-center">
          {icons.map((icon, index) => (
            <span key={index} className="mx-1.5">
              <img
                width="16px"
                height="16px"
                src={icon.src}
                alt={icon.alt}
                className="inline status-symbol w-4 h-4"
              />
            </span>
          ))}
          <span className="mx-1">
            <div className={`arrow-custom-${statusCardVisible ? "up" : "down"} status-symbol`} />
          </span>
        </div>
      </div>
      <StatusMenu
        shutDown={shutDown}
        lockScreen={lockScreen}
        visible={statusCardVisible}
        toggleVisible={() => setStatusCardVisible(false)}
      />
    </div>
  );
};

export default Navbar;
