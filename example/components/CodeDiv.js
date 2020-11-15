import React, { useRef } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { tomorrow } from 'react-syntax-highlighter/styles/prism';

import CopyBtn from "./CopyBtn";

import './showCase.css';

const CodeDiv = ({ content, codeblock }) => {
    let codeRef = useRef(null);

    const handleCopyToClipBoard = () => {
        navigator && navigator.clipboard.writeText(codeRef.current.firstChild.textContent)
            .catch(err => console.log(err))
    }
    return (
        <div ref={codeRef} className="showcase__codeDiv">
            <SyntaxHighlighter language={codeblock && codeblock.language ? codeblock.language : "jsx"} style={tomorrow}>
            {codeblock && codeblock.content ? codeblock.content : content}
            </SyntaxHighlighter>
            <CopyBtn
            handleCopyToClipBoard={handleCopyToClipBoard}
            />
      </div>
    );
}

export default CodeDiv;