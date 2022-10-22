import {createRef, useCallback, useEffect, useRef, useState} from 'react'
import {getCurrentData, getCurrentTime} from '../../utils/utils'

export const useGraph = (values: any) => {
    const [data, setData] = useState<any>( [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ])
    const YBarRef = createRef<HTMLSpanElement>()
    const containerRef = useRef<HTMLDivElement>(null)

    const calculateWidth = useCallback(() => {
        if(containerRef.current) {
            console.log(containerRef.current.scrollWidth)
            return containerRef.current.scrollWidth
        }

    }, [window.innerWidth, containerRef.current])

    const [state, setState] = useState({
        data: data,
        width: calculateWidth(),
        YBarWidth: 0,
        YMaxValue: 0,
    });

    // useEffect(() => {
    //     window.addEventListener('resize', () => {
    //         setState((old) => ({
    //             ...old,
    //             width: calculateWidth()
    //         }))
    //     })
    //
    //     return () => {
    //         window.removeEventListener('resize', () => {
    //             setState((old) => ({
    //                 ...old,
    //                 width: calculateWidth()
    //             }))
    //         })
    //     }
    // }, [calculateWidth]);

    useEffect(() => {
        if(values && values.length > 0) {
            setData(
                values.map((item: any, index: number) => ({
                    ...item,
                    timestamp: getCurrentData(new Date(item.timestamp)) + ' ' + getCurrentTime(new Date(item.timestamp))
                }))
            );
        }
    }, [values]);

    useEffect(() => {
        setState((old) => ({
            ...old,
            data: data,
            width: calculateWidth(),
            YBarWidth: 0,
            YMaxValue: 60,
        }));
    }, [data]);

    useEffect(() => {
        setState((old) => ({
            ...old,
            YBarWidth: YBarRef.current?.scrollWidth || 60,
        }));
    }, [data, YBarRef.current, state.YMaxValue])

    useEffect(() => {
        let max = 60
        data.forEach((item: any, index: number) => {
            Object.values(item).forEach((value: any, index) => {
                if(value > max && typeof value === 'number') max=value
            })
        })
        setState((old) => ({
            ...old,
            YMaxValue: max * 10,
        }));
    }, [data])

    return {...state, YBarRef, containerRef}
}
