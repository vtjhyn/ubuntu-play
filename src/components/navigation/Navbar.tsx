import React, { useState } from 'react';
import Status from '../Status';
import StatusCard from '../StatusCard';
import formatTime from '../../utils/formatTime';
import useCurrentTime from '../../hooks/useCurrentTime';

interface NavbarProps {
  shutDown: () => void;
  lockScreen: () => void;
}

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
        <Status isCardOpen={statusCardVisible} />
      </div>
      <StatusCard
        shutDown={shutDown}
        lockScreen={lockScreen}
        visible={statusCardVisible}
        toggleVisible={() => setStatusCardVisible(false)}
      />
    </div>
  );
};

export default Navbar;
