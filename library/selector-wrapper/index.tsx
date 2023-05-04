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

const SelectorWrapper: React.FC<ISelectorWrapperProps> = ({ children }) => {    
    const [analysis, setAnalysis] = useState<IAnalyzedState | null>(null)
    const [resolvers, setResolvers] = useState<IResolver[]>([])
    const [receivedResponses, setReceivedResponses] = useState<IResolverResponse[]>([])

    const [receivedResponse, setReceivedResponse] = useState(false)
    const toggleReceivedResponse = () => setReceivedResponse(!receivedResponse)

    const addResponse = (resp: IResolverResponse) => {
        let nReceivedResponses = receivedResponses
        nReceivedResponses.push(resp)
        setReceivedResponses([ ...nReceivedResponses ])
        toggleReceivedResponse()
    }

    const inResolvers = (requestId: string) => {
        for(let i = 0; i < resolvers.length; i++) {
            let resolver = resolvers[i]
            if(resolver.requestId === requestId)
                return true
        }
        
        return false
    }

    const resolveHandler = (requestId: string, value: string) => {
        let resolver: IResolver | undefined = undefined
        for(let i = 0; i < resolvers.length; i++) {
            let resolver_ = resolvers[i]
            if(resolver_.requestId === requestId)
                resolver = resolver_
        }

        if(resolver === undefined)
            return

        resolver.resolver(value)
    }

    useEffect(() => {
        let nResponses = [] as IResolverResponse[]
        let resolverId = [] as string[]
        let nResolvers = [] as IResolver[]

        for(let i = 0; i < receivedResponses.length; i++) {
            let response = receivedResponses[i]
            if(inResolvers(response.requestId!)) {
                resolveHandler(response.requestId!, response.requestData!)
                resolverId.push(response.requestId!)

                continue
            }

            nResponses.push(response)
        }

        for(let i = 0; i < resolvers.length; i++) {
            let resolver = resolvers[i]
            if(resolverId.includes(resolver.requestId))
                continue

            nResolvers.push(resolver)
        }

        setReceivedResponses([ ...nResponses ])
        setResolvers([ ...nResolvers ])
    }, [receivedResponse])
    
    let value = {} as ISelectorWrapperState
    value.analysis = analysis

    value.pingMessage = pingMessage
    value.setSchema = setSchema
    value.setSelected = setSelected

    value.queryIndicators = (query: IQuantaQuery[]) => 
        queryIndicatorsWrapper(query, resolvers, setResolvers)

    value.queryIndicatorId = (indicatorId: string) =>
        queryIndicatorsId(indicatorId, resolvers, setResolvers)

    value.queryIndicatorsPaged = (page: number, pageLength: number, query?: IQuantaQuery[]) =>
        queryIndicatorsPage(page, pageLength, query, resolvers, setResolvers)

    value.queryIndicatorsLength = (query?: IQuantaQuery[]) =>
        queryIndicatorsLength(query, resolvers, setResolvers)

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
                        let analyses = parsedData.analysis
                        let nAnalyzedState = {} as IAnalyzedState

                        for(let i = 0; i < analyses.length; i++) {
                            let analysis = analyses[i]
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
                        break
                    case "queryIndicator":
                        let queryParsed: IResolverResponse = JSON.parse(parsedMessage.data)
                        if(queryParsed.requestData === undefined || queryParsed.requestId === undefined)
                            return

                        addResponse(queryParsed)
                        break
                    default:
                        break
                }
            } catch {
                console.debug('[selector]: skipping msg')
            }
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