import * as marked from 'marked';
import "./markdown.css";
interface MarkdownViewerProps {
    markdown: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdown }) => {
    // Function to convert Markdown to HTML
    const getMarkdownText = () => {
        // Using marked library to convert Markdown to HTML
        const rawMarkup = marked.parse(markdown);
        console.log('rawMarkup: ', rawMarkup);
        return { __html: rawMarkup };
    };

    return (
        <div className="markdown-viewer px-4 py-8" dangerouslySetInnerHTML={getMarkdownText()} />
    );
};

export default MarkdownViewer;
