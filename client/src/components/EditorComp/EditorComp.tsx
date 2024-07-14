/* eslint-disable @typescript-eslint/no-explicit-any */
import Editor from "@monaco-editor/react";
import { SettingType } from "../../common/EditorTypes";
import { codeInput } from "./static/input";

const EditorComp = ({ setting, code }: { setting: SettingType; code: string; }) => {
    const handleEditorChange = (value: string | undefined) => {
        code = value?.toString() as any;
    };

    return (
        <div className="overlay overflow-hidden flex flex-col w-full h-full shadow-4xl rounded-t-lg">
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
                        value={code}
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