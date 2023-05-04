import { IIndicatorLengthResponse, IIndicatorResponse } from "../../../types";
import { IQuantaIndicator, IQuantaQuery, IResolver } from "../types";
import { 
    indicatorsLengthFrame, 
    pagedSelectedIndicatorsFrame, 
    queryFrameIndicatorsId, 
    queryIndicators, 
    queryIndicatorsLengthFrame, 
    queryIndicatorsPageFrame 
} from ".";


const queryIndicatorsWrapper = (
    query: IQuantaQuery[], 
    resolvers: IResolver[],
    setResolvers: (value: React.SetStateAction<IResolver[]>) => void
) => {
    const promise = new Promise<IQuantaIndicator[] | undefined>((resolve, reject) => {
        let requestId = queryIndicators(query)

        const resolver = (val: string) => {
            try {
                let indicatorResponse: IIndicatorResponse = JSON.parse(val)
                resolve(indicatorResponse.indicators)
            } catch {
                console.debug("[Selector] Error Processing Indicator Response")
                resolve(undefined)
            }
        }

        setTimeout(() => {
            console.debug("[Selector] Query Request Timed out")
            resolve(undefined)
        }, 1000 * 20)

        let resolverObject = {
            requestId: requestId,
            resolver: resolver
        } as IResolver

        setResolvers([ ...resolvers, resolverObject ])
    })

    return promise
}

const queryIndicatorsId = (
    indicatorId: string,
    resolvers: IResolver[],
    setResolvers: (value: React.SetStateAction<IResolver[]>) => void
) => {
    const promise = new Promise<IQuantaIndicator | undefined>((resolve, reject) => {
        const resolver = (val: string) => {
            try {
                let indicatorResponse: IIndicatorResponse = JSON.parse(val)
                resolve(indicatorResponse.indicator)
            } catch {
                console.debug("[Selector] Error Processing Indicator Response")
                resolve(undefined)
            }
        }

        setTimeout(() => {
            console.debug("[Selector] Query Request Timed out")
            resolve(undefined)
        }, 1000 * 20)

        let requestId = queryFrameIndicatorsId(indicatorId)
        let resolverObject = {
            requestId: requestId,
            resolver: resolver
        } as IResolver

        setResolvers([ ...resolvers, resolverObject ])
    })

    return promise
}

const queryIndicatorsPage = (
    page: number,
    pageLength: number,
    query: IQuantaQuery[] | undefined,
    resolvers: IResolver[],
    setResolvers: (value: React.SetStateAction<IResolver[]>) => void
) => {
    const promise = new Promise<IQuantaIndicator[] | undefined>((resolve, reject) => {
        const resolver = (val: string) => {
            try {
                let indicatorResponse: IIndicatorResponse = JSON.parse(val)
                resolve(indicatorResponse.indicators)
            } catch {
                console.debug("[Selector] Error Processing Indicator Response")
                resolve(undefined)
            }
        }

        setTimeout(() => {
            console.debug("[Selector] Query Request Timed out")
            resolve(undefined)
        }, 1000 * 20)

        let requestId: string | undefined = undefined
        if(query === undefined)
            requestId = queryIndicatorsPageFrame(page, pageLength)
        else
            requestId = pagedSelectedIndicatorsFrame(query, page, pageLength)

        let resolverObject = {
            requestId: requestId,
            resolver: resolver
        } as IResolver

        setResolvers([ ...resolvers, resolverObject ])
    })

    return promise
}

const queryIndicatorsLength = (
    query: IQuantaQuery[] | undefined,
    resolvers: IResolver[],
    setResolvers: (value: React.SetStateAction<IResolver[]>) => void
) => {
    const promise = new Promise<number | undefined>((resolve, reject) => {
        const resolver = (val: string) => {
            try {
                let indicatorResponse: IIndicatorLengthResponse = JSON.parse(val)
                resolve(indicatorResponse.length)
            } catch {
                console.debug("[Selector] Error Processing Indicator Response")
                resolve(undefined)
            }
        }

        setTimeout(() => {
            console.debug("[Selector] Query Request Timed out")
            resolve(undefined)
        }, 1000 * 20)

        let requestId: string | undefined = undefined
        if(query === undefined)
            requestId = indicatorsLengthFrame()
        else
            requestId = queryIndicatorsLengthFrame(query)

        let resolverObject = {
            requestId: requestId,
            resolver: resolver
        } as IResolver

        setResolvers([ ...resolvers, resolverObject ])
    })

    return promise
}

export { 
    queryIndicatorsWrapper,
    queryIndicatorsId,
    queryIndicatorsPage,
    queryIndicatorsLength 
}