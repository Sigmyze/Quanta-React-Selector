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
    addResolver: (resolver: IResolver) => void
) => {
    const promise = new Promise<IQuantaIndicator[] | undefined>((resolve, reject) => {
        let requestId = queryIndicators(query)

        const resolver = (val: string) => {
            try {
                let indicatorResponse: IIndicatorResponse = JSON.parse(val)
                console.debug(`[Selector]: Recv ${indicatorResponse.indicators?.length} indicators`)
                clearTimeout(expire)
                resolve(indicatorResponse.indicators)
            } catch {
                console.debug("[Selector] Error Processing Indicator Response")
                resolve(undefined)
            }
        }

        let expire = setTimeout(() => {
            console.debug("[Selector] Wrapper Query Request Timed out")
            resolve(undefined)
            clearTimeout(expire)
        }, 1000 * 10)

        let resolverObject = {
            requestId: requestId,
            resolver: resolver
        } as IResolver

        addResolver(resolverObject)
    })

    return promise
}

const queryIndicatorsId = (
    indicatorId: string,
    addResolver: (resolver: IResolver) => void
) => {
    const promise = new Promise<IQuantaIndicator | undefined>((resolve, reject) => {
        const resolver = (val: string) => {
            try {
                let indicatorResponse: IIndicatorResponse = JSON.parse(val)
                console.debug(`[Selector]: Recv indicator with id ${indicatorResponse.indicator?.indicatorId}`)
                clearTimeout(expire)
                resolve(indicatorResponse.indicator)
            } catch {
                console.debug("[Selector] Error Processing Indicator Response")
                resolve(undefined)
            }
        }

        let expire = setTimeout(() => {
            console.debug("[Selector] Id Query Request Timed out")
            resolve(undefined)
            clearTimeout(expire)
        }, 1000 * 10)

        let requestId = queryFrameIndicatorsId(indicatorId)
        let resolverObject = {
            requestId: requestId,
            resolver: resolver
        } as IResolver

        addResolver(resolverObject)
    })

    return promise
}

const queryIndicatorsPage = (
    page: number,
    pageLength: number,
    query: IQuantaQuery[] | undefined,
    addResolver: (resolver: IResolver) => void
) => {
    const promise = new Promise<IQuantaIndicator[] | undefined>((resolve, reject) => {
        const resolver = (val: string) => {
            try {
                let indicatorResponse: IIndicatorResponse = JSON.parse(val)
                console.debug(`[Selector]: Recv ${indicatorResponse.indicators?.length} indicators`)
                clearTimeout(expire)
                resolve(indicatorResponse.indicators)
            } catch {
                console.debug("[Selector] Error Processing Indicator Response")
                resolve(undefined)
            }
        }

        let expire = setTimeout(() => {
            console.debug("[Selector] Page Query Request Timed out")
            resolve(undefined)
            clearTimeout(expire)
        }, 1000 * 10)

        let requestId: string | undefined = undefined
        if(query === undefined)
            requestId = queryIndicatorsPageFrame(page, pageLength)
        else
            requestId = pagedSelectedIndicatorsFrame(query, page, pageLength)

        let resolverObject = {
            requestId: requestId,
            resolver: resolver
        } as IResolver

        addResolver(resolverObject)
    })

    return promise
}

const queryIndicatorsLength = ( query: IQuantaQuery[] | undefined, addResolver: (resolver: IResolver) => void ) => {
    const promise = new Promise<number | undefined>((resolve, reject) => {
        const resolver = (val: string) => {
            try {
                let indicatorResponse: IIndicatorLengthResponse = JSON.parse(val)
                console.debug(`[Selector]: Recv len ${indicatorResponse.length}`)
                clearTimeout(expire)
                resolve(indicatorResponse.length)
            } catch {
                console.debug("[Selector] Error Processing Indicator Response")
                resolve(undefined)
            }
        }

        let expire = setTimeout(() => {
            console.debug("[Selector] Length Query Request Timed out")
            resolve(undefined)
            clearTimeout(expire)
        }, 1000 * 10)

        let requestId: string | undefined = undefined
        if(query === undefined)
            requestId = indicatorsLengthFrame()
        else
            requestId = queryIndicatorsLengthFrame(query)

        let resolverObject = {
            requestId: requestId,
            resolver: resolver
        } as IResolver

        addResolver(resolverObject)
    })

    return promise
}

export { 
    queryIndicatorsWrapper,
    queryIndicatorsId,
    queryIndicatorsPage,
    queryIndicatorsLength 
}