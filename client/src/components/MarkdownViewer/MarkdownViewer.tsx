/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as marked from 'marked';
import "./markdown.css";
import 'highlight.js/styles/default.css';
import hljs, { HighlightOptions } from 'highlight.js';
interface MarkdownViewerProps {
    markdown: string;
}

marked.setOptions({
    highlight: function (code: HighlightOptions, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, code).value;
            } catch (__) { }
        }
        return ''; // no highlight
    }
} as any);

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdown }) => {
    const getMarkdownText = () => {
        const rawMarkup = marked.parse(markdown);
        console.log('rawMarkup: ', rawMarkup);
        return { __html: rawMarkup };
    };

    return (
        <div className="markdown-viewer px-6 py-6 h-full w-full overflow-scroll rounded-lg base-bg" dangerouslySetInnerHTML={getMarkdownText()} />
    );
};

export default MarkdownViewer;
