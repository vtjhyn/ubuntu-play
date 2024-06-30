import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { RootState } from "../../store/store"
import { removeAllTrashItems } from "../../store/features/trashDataSlice";


const Trash = () => {
    const dispatch = useDispatch();
    const { data: trashData } = useSelector((state: RootState) => state.trashData);

    const focusFile = (e: React.FocusEvent<HTMLDivElement>) => {
        e.currentTarget.children[0].classList.toggle("opacity-60");
        e.currentTarget.children[1].classList.toggle("bg-orange");
    }

    const emptyTrash = () => {
        dispatch(removeAllTrashItems());
    };

    return (
        <div className="w-full h-full flex flex-col bg-cool-grey text-white select-none">
            <div className="flex items-center justify-between w-full bg-warm-grey bg-opacity-40 text-sm">
                <span className="font-bold ml-2">Trash</span>
                <div className="flex">
                    <div className="border border-black bg-black bg-opacity-50 px-3 py-1 my-1 mx-1 rounded text-gray-300">Restore</div>
                    <div onClick={emptyTrash} className="border border-black bg-black bg-opacity-50 px-3 py-1 my-1 mx-1 rounded hover:bg-opacity-80">Empty</div>
                </div>
            </div>
            {trashData.length === 0 ? (<div className="flex-grow flex flex-col justify-center items-center">
                <img className="w-24" src="./icons/status/trash.svg" alt="Ubuntu Trash" />
                <span className="font-bold mt-4 text-xl px-1 text-gray-400">Trash is Empty</span>
            </div>) : (<div className="flex-grow ml-4 flex flex-wrap items-start content-start justify-start overflow-y-auto windowMainScreen">
                {trashData.map((item, index) => (
                    <div key={index} tabIndex={1} onFocus={focusFile} onBlur={focusFile} className="flex flex-col items-center text-sm outline-none w-16 my-2 mx-4">
                        <div className="w-16 h-16 flex items-center justify-center">
                            <img src={item.icon} alt="Ubuntu File Icons" />
                        </div>
                        <span className="text-center rounded px-0.5">{item.name}</span>
                    </div>
                ))}
            </div>)}
        </div>
    )
}

export default Trash