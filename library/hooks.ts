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

export { 
    usePingMessage,
    useSetSchema,
    useSetSelected 
}