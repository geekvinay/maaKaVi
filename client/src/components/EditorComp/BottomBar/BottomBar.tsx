/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SettingType } from "../../../common/EditorTypes";

const BottomBar = ({ settings, setSettings }: { settings: SettingType, setSettings: any; }) => {
    console.log('setSettings: ', setSettings);
    return (
        <div className="absolute bottom-0 w-screen left-0 h-[2rem] border-t-2 base-h-bg flex justify-between items-center px-[2rem] list-none">
            <li className="px-2 hover:cursor-pointer mr-auto">InBrowserIDE</li>
            <li className="px-2 hover:cursor-pointer first-letter:capitalize">
                {settings.theme}
            </li>
            <li className="px-2 hover:cursor-pointer first-letter:capitalize">
                {settings.language}
            </li>
        </div>
    );
};

export default BottomBar;