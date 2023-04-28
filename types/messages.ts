import { IQuantaIndicator, IQuantaQuery } from "../library/selector-wrapper/types"

//communicates with the sigmyze platform using iframe messaging
interface IFrameMessage {
    function: string // what function within the platform we want to execute
    data: string
}

interface IPingMessage {
    sourceId: string
}

interface ISetSchemaMessage {
    schemaName: string,
    schemaItems: ISchemaItem[]
}

interface ISchemaItem {
    name: string,
    type: "string" | "date"
}

interface IEmitSelectedMessage {
    id: string,
    data: any
}

interface IQueryIndicator {
    requestId: string,
    query: IQuantaQuery[]
}

interface IResolverResponse {
    requestId?: string,
    requestData?: string
}

interface IIndicatorResponse {
    indicators?: IQuantaIndicator[]
}

export type {
    IFrameMessage,
    IPingMessage,
    ISetSchemaMessage,
    ISchemaItem,
    IEmitSelectedMessage,
    IQueryIndicator,
    IResolverResponse,
    IIndicatorResponse
}