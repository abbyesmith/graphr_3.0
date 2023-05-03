import Image from 'next/image'
import { Inter } from 'next/font/google'
import html2canvas from 'html2canvas'


const inter = Inter({ subsets: ['latin'] })

// function capture() {
// 	html2canvas(document.querySelector("#capture")).then(canvas => {
// 		const resultDiv = document.querySelector("#result");
//     if (resultDiv) {
//       resultDiv.appendChild(canvas);
//     } else {
//       console.log('Result element not found')
//     }
// 	});
// }

function copyToClipboard(dataUrl) {
  const blob = new Blob([dataUrl], { type: "image/png; charset=utf-8" });
  const item = new ClipboardItem({ "image/png": blob });

  navigator.clipboard.write([item]).then(function() {
    console.log("Copied to clipboard!");
  }, function(error) {
    console.error("Failed to copy image to clipboard", error);
  });
}

function capture() {
  html2canvas(document.querySelector("#capture")).then(canvas => {
    const resultDiv = document.querySelector("#result");
    if (resultDiv) {
      resultDiv.appendChild(canvas);
      const imgData = canvas.toDataURL('image/png');
      const uintArray = new Uint8Array(atob(imgData.split(',')[1]).split('').map(char => char.charCodeAt()));
      const blob = new Blob([uintArray], { type: 'image/png' });
      navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]).then(() => {
        console.log('Image copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy image to clipboard:', err);
      });
    } else {
      console.log('Result element not found')
    }
  });
}


export default function Home() {
  return (
    <div>
      <p>Welcome to Graphr Take 3</p>
      <div id="capture">
        <h3>Html2Canvas Example</h3>
        <p>This is the content that will be captured</p>
      </div>
      <button onClick = {capture}>Take a screenshot</button>
      {/* <div id="result">hi!</div> */}
    </div>
  )
}
