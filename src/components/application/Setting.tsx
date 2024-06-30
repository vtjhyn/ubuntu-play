import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setBgImage } from "../../store/features/systemSettingSlice"
import { RootState } from "../../store/store"
import BackgroundImage from "../../themes/BackgroundImage"


const Setting = () => {
    const dispatch = useDispatch()
    const { bgImage } = useSelector((state: RootState) => state.systemSetting)

    const changeBackgroundImage = (e: React.FocusEvent<HTMLDivElement>) => {
        const path = e.target.getAttribute("data-path");
        if (path) {
            dispatch(setBgImage(path))
        }
    }
    return (
        <div className="w-full flex-col flex-grow z-20 max-h-full overflow-y-auto windowMainScreen select-none bg-cool-grey">
            <div
                className="md:w-2/5 w-2/3 h-1/3 m-auto my-4"
                style={{
                    backgroundImage: `url(${BackgroundImage[bgImage]})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"
                }}
            >
            </div>
            <div className="flex flex-wrap justify-center items-center border-t border-gray-900">
                {Object.keys(BackgroundImage).map((name, index) => (
                    <div
                        key={index}
                        tabIndex={1}
                        onFocus={changeBackgroundImage}
                        data-path={name}
                        className={((name === bgImage) ? " border-yellow-700 " : " border-transparent ") + " md:px-28 md:py-20 md:m-4 m-2 px-14 py-10 outline-none border-4 border-opacity-80"}
                        style={{
                            backgroundImage: `url(${BackgroundImage[name]})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center"
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default Setting