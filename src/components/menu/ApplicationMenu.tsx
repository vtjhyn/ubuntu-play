interface ApplicationMenuProps {
    active: boolean;
}
const ApplicationMenu: React.FC<ApplicationMenuProps> = ({ active }) => {
    return (
        <div id="application-menu" className={`${active ? "block" : "hidden"} cursor-default w-52 context-menu-bg border text-left border-gray-900 rounded text-white py-4 absolute z-50 text-sm`}>
            <a rel="noreferrer noopener" href="https://github.com/vtjhyn/ubuntu-play" target="_blank" className="w-full block cursor-default py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-2">Star this Project</span>
            </a>
            <a rel="noreferrer noopener" href="https://github.com/vtjhyn/ubuntu-play/issues" target="_blank" className="w-full block cursor-default py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-2">Report bugs</span>
            </a>
            <a rel="noreferrer noopener" href="https://www.linkedin.com/in/vebbytjahyono/" target="_blank" className="w-full block cursor-default py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-2">Follow on Linkedin</span>
            </a>
            <a rel="noreferrer noopener" href="https://github.com/vtjhyn" target="_blank" className="w-full block cursor-default py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-2">Follow on Github</span>
            </a>
            <div onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full block cursor-default py-0.5 hover:bg-warm-grey hover:bg-opacity-20 mb-1.5">
                <span className="ml-2">Reset Ubuntu</span>
            </div>
        </div>
    );
};


export default ApplicationMenu;
