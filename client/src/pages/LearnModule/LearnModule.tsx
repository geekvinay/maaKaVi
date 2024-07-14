/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import EditorComp from "../../components/EditorComp/EditorComp";
import TerminalComp from "../../components/TerminalComp/TerminalComp";
import MarkdownViewer from "../../components/MarkdownViewer/MarkdownViewer";
import KaviAI from "../../components/KaviAI/KaviAI";
import Discussions from "../../components/Discussions/Discussions";
import Confetti from 'react-dom-confetti';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useParams to get route parameters

const LearnModule = () => {
  const learnModuleId = useLocation().pathname.split('/').pop(); // Get the learnModuleId from the route parameters
  const [code, setCode] = useState("");
  const [expCode, setExpCode] = useState("");
  const [article, setArticle] = useState("");
  const token = JSON.parse(localStorage.getItem('token') || "{}" as string);
  const [setting, setSettings] = useState({
    theme: "vs-dark",
    language: "typescript",
    showFileName: false,
  });
  console.log('setSettings: ', setSettings);

  const [leftWidth, setLeftWidth] = useState(50);
  const [rightWidth, setRightWidth] = useState(50);
  const [editorHeight, setEditorHeight] = useState(70);
  const [terminalHeight, setTerminalHeight] = useState(30);
  const [isDraggingVertical, setIsDraggingVertical] = useState(false);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [activeSection, setActiveSection] = useState("description"); // Default active section
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchExtraData = async (learnModuleId: string) => {
    try {
      const learningModuleResponse = await axios.get(`http://localhost:3031/v1/learning-modules/${learnModuleId}`, { headers: { Authorization: `Bearer ${token}` } });
      console.log('learningModuleResponse: ', learningModuleResponse.data);
      const articleResponse = await axios.get(`http://localhost:3031/v1/articles/${learningModuleResponse.data.data.articleId}`, { headers: { Authorization: `Bearer ${token}` } });
      const codeplayResponse = await axios.get(`http://localhost:3031/v1/code-labs/${learningModuleResponse.data.data.codelabId}`, { headers: { Authorization: `Bearer ${token}` } });
      console.log('articleResponse: ', articleResponse.data);
      console.log('codeplayResponse: ', codeplayResponse.data);

      setCode(codeplayResponse.data.data.initialCode);
      setExpCode(codeplayResponse.data.data.finalCode);
      setArticle(articleResponse.data.data.articleContent);

    } catch (error) {
      console.error('Error fetching extra data:', error);
    }
  };

  useEffect(() => {
    if (learnModuleId) {
      fetchExtraData(learnModuleId);
    }
  }, [learnModuleId]); // Added learnModuleId as a dependency to avoid infinite loop

  useEffect(() => {
    const handleMouseMove = (event: any) => {
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

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
  };

  const handleRunClick = () => {
    // Compare code with expCode and trigger confetti if they match
    if (code === expCode) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }

    // Your other run logic here
    console.log("Running...");
  };

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 600, // Increase the number of confetti elements
    dragFriction: 0.02,
    duration: 3000,
    stagger: 2,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <section className="learn-module w-screen h-screen flex flex-col justify-start pt-5rem">
      <section className="base-h-bg w-full h-full flex flex-row justify-start">
        <section
          className="discussion base-h-bg h-full pl-4 pr-2 py-4 flex flex-col justify-start"
          style={{ width: `${leftWidth}%` }}
        >
          <nav className="flex flex-row justify-start px-2 py-2 mb-2 space-x-2 list-none base-bg rounded-lg">
            <li
              className={`py-2 w-[8rem] text-center rounded-md cursor-pointer ${activeSection === "description" ? "bg-white bg-opacity-10 font-bold text-gray-100" : "text-gray-300"
                }`}
              onClick={() => handleSectionClick("description")}
            >
              Description
            </li>
            <li
              className={`py-2 w-[8rem] text-center rounded-md cursor-pointer ${activeSection === "kavi" ? "bg-white bg-opacity-10 font-bold text-gray-100" : "text-gray-300"
                }`}
              onClick={() => handleSectionClick("kavi")}
            >
              KaVi AI
            </li>
            <li
              className={`py-2 w-[8rem] text-center rounded-md cursor-pointer ${activeSection === "discussions" ? "bg-white bg-opacity-10 font-bold text-gray-100" : "text-gray-300"
                }`}
              onClick={() => handleSectionClick("discussions")}
            >
              Discussions
            </li>
          </nav>
          {activeSection === "description" && <MarkdownViewer markdown={article} />}
          {activeSection === "kavi" && <KaviAI article={article} code={code} />}
          {activeSection === "discussions" && <Discussions />}
        </section>
        <div
          className="w-2 h-[50%] my-auto rounded-full bg-white opacity-10 hover:cursor-col-resize hover:opacity-50"
          onMouseDown={handleVerticalMouseDown}
        ></div>
        <section
          className="interactive-editor base-h-bg flex flex-col py-4 pr-4 pl-2 relative"
          style={{ width: `${rightWidth}%` }}
        >
          <nav className="flex flex-row justify-start px-2 py-2 mb-2 space-x-2 list-none base-bg rounded-lg">
            <li className="title px-4 py-2 mr-auto">Code</li>
            <li className="title px-4 py-2 first-letter:capitalize">{setting.language}</li>
            <button className="title px-4 py-2 bg-blue-100 bg-opacity-20 rounded-md" onClick={handleRunClick}>
              Run
            </button>
            <button className="title px-4 py-2 bg-blue-700 bg-opacity-50 rounded-md">Next</button>
          </nav>
          <div className="flex-grow" style={{ height: `${editorHeight}%` }}>
            <EditorComp code={code} setting={setting} />
          </div>
          <div
            className="h-2 w-full bg-white opacity-20 hover:cursor-row-resize hover:opacity-90"
            onMouseDown={handleHorizontalMouseDown}
          ></div>
          <div className="flex-grow" style={{ height: `${terminalHeight}%` }}>
            <TerminalComp />
          </div>
          <Confetti active={showConfetti} config={confettiConfig} />
        </section>
      </section>
    </section>
  );
};

export default LearnModule;
