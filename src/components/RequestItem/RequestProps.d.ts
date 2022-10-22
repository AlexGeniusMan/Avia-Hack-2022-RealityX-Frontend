export type RequestProps = {
    status: RequestStatusType
    number: number,
    date: string,
}

export type RequestStatusType = 'processed' | 'cancelled' | 'in_process'
