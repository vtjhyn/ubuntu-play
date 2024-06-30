import React, { useState } from 'react';
import { ApplicationTypes } from '../../constant/defaultApps';


interface SidebarItemProps {
    app: ApplicationTypes;
    isOpen: boolean;
    isFocus: boolean;
    openApp: (id: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ app, isOpen, isFocus, openApp }) => {
    const [showTitle, setShowTitle] = useState(false);
    const [scaleImage, setScaleImage] = useState(false);

    const scaleImageHandler = () => {
        setTimeout(() => {
            setScaleImage(false);
        }, 1000);
        setScaleImage(true);
    };

    const openAppHandler = () => {
        if (!isOpen) {
            scaleImageHandler();
        }
        openApp(app.id);
        setShowTitle(false);
    };

    return (
        <div
            tabIndex={0}
            onClick={openAppHandler}
            onMouseEnter={() => {
                setShowTitle(true);
            }}
            onMouseLeave={() => {
                setShowTitle(false);
            }}
            className={
                (isOpen && isFocus ? 'bg-white bg-opacity-10 ' : '') +
                ' w-auto p-2 outline-none relative transition hover:bg-white hover:bg-opacity-10 rounded m-1'
            }
            id={'sidebar-' + app.id}
        >
            <img width='28px' height='28px' className='w-7' src={app.icon} alt='Ubuntu App Icon' />
            <img
                className={
                    (scaleImage ? ' scale ' : '') +
                    ' scalable-app-icon w-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                }
                src={app.icon}
                alt=''
            />
            {isOpen ? (
                <div className=' w-1 h-1 absolute left-0 top-1/2 bg-orange rounded-sm'></div>
            ) : null}
            <div
                className={
                    (showTitle ? ' visible ' : ' invisible ') +
                    ' w-max py-0.5 px-1.5 absolute top-1.5 left-full ml-3 m-1 text-t-grey text-opacity-90 text-sm bg-grey bg-opacity-70 border-gray-400 border border-opacity-40 rounded-md'
                }
            >
                {app.title}
            </div>
        </div>
    );
};

export default SidebarItem;
