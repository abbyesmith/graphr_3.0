import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ToolTip, Legend} from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ToolTip, Legend);

export default function Practice(){
    return (
        <div className = "Practice">
            <h1>Draw Arbitrary Line in Line Chart</h1>
        </div>
    )
}