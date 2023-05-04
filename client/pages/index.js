import Image from 'next/image'
import { Inter } from 'next/font/google'
import html2canvas from 'html2canvas'
import { useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

function copyToClipboard(dataUrl) {
  const blob = new Blob([dataUrl], { type: "image/png; charset=utf-8" });
  const item = new ClipboardItem({ "image/png": blob });

  navigator.clipboard.write([item]).then(function() {
    console.log("Copied to clipboard!");
  }, function(error) {
    console.error("Failed to copy image to clipboard", error);
  });
}



export default function Home() {
  
  const [showPopup, setShowPopup] = useState(false);
  
  function capture() {
    html2canvas(document.querySelector("#capture")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const uintArray = new Uint8Array(atob(imgData.split(',')[1]).split('').map(char => char.charCodeAt()));
      const blob = new Blob([uintArray], { type: 'image/png' });
      navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]).then(() => {
        console.log('Image copied to clipboard');
        setShowPopup(true);
      }).catch(err => {
        console.error('Failed to copy image to clipboard:', err);
      });
    });
  }

  function handlePopupClose() {
    setShowPopup(false)
  }
  return (
    <div>
      <p>Welcome to Graphr Take 3</p>
      <div id="capture">
        <h3>Really NEW NEW Html2Canvas Example</h3>
        <p>This is the content that will be captured</p>
      </div>
      <button onClick={capture}>Take a screenshot</button>
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={handlePopupClose}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 8,
            }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <h2>Success, the image is saved to your clipboard. Now head over to the document you'd like to post your image.</h2>
            <div id="result"></div>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
