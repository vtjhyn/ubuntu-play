import { useEffect } from 'react';

import LockScreen from './components/screen/LockScreen';
import BootingScreen from './components/screen/BootingScreen';
import Desktop from './components/screen/Desktop';
import Navbar from './components/navigation/Navbar';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { setSystemMode } from './store/features/systemModeSlice';
import { setBgImage } from './store/features/systemSettingSlice';

const Ubuntu: React.FC = () => {
  const dispatch = useDispatch();
  const { systemMode } = useSelector((state: RootState) => state.systemMode);
  const { bgImage } = useSelector((state: RootState) => state.systemSetting);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setSystemMode('active'));
    }, 2000)
  }, []);


  const lockScreen = () => {
    document.getElementById('status-bar')?.blur();
    setTimeout(() => {
      dispatch(setSystemMode('locked'));
    }, 100);
  };

  const unlockScreen = () => {
    dispatch(setSystemMode('active'));
  };

  const changeBackgroundImage = (imageName: string) => {
    dispatch(setBgImage(imageName));
  };

  const shutDownHandler = () => {
    document.getElementById('status-bar')?.blur();
    dispatch(setSystemMode('shutdown'));
  };

  const turnOn = () => {
    dispatch(setSystemMode('booting'));
    setTimeout(() => {
      dispatch(setSystemMode('active'));
    }, 2000);
  };

  return (
    <div className="w-screen h-screen overflow-hidden" id="ubuntu-screen">
      <LockScreen locked={systemMode === 'locked'} bgImage={bgImage} unLockScreen={unlockScreen} />
      <BootingScreen show={systemMode === 'booting'} isShutDown={systemMode === 'shutdown'} turnOn={turnOn} />
      <Navbar lockScreen={lockScreen} shutDown={shutDownHandler} />
      <Desktop bgImage={bgImage} changeBgImage={changeBackgroundImage} />
    </div>
  );
};

export default Ubuntu;
