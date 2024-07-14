import { useEffect, useState } from "react";
import EditorComp from "../../components/EditorComp/EditorComp";
import TerminalComp from "../../components/TerminalComp/TerminalComp";
import MarkdownViewer from "../../components/MarkdownViewer/MarkdownViewer";
// import Header from "../../components/Header/Header";
import { markdownContent } from "../../static/markdown/markdown";

const LearnModule = () => {
  const [setting, setSettings] = useState({
    theme: "vs-dark",
    language: "typescript",
    showFileName: false,
  });
  console.log('setSettings: ', setSettings);

  const [leftWidth, setLeftWidth] = useState(50);
  const [rightWidth, setRightWidth] = useState(50);
  const [editorHeight, setEditorHeight] = useState(50);
  const [terminalHeight, setTerminalHeight] = useState(50);
  const [isDraggingVertical, setIsDraggingVertical] = useState(false);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {

      if (isDraggingVertical) {
        const newLeftWidth = (event.clientX / window.innerWidth) * 100;
        setLeftWidth(newLeftWidth);
        setRightWidth(100 - newLeftWidth);
      } else if (isDraggingHorizontal) {
        const newEditorHeight = (event.clientY / window.innerHeight) * 100;
        setEditorHeight(newEditorHeight);
        setTerminalHeight(100 - newEditorHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingVertical(false);
      setIsDraggingHorizontal(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingVertical, isDraggingHorizontal]);

  const handleVerticalMouseDown = () => {
    setIsDraggingVertical(true);
  };

  const handleHorizontalMouseDown = () => {
    setIsDraggingHorizontal(true);
  };

  return (
    <section className="learn-module w-screen h-screen flex flex-col justify-start">
      {/* <Header /> */}
      <section className="base-bg w-full h-full flex flex-row justify-start">
        <section
          className="discussion base-h-bg h-full overflow-scroll"
          style={{ width: `${leftWidth}%` }}
        >
          <MarkdownViewer markdown={markdownContent} />
        </section>
        <div
          className="w-2 h-screen bg-white opacity-5 hover:cursor-col-resize hover:opacity-50"
          onMouseDown={handleVerticalMouseDown}
        ></div>
        <section
          className="interactive-editor base-bg flex flex-col"
          style={{ width: `${rightWidth}%` }}
        >
          <div
            className="flex-grow"
            style={{ height: `${editorHeight}%` }}
          >
            <EditorComp setting={setting} />
          </div>
          <div
            className="h-2 w-full bg-white opacity-20 hover:cursor-row-resize hover:opacity-90"
            onMouseDown={handleHorizontalMouseDown}
          ></div>
          <div
            className="flex-grow"
            style={{ height: `${terminalHeight}%` }}
          >
            <TerminalComp />
          </div>
        </section>
      </section>
    </section>
  );
};

export default LearnModule;
