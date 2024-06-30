import { useState } from 'react';

const Gedit = () => {
    const [content, setContent] = useState<string>('');

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleSave = () => {
        alert('Simpan konten: ' + content);
    };

    const handleOpen = () => {
        alert('Buka berkas');
    };

    return (
        <div className="h-full w-full flex flex-col">
            <div className="p-2 flex justify-between items-center bg-gray-800 text-white">
                <div className="font-bold">Gedit - Text Editor</div>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded" onClick={handleOpen}>
                        Open
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
            <textarea
                value={content}
                onChange={handleTextChange}
                className="flex-grow p-2 bg-gray-200 text-gray-800"
                placeholder="Write something..."
            />
        </div>
    );
};

export default Gedit;
