import React, {FC} from 'react'
import ResizableBox from '../../utils/ResizableBox'
import styles from './Graph.module.scss'

import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Label, Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'
import {useGraph} from './useGraph'
import NoData from '../NoData/NoData'

const Graph:FC<MyProps> = ({values, xAxes, yAxes, name, title, color='green', yLabel, xLabel, type='Line'}) => {
    const { data, width, YBarWidth, YBarRef, YMaxValue, containerRef} = useGraph(values)

    return (
        <div ref={containerRef}>
            {/*Width of Y axis*/}
            {
                values.length > 0 ?
            <>
                <span className={styles['hidden']} ref={YBarRef}>{YMaxValue}</span>
                <ResizableBox resizable={false} height={500} width={width}>
                    <ResponsiveContainer>
                        <ComposedChart
                            width={width}
                            height={180}
                            barSize={20}
                            data={data}
                            style={{fontSize: 14, background: 'transparent'}}
                            margin={{
                                top: 10,
                                right: 10,
                                bottom: -9,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <YAxis label={{ value: yLabel, angle: -90, position: 'insideLeft', textAnchor: 'middle' }} width={YBarWidth+30} />
                            <XAxis label={{ value: xLabel, textAnchor: 'middle' }} height={70} dataKey={xAxes}/>
                            <Tooltip />
                            {/*<Line type="monotone" name='color_distance' dataKey="color_distance" stroke="green" activeDot={{ r: 8 }} />*/}
                            {
                                type === 'Line' ?
                                <Line type="monotone" name={name} dataKey={yAxes} fill={color} fillOpacity={0.2} stroke={color} />
                                :
                                <Bar type="monotone" name={name} dataKey={yAxes} fill={color} fillOpacity={0.2} stroke={color} />
                            }
                            {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
                        </ComposedChart>
                    </ResponsiveContainer>
                </ResizableBox>
            </>
                : <NoData />
            }

        </div>
    )
}

export default Graph

type MyProps = {
    values?: any
    xAxes: string
    xLabel?: string
    yAxes: string
    yLabel?: string
    name?: string //name of data
    title?: string
    color?: string
    type?: 'Line' | 'Bar'
}
