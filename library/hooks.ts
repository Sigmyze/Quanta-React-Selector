import { useContext } from "react"
import { SelectorContextData } from "./selector-wrapper"
import { ISelectorWrapperState } from "../types"

const objectCopy = (object: any): any => {
    return JSON.parse(JSON.stringify(object))
}

const usePingMessage = () => {
    const { pingMessage } = useContext(SelectorContextData) as ISelectorWrapperState
    return pingMessage
}

const useSetSchema = () => {
    const { setSchema } = useContext(SelectorContextData) as ISelectorWrapperState
    return setSchema
}

const useSetSelected = () => {
    const { setSelected } = useContext(SelectorContextData) as ISelectorWrapperState
    return setSelected
}

const useQueryIndicators = () => {
    const { queryIndicators } = useContext(SelectorContextData) as ISelectorWrapperState
    return queryIndicators
}

const useQueryIndicatorId = () => {
    const { queryIndicatorId } = useContext(SelectorContextData) as ISelectorWrapperState
    return queryIndicatorId
}

const useIndicatorsPaged = () => {
    const { queryIndicatorsPaged } = useContext(SelectorContextData) as ISelectorWrapperState
    return queryIndicatorsPaged
}

const useIndicatorsLength = () => {
    const { queryIndicatorsLength } = useContext(SelectorContextData) as ISelectorWrapperState
    return queryIndicatorsLength
}

const useAnalysis = () => {
    const { analysis } = useContext(SelectorContextData) as ISelectorWrapperState
    return objectCopy(analysis)
}

const useAnalysisUpdated = () => {
    const { analysisUpdated } = useContext(SelectorContextData) as ISelectorWrapperState
    return analysisUpdated
}   

const useFormatString = () => {
    const { formatString } = useContext(SelectorContextData) as ISelectorWrapperState
    return formatString
}

const useFormatStringRAW = () => {
    const { formatStringRAW } = useContext(SelectorContextData) as ISelectorWrapperState
    return formatStringRAW
}

export { 
    usePingMessage,
    useSetSchema,
    useSetSelected,
    useQueryIndicators,
    useAnalysis,
    useQueryIndicatorId,
    useIndicatorsPaged,
    useIndicatorsLength,
    useAnalysisUpdated,
    useFormatString,
    useFormatStringRAW
}