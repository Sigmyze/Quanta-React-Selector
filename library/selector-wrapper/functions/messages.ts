import { IEmitSelectedMessage, IFrameMessage, IPingMessage, ISchemaItem, ISetSchemaMessage } from "../../../types"

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

export { 
    pingMessage,
    setSchema,
    setSelected 
}