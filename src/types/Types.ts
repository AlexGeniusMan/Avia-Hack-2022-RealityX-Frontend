import React from 'react'
import {CSSProperties} from 'react'

export interface DefaultParams{
    style?: CSSProperties;
    className?: string | string[];
}

export interface ClickableObjectMini {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
    onFocus?: (event: React.MouseEvent<HTMLElement>) => void;
    onBlur?: (event: React.MouseEvent<HTMLElement>) => void;
}

export type RequestStatusType = 'Обработано' | 'В процессе' | 'Отклонено'

export type TableMetricsDataType = {
    key: string | number
    value: number | string
    metrics: string
}

export type TableMetricsColumnsType = {
    title: string,
    key: string,
    dataIndex: string,
    render?: (value: any, row: any, index: number) => void
}

export type MetricsData = {
    CRUISE: any
    TAKEOFF: any
}
export type EngineHistoryData = {
    CRUISE: any
    TAKEOFF: any
}

export type EngineHistoryGraphData = {
    datetime: string
    value: number
}


