import BackgroundImage from "../../themes/BackgroundImage";

interface DesktopProps {
  bgImage: string;
  changeBgImage: (imgName: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ bgImage, changeBgImage }) => {
  return (
    <div className={" h-full w-full flex flex-col items-end justify-start content-start flex-wrap-reverse pt-8 bg-transparent relative overflow-hidden overscroll-none window-parent"}>
      <div style={{ backgroundImage: `url(${BackgroundImage[bgImage]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPositionX: "center" }} className="bguntu-img absolute -z-10 top-0 right-0 overflow-hidden h-full w-full">
      </div>
    </div>
  )
}

export default Desktop