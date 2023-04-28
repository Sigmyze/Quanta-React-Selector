import { IEmitSelectedMessage, IFrameMessage, IPingMessage, IQueryIndicator, ISchemaItem, ISetSchemaMessage } from "../../../types"
import { IQuantaQuery } from "../types"
import { v4 } from 'uuid'

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

const queryIndicators = (query: IQuantaQuery[]) => {
    let frameMessage = {} as IFrameMessage
    frameMessage.function = "query_indicator"

    let queryData = {} as IQueryIndicator
    queryData.requestId = v4()
    queryData.query = query
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
    queryIndicators
}