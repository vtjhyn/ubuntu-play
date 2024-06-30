import { ChangeEvent, KeyboardEvent, useState } from 'react'

const baseUrl = 'https://www.google.com/webhp?igu=1';

const Chrome = () => {
    const [url, setUrl] = useState(baseUrl);
    const [displayUrl, setDisplayUrl] = useState('https://www.google.com');

    const refreshChrome = () => {
        const chromeScreen = document.getElementById("chrome-screen") as HTMLIFrameElement;
        if (chromeScreen) {
            chromeScreen.src += '';
        }
    };

    const goToHome = () => {
        setUrl(baseUrl);
        setDisplayUrl("https://www.google.com");
        refreshChrome();
    };

    const checkKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            let inputUrl = (e.target as HTMLInputElement).value.trim();
            if (inputUrl.length === 0) return;

            if (!inputUrl.startsWith("http://") && !inputUrl.startsWith("https://")) {
                inputUrl = "https://" + inputUrl;
            }

            inputUrl = encodeURI(inputUrl);
            let displayUrl = inputUrl;
            if (inputUrl.includes("google.com")) {
                inputUrl = 'https://www.google.com/webhp?igu=1';
                displayUrl = "https://www.google.com";
            }
            setUrl(inputUrl);
            setDisplayUrl(displayUrl);
            (document.getElementById("chrome-url-bar") as HTMLInputElement).blur();
        }
    };

    const handleDisplayUrl = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplayUrl(e.target.value);
    };

    return (
        <div className="h-full w-full flex flex-col bg-cool-grey">
            <div className="w-full pt-0.5 pb-1 flex justify-start items-center text-white text-sm border-b border-gray-900">
                <div onClick={refreshChrome} className="ml-2 mr-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10">
                    <img className="w-5" src="./icons/status/chrome_refresh.svg" alt="Ubuntu Chrome Refresh" />
                </div>
                <div onClick={goToHome} className="mr-2 ml-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10">
                    <img className="w-5" src="./icons/status/chrome_home.svg" alt="Ubuntu Chrome Home" />
                </div>
                <input
                    onKeyDown={checkKey}
                    onChange={handleDisplayUrl}
                    value={displayUrl}
                    id="chrome-url-bar"
                    className="outline-none bg-grey rounded-full pl-3 py-0.5 mr-3 w-5/6 text-gray-300 focus:text-white"
                    type="url"
                    spellCheck={false}
                    autoComplete="off"
                />
            </div>
            <iframe src={url} className="flex-grow" id="chrome-screen" frameBorder="0" title="Ubuntu Chrome Url"></iframe>
        </div>
    )
}

export default Chrome