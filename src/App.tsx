import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import LockScreen from './components/screen/LockScreen';
import BootingScreen from './components/screen/BootingScreen';
import Desktop from './components/screen/Desktop';

const Ubuntu: React.FC = () => {
  const [screenLocked, setScreenLocked] = useState<boolean>(false);
  const [bgImageName, setBgImageName] = useState<string>('bg-1');
  const [bootingScreen, setBootingScreen] = useState<boolean>(true);
  const [shutDownScreen, setShutDownScreen] = useState<boolean>(false);

  useEffect(() => {
    initializeFromLocalStorage();
  }, []);

  const initializeFromLocalStorage = () => {
    const bgImage = localStorage.getItem('bgImage');
    if (bgImage) {
      setBgImageName(bgImage);
    }

    const isBooting = localStorage.getItem('isBooting');
    if (isBooting === 'false') {
      setBootingScreen(false);
    } else {
      setTimeout(() => {
        setBootingScreen(false);
        localStorage.setItem('isBooting', 'false');
      }, 2000);
    }

    const isShutdown = localStorage.getItem('isShutdown');
    if (isShutdown === 'true') {
      shutDownHandler();
    } else {
      const isLocked = localStorage.getItem('isLocked');
      if (isLocked === 'true') {
        setScreenLocked(true);
      }
    }
  };

  const lockScreen = () => {
    document.getElementById('status-bar')?.blur();
    setTimeout(() => {
      setScreenLocked(true);
      localStorage.setItem('isLocked', 'true');
    }, 100);
  };

  const unlockScreen = () => {
    setScreenLocked(false);
    localStorage.setItem('isLocked', 'false');
  };

  const changeBackgroundImage = (imageName: string) => {
    setBgImageName(imageName);
    localStorage.setItem('bgImage', imageName);
  };

  const shutDownHandler = () => {
    document.getElementById('status-bar')?.blur();
    setShutDownScreen(true);
    localStorage.setItem('isShutdown', 'true');
  };

  const turnOn = () => {
    console.log("aa");
    setShutDownScreen(false);
    setBootingScreen(true);
    setTimeout(() => {
      setBootingScreen(false);
      localStorage.setItem('isShutdown', 'false');
    }, 2000);
  };

  return (
    <div className="w-screen h-screen overflow-hidden" id="ubuntu-screen">
      <LockScreen locked={screenLocked} bgImage={bgImageName} unLockScreen={unlockScreen} />
      <BootingScreen show={bootingScreen} isShutDown={shutDownScreen} turnOn={turnOn} />
      <Navbar lockScreen={lockScreen} shutDown={shutDownHandler} />
      <Desktop bgImage={bgImageName} changeBgImage={changeBackgroundImage} />
    </div>
  );
};

export default Ubuntu;
