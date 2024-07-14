/* eslint-disable @typescript-eslint/no-explicit-any */
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { SettingType } from "../../common/EditorTypes";
import { codeInput } from "./static/input";

const EditorComp = ({ setting }: { setting: SettingType; }) => {
    const code = useRef<string>();
    const handleEditorChange = (value: string | undefined) => {
        code.current = value?.toString();
    };

    return (
        <div className="overlay overflow-hidden flex flex-col w-full h-full shadow-4xl">
            <section className="h-full w-full flex justify-start">
                <section className="Editor-wrapper flex-grow flex flex-col justify-start">
                    {
                        setting.showFileName &&
                        (<section className="top-panel base-bg">
                            <p className="py-2 px-6 min-w-[4rem] w-fit base-h-bg">index.html</p>
                        </section>)
                    }
                    <Editor
                        height={`100%`}
                        width={`100%`}
                        language={setting.language}
                        value={code.current}
                        theme={setting.theme}
                        defaultValue={codeInput}
                        onChange={handleEditorChange}
                    />
                </section>
            </section>
        </div>
    );

};

export default EditorComp;