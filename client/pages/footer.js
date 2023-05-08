import Image from 'next/image'
import "./_app"


export default function Footer(){
    return(
        <div className = "footer">
            <Image src = "/color_full.png" width = {150} height={90}/>
        </div>
    )
}