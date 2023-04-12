import React from 'react'
import { ISelectorWrapperState } from '../../types'
import { useState } from 'react'
import { pingMessage, setSchema, setSelected } from './functions/messages'

const SelectorContextData = React.createContext<ISelectorWrapperState | null>(null)

interface ISelectorWrapperProps {
    children: React.ReactNode
}

const SelectorWrapper: React.FC<ISelectorWrapperProps> = ({ children }) => {    
    let value = {} as ISelectorWrapperState
    value.pingMessage = pingMessage
    value.setSchema = setSchema
    value.setSelected = setSelected
    
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