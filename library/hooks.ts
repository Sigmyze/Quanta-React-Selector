import { useContext } from "react"
import { SelectorContextData } from "./selector-wrapper"
import { ISelectorWrapperState } from "../types"

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
    return analysis
}

export { 
    usePingMessage,
    useSetSchema,
    useSetSelected,
    useQueryIndicators,
    useAnalysis,
    useQueryIndicatorId,
    useIndicatorsPaged,
    useIndicatorsLength
}