interface IAnalyzedState {
    [key: string]: IAnalyzedData
}

interface IAnalyzedData {
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
    stringArray?: string,

    /**
     * value if type is date and is not array
     */
    dateValue?: number,

    /**
     * value if type is date and is array
     */
    dateArray?: number[]
}

interface IResolver {
    requestId: string,
    resolver: (data: string) => void
}

export type {
    IAnalyzedData,
    IAnalyzedState,
    IResolver
}