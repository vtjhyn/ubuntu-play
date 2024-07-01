import { useState, useEffect } from 'react';
import DesktopApp from './DesktopApp';

interface App {
    id: string;
    title: string;
    icon: string;
}

interface AllAppProps {
    apps: App[];
    openApp: (appId: string) => void;
}

const AllApp: React.FC<AllAppProps> = ({ apps, openApp }) => {
    const [query, setQuery] = useState<string>("");
    const [filteredApps, setFilteredApps] = useState<App[]>([]);

    useEffect(() => {
        setFilteredApps(apps);
    }, [apps]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        setQuery(inputValue);
        if (inputValue === "" || inputValue === null) {
            setFilteredApps(apps);
        } else {
            setFilteredApps(prevApps =>
                prevApps.filter(app => app.title.toLowerCase().includes(inputValue))
            );
        }
    };

    return (
        <div className="absolute h-full top-7 w-full z-20 pl-12 justify-center md:pl-20 border-black border-opacity-60 bg-black bg-opacity-70">
            <div className="flex md:pr-20 pt-5 align-center justify-center">
                <div className="flex w-2/3 h-full items-center pl-2 pr-2 bg-white border-black border-width-2 rounded-xl overflow-hidden md:w-1/3">
                    <img className="w-5 h-5" alt="search icon" src={'./images/logos/search.png'} />
                    <input
                        className="w-3/4 p-1 bg-transparent focus:outline-none"
                        placeholder="Type to Search"
                        value={query}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="grid md:grid-cols-6 md:grid-rows-3 grid-cols-3 grid-rows-6 md:gap-4 gap-1 md:px-20 px-5 pt-10 justify-center">
                {filteredApps.map((app, index) => (
                    <DesktopApp key={index} id={app.id} name={app.title} icon={app.icon} openApp={openApp} />
                ))}
            </div>
        </div>
    );
};

export default AllApp;
