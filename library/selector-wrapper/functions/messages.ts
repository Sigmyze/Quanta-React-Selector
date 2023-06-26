import { IQuantaQuery } from "../types"
import { 
    IEmitSelectedMessage, 
    IFrameMessage, 
    IPingMessage, 
    IQueryIndicator, 
    IQueryIndicatorId, 
    IQueryIndicatorPage, 
    IQueryPagedIndicators, 
    ISchemaItem, 
    ISetSchemaMessage 
} from "../../../types"

const pingMessage = (sourceId: string) => {
    let frameMessage = {} as IFrameMessage
    frameMessage.function = "ping"
    
    let pingData = {} as IPingMessage
    pingData.sourceId = sourceId
    frameMessage.data = JSON.stringify(pingData)

    window.top?.postMessage(JSON.stringify(frameMessage), '*')
}

const setSchema = (name: string, items: ISchemaItem[]) => {
    let frameMessage = {} as IFrameMessage
    frameMessage.function = "setSchema"

    let schemaData = {} as ISetSchemaMessage
    schemaData.schemaName = name
    schemaData.schemaItems = items
    frameMessage.data = JSON.stringify(schemaData)

    window.top?.postMessage(JSON.stringify(frameMessage), '*')
}

const setSelected = (id: string, data: any) => {
    let frameMessage = {} as IFrameMessage
    frameMessage.function = "selected"

    let schemaData = {} as IEmitSelectedMessage
    schemaData.id = id
    schemaData.data = data
    frameMessage.data = JSON.stringify(schemaData)

    window.top?.postMessage(JSON.stringify(frameMessage), '*')
}

const constructStringQuery = (field: string, value: string) => {
    let query = {} as IQuantaQuery
    query.fieldKey = field
    query.fieldType = "string"
    query.stringField = value

    return query
}

const constructDateQuery = (field: string, value: number) => {
    let query = {} as IQuantaQuery
    query.fieldKey = field
    query.fieldType = "date"
    query.dateField = value

    return query
}

const queryIndicators = (request_id: string, query: IQuantaQuery[]) => {
    let frameMessage = {} as IFrameMessage
    frameMessage.function = "query_indicator"

    let queryData = {} as IQueryIndicator
    queryData.requestId = request_id
    queryData.query = query
    frameMessage.data = JSON.stringify(queryData)

    window.top?.postMessage(JSON.stringify(frameMessage), '*')
    return queryData.requestId
}

const queryIndicatorsPageFrame = (requestId: string, page: number, pageLength: number) => {
    let frameMessage = {} as IFrameMessage
    frameMessage.function = "query_indicator_page"

    let queryData = {} as IQueryIndicatorPage
    queryData.requestId = requestId
    queryData.page = page
    queryData.pageLength = pageLength
    frameMessage.data = JSON.stringify(queryData)

    window.top?.postMessage(JSON.stringify(frameMessage), '*')
    return queryData.requestId
}

const queryIndicatorsLengthFrame = (requestId: string, query: IQuantaQuery[]) => {
    let frameMessage = {} as IFrameMessage
    frameMessage.function = "query_indicator_length"

    let queryData = {} as IQueryIndicator
    queryData.requestId = requestId
    queryData.query = query
    frameMessage.data = JSON.stringify(queryData)

    window.top?.postMessage(JSON.stringify(frameMessage), '*')
    return queryData.requestId
}

const indicatorsLengthFrame = (requestId: string) => {
    let frameMessage = {} as IFrameMessage
    frameMessage.function = "indicators_length"

    let queryData = {} as IQueryIndicator
    queryData.requestId = requestId
    frameMessage.data = JSON.stringify(queryData)

    window.top?.postMessage(JSON.stringify(frameMessage), '*')
    return queryData.requestId
}

const pagedSelectedIndicatorsFrame = (requestId: string, query: IQuantaQuery[], page: number, pageLength: number) => {
    let frameMessage = {} as IFrameMessage
    frameMessage.function = "query_paged_indicators"

    let queryData = {} as IQueryPagedIndicators
    queryData.requestId = requestId
    queryData.page = page
    queryData.pageLength = pageLength
    queryData.query = query
    frameMessage.data = JSON.stringify(queryData)

    window.top?.postMessage(JSON.stringify(frameMessage), '*')
    return queryData.requestId
}

const queryFrameIndicatorsId = (requestId: string, indicatorId: string) => {
    let frameMessage = {} as IFrameMessage
    frameMessage.function = "query_indicator_by_id"

    let queryData = {} as IQueryIndicatorId
    queryData.requestId = requestId
    queryData.indicatorId = indicatorId
    frameMessage.data = JSON.stringify(queryData)

    window.top?.postMessage(JSON.stringify(frameMessage), '*')
    return queryData.requestId
}

export { 
    pingMessage,
    setSchema,
    setSelected,
    constructStringQuery,
    constructDateQuery,
    queryIndicators,
    queryFrameIndicatorsId,
    queryIndicatorsPageFrame,
    pagedSelectedIndicatorsFrame,
    queryIndicatorsLengthFrame,
    indicatorsLengthFrame
}