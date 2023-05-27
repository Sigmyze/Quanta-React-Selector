import React, { useEffect } from 'react'
import { IResolverResponse, ISelectorWrapperState } from '../../types'
import { useState } from 'react'
import { pingMessage, setSchema, setSelected } from './functions/messages'
import { IIFrameMessage, IPipelineMessage , IQuantaQuery } from './types'
import { IAnalyzedData, IAnalyzedState, IResolver } from './types/state'
import { queryIndicatorsId, queryIndicatorsLength, queryIndicatorsPage, queryIndicatorsWrapper } from './functions'

const SelectorContextData = React.createContext<ISelectorWrapperState | null>(null)

interface ISelectorWrapperProps {
    children: React.ReactNode
}

interface IMessage {
    requestId: string, 
    requestData: string
}

const SelectorWrapper: React.FC<ISelectorWrapperProps> = ({ children }) => {    
    const [analysis, setAnalysis] = useState<IAnalyzedState | null>(null)
    const [analysisUpdated, setAnalysisUpdated] = useState(false)
    const toggleAnalysisUpdated = () => setAnalysisUpdated(!analysisUpdated)

    const [resolvers, setResolvers] = useState<IResolver[]>([])

    const addResolver = (resolver: IResolver) => {
        let nResolvers = resolvers
        nResolvers.push(resolver)

        setResolvers([ ...nResolvers ])
    }
    
    const handleMessage = (message: IMessage) => {
        for(let i = 0; i < resolvers.length; i++) {
            let resolver = resolvers[i]
            console.log(message.requestData)
            if(resolver.requestId === message.requestId)
                resolver.resolver(message.requestData)
        }
    }
    
    let value = {} as ISelectorWrapperState
    value.analysis = analysis
    value.analysisUpdated = analysisUpdated

    value.pingMessage = pingMessage
    value.setSchema = setSchema
    value.setSelected = setSelected

    value.queryIndicators = (query: IQuantaQuery[]) => 
        queryIndicatorsWrapper(query, addResolver)

    value.queryIndicatorId = (indicatorId: string) =>
        queryIndicatorsId(indicatorId, addResolver)

    value.queryIndicatorsPaged = (page: number, pageLength: number, query?: IQuantaQuery[]) =>
        queryIndicatorsPage(page, pageLength, query, addResolver)

    value.queryIndicatorsLength = (query?: IQuantaQuery[]) =>
        queryIndicatorsLength(query, addResolver)

    useEffect(() => {
        //set up the listener
        const handler = (event: MessageEvent<any>) => {
            try {
                let parsedMessage: IIFrameMessage = JSON.parse(event.data)
                if(parsedMessage.data === undefined || parsedMessage.function === undefined)
                    return

                let func = parsedMessage.function
                switch (func) {
                    case "pipeline":
                        let parsedData: IPipelineMessage = JSON.parse(parsedMessage.data)
                        let analysess = parsedData.analysis
                        let nAnalyzedState = analysis
                        if(nAnalyzedState === null)
                            nAnalyzedState = {}
                        
                        for(let i = 0; i < analysess.length; i++) {
                            let analysis = analysess[i]
                            let objectId = analysis.objectId
                            let analyzedData = {} as IAnalyzedData

                            analyzedData = {
                                objectType: analysis.objectType,
                                isArray: analysis.isArray,
                                stringValue: analysis.stringValue,
                                stringArray: analysis.stringArray,
                                dateValue: analysis.dateValue,
                                dateArray: analysis.dateArray
                            }

                            nAnalyzedState[objectId] = analyzedData
                        }

                        setAnalysis({ ...nAnalyzedState })
                        toggleAnalysisUpdated()
                        break
                    case "queryIndicator":
                        if(parsedMessage.data === undefined)
                            return

                        let parsed: IMessage = JSON.parse(parsedMessage.data)
                        handleMessage(parsed)
                        break
                    default:
                        break
                }
            } catch { }
        }

        window.addEventListener("message", handler)

        return () => window.removeEventListener("message", handler)
    }, [])
    
    return (
        <>
            <SelectorContextData.Provider value={value}>
                {children}
            </SelectorContextData.Provider>
        </>
    )
}

export { SelectorContextData }
export default SelectorWrapper