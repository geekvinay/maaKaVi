/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import EditorComp from "../../components/EditorComp/EditorComp";
import TerminalComp from "../../components/TerminalComp/TerminalComp";
import SocketService from "../../services/SocketService/SocketService";
import BottomBar from "../../components/EditorComp/BottomBar/BottomBar";
import Header from "../../components/Header/Header";

const CodeEditor = () => {
    const [dividerPosition, setDividerPosition] = useState(70);
    const [setting, setSettings] = useState({
        theme: "vs-dark",
        language: "typescript",
        showFileName: true
    });
    const containerRef = useRef<any>(null);
    const socket = new SocketService('http://localhost:3030');
    socket.io.on('data', (data) => { console.log(data); });

    const handleMouseDown = (e: any) => {
        e.preventDefault();
        document.body.classList.add('resizing');
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: any) => {
        if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const newDividerPosition = ((e.clientY - containerRect.top) / containerRect.height) * 100;
            setDividerPosition(Math.min(Math.max(newDividerPosition, 10), 90)); // Keep within 10% to 90%
        }
    };

    const handleMouseUp = () => {
        document.body.classList.remove('resizing');
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <div className="relative code-editor w-full h-screen flex flex-row overflow-hidden pt-[5rem]">
            <Header/>
            <div ref={containerRef} className="flex flex-col flex-grow base-bg">
                <div className="flex-grow relative" style={{ height: `${dividerPosition}%` }}>
                    <EditorComp setting={setting} />
                    <div
                        className="absolute bottom-0 left-0 w-full h-[0.5rem] translate-y-[50%] bg-gray-200 opacity-0 hover:cursor-row-resize hover:opacity-100"
                        onMouseDown={handleMouseDown}
                    />
                </div>
                <div className="relative" style={{ height: `${100 - dividerPosition}%` }}>
                    <TerminalComp socket={socket} />
                </div>
            </div>
            <BottomBar settings={setting} setSettings={setSettings} />
        </div>
    );
};

export default CodeEditor;
