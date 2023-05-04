interface IIFrameMessage {
    function?: string,
    data?: string
}

interface IPipelineMessage {
    analysis: IPipelineAnalysis[]
}

interface IPipelineAnalysis {
    /**
     * the id of the object being statically analyzed
     */
    objectId: string,

    /**
     * the type of the object
     * only can be string or date
     */
    objectType?: "string" | "date",

    /**
     * whether or not the analyzed field returns an array or not
     */
    isArray?: boolean,

    /**
     * value if type is string and is not array
     */
    stringValue?: string,

    /**
     * value if type is string and is array
     */
    stringArray?: string[],

    /**
     * value if type is date and is not array
     */
    dateValue?: number,

    /**
     * value if type is date and is array
     */
    dateArray?: number[]
}

export * from './query'
export * from './state'
export * from './indicator'

export type { 
    IIFrameMessage,
    IPipelineMessage,
    IPipelineAnalysis 
}