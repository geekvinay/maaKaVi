import { useState } from "react";

const SideBar = () => {
    const [files, setFiles] = useState([
        {
            type: 'file',
            value: 'index.html'
        }
    ]);
    const [isClosed, setIsClosed] = useState(false);

    return (
        <section className={`h-full base-h-bg flex justify-start ${isClosed ? 'w-fit' : 'w-[20rem]'}`}>
            <div className="settings-bar w-fit h-full base-bg py-4 border-r-2">
                <a href="#" className="logo text-3xl font-bold text-white px-4">In</a>
            </div>
            <div className={`h-full w-full settings-bar base-h-bg border-r-2 ${isClosed && 'hidden'}`}>
                <section className="w-full object-contain explorer-bar border-b-2 base-bg flex justify-between items-center px-4">
                    <span className="text-base font-normal py-2">EXPLORER</span>
                    <span className="w-2 h-2 bg-white rounded-full" onClick={(() => {
                        setIsClosed(isClosed => !isClosed);
                    })}></span>
                </section>
                <section className={`files h-full w-full`}>
                    {files.map((file) => {
                        if (file.type == 'file') {
                            return <p key={file.value} className="w-full base-h-bg py-2 px-4">
                                {file.value}
                            </p>;
                        }
                    })}
                </section>
            </div>
        </section>
    );
};

export default SideBar;