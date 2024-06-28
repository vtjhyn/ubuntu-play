interface BootingScreenProps {
  show: boolean;
  isShutDown: boolean;
  turnOn: () => void;
}

const BootingScreen: React.FC<BootingScreenProps> = ({ show, isShutDown, turnOn }) => {
  const containerClasses = `absolute duration-500 select-none flex flex-col justify-around items-center top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen bg-black ${show || isShutDown ? "visible opacity-100" : "invisible opacity-0"}`;
  const containerStyle = { zIndex: show || isShutDown ? 100 : -20 };

  return (
    <div style={containerStyle} className={containerClasses}>
      <img
        width="380"
        height="360"
        className="md:w-1/4 w-1/2"
        src="./icons/status/ubuntu_orange_hex.svg"
        alt="Ubuntu Logo"
      />
      <div
        className="w-10 h-10 flex justify-center items-center rounded-full outline-none cursor-pointer"
        onClick={turnOn}
      >
        {isShutDown ? (
          <div className="bg-white rounded-full flex justify-center items-center w-10 h-10 hover:bg-gray-300">
            <img
              width="32"
              height="32"
              className="w-8"
              src="./icons/status/power-button.svg"
              alt="Power Button"
            />
          </div>
        ) : (
          <img
            width="40"
            height="40"
            className={`w-10 ${show ? "animate-spin" : ""}`}
            src="./icons/status/process.svg"
            alt="Ubuntu Process Symbol"
          />
        )}
      </div>
      <img
        width="200"
        height="100"
        className="md:w-1/5 w-1/2"
        src="./icons/status/ubuntu_white_hex.svg"
        alt="Ubuntu Name"
      />
    </div>
  );
};

export default BootingScreen;
