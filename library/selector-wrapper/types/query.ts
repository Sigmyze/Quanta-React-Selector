interface IQuantaQuery {
    fieldKey?: string,
    fieldType?: string,
    stringField?: string,
    dateField?: number
}

interface IGetIndicatorResponse {
    indicators?: IQuantaQuery[]
}

export type { 
    IQuantaQuery,
    IGetIndicatorResponse 
}