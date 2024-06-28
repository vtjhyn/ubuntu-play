interface StatusProps {
  isCardOpen: boolean;
}

const Status: React.FC<StatusProps> = ({ isCardOpen }) => {
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

  return (
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
        <div className={`arrow-custom-${isCardOpen ? "up" : "down"} status-symbol`} />
      </span>
    </div>
  );
};

export default Status;
