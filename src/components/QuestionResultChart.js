import React from 'react'
import PieChart from 'react-minimal-pie-chart'

const QuestionResultChart = (props) => {
    const {option1Percentage, option2Percentage} = props
    return (<PieChart
        animate
        data={[
        {
            value: option1Percentage,
            color: '#d16161'
        }, {
            value: option2Percentage,
            color: '#619bd1'
        }
    ]}
        style={{
        height: '100px',
        width: '100px',
        marginLeft: 10,
        marginRight: 10
    }}/>)
}

export default QuestionResultChart;