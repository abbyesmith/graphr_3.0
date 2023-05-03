import Image from 'next/image'
import { Inter } from 'next/font/google'
import html2canvas from 'html2canvas'


const inter = Inter({ subsets: ['latin'] })

function capture() {
	html2canvas(document.querySelector("#capture")).then(canvas => {
		const resultDiv = document.querySelector("#result");
    if (resultDiv) {
      resultDiv.appendChild(canvas);
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
      <div id="result">hi!</div>
    </div>
  )
}
