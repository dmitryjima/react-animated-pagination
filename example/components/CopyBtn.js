import React, { useRef } from "react";

import './copyBtn.css';

const CopyBtn = ({ handleCopyToClipBoard }) => {
    let btnRef = useRef(null);

    const handleCopy = () => {
        handleCopyToClipBoard();

        btnRef.current.textContent = "Copied!";

        setTimeout(() => {
            btnRef.current.textContent = "Copy";
        }, 1500);
    }

    return (
      <button
        ref={btnRef}
        className="copyBtn"
        onClick={() => handleCopy()}
      >
        Copy
      </button>
    )
}

export default CopyBtn;