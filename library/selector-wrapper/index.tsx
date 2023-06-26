import React, { useCallback, useEffect, useRef } from 'react'
import { ISelectorWrapperState } from '../../types'
import { useState } from 'react'
import { pingMessage, setSchema, setSelected } from './functions/messages'
import { IIFrameMessage, IPipelineMessage , IQuantaIndicator, IQuantaQuery } from './types'
import { IAnalyzedData, IAnalyzedState, IResolver } from './types/state'
import { 
    formatString, 
    formatStringRAW, 
    queryIndicatorsId, 
    queryIndicatorsLength, 
    queryIndicatorsPage, 
    queryIndicatorsWrapper 
} from './functions'

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

    const refsolvers = useRef<IResolver[] | null>(null)

    const addResolver = (resolver: IResolver) => {
        if(refsolvers.current === null)
            return

        let nResolvers = refsolvers.current
        nResolvers.push(resolver)
        refsolvers.current = nResolvers
    }
    
    const handleMessage = (message: IMessage) => {
        if(refsolvers.current === null)
            return

        let nResolvers = [] as IResolver[]
        for(let i = 0; i < refsolvers.current.length; i++) {
            let resolver = refsolvers.current[i]
            if(resolver.requestId === message.requestId) {
                resolver.resolver(message.requestData)
                continue
            }

            nResolvers.push(resolver)
        }

        refsolvers.current = nResolvers
    }
    
    let value = {} as ISelectorWrapperState
    value.analysis = analysis
    value.analysisUpdated = analysisUpdated

    value.pingMessage = pingMessage
    value.setSchema = setSchema
    value.setSelected = setSelected

    //setup the function callbacks for better performanec
    const queryIndicatorsCallback = useCallback((query: IQuantaQuery[]) => {
        return queryIndicatorsWrapper(query, addResolver)
    }, [])

    const queryIndicatorIdCallback = useCallback((indicatorId: string) => {
        return queryIndicatorsId(indicatorId, addResolver)
    }, [])

    const queryIndicatorsPageCallback = useCallback((page: number, pageLength: number, query?: IQuantaQuery[]) => {
        return queryIndicatorsPage(page, pageLength, query, addResolver)
    }, [])

    const queryIndicatorsLengthCallback = useCallback((query?: IQuantaQuery[]) => {
        return queryIndicatorsLength(query, addResolver)
    }, [])

    const formatStringCallback = useCallback((key: string, indicator: IQuantaIndicator) => {
        return formatString(key, indicator, analysis)
    }, [analysis])

    const formatStringRAWCalback = useCallback((val: string, indicator: IQuantaIndicator) => {
        return formatStringRAW(val, indicator)
    }, [])

    value.queryIndicators = queryIndicatorsCallback
    value.queryIndicatorId = queryIndicatorIdCallback
    value.queryIndicatorsPaged = queryIndicatorsPageCallback
    value.queryIndicatorsLength = queryIndicatorsLengthCallback
    value.formatString = formatStringCallback
    value.formatStringRAW = formatStringRAWCalback

    useEffect(() => {
        //set up the listener
        refsolvers.current = []
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