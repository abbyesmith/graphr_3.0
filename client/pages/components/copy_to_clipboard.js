import React, { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard'

export default function CopyToClipboardButton({canvasRef}) {
    console.log("line 4, copy_to_clipboard")
    const [copySuccess, setCopySuccess] = useState(false);
    
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(true);
        } catch (err) {
        console.error('Failed to copy text: ', err);
        }
    };
// Click to copy image doesn't work (I have a base64-encoded image string, but I can't get that to turn into an actual picture)
    const handleClick = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL("image/png");
// Below is an attempt to get an image, not a url
        // const img = new Image();
        // img.src = dataURL;
        // img.onload = () => {
        //     const newCanvas = document.createElement('canvas');
        //     newCanvas.width = img.width;
        //     newCanvas.height = img.height;
        //     const context = newCanvas.getContext('2d');
        //     context.drawImage(img, 0, 0);
        //     const newDataURL = newCanvas.toDataURL();
        //     copyToClipboard(newDataURL);
        copyToClipboard(dataURL)
        // copyToClipboard(dataURL);
    }
    

    return (
        <div>
        <button onClick={handleClick}>Copy to Clipboard</button>
        {copySuccess && <span style={{ color: 'green' }}>Copied to clipboard!</span>}
        </div>
    );
}