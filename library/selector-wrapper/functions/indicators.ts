import { IIndicatorLengthResponse, IIndicatorResponse, ISelectIndicatorResponse } from "../../../types";
import { IQuantaIndicator, IQuantaQuery, IResolver } from "../types";
import { 
    indicatorsLengthFrame, 
    pagedSelectedIndicatorsFrame, 
    queryFrameIndicatorsId, 
    queryIndicators, 
    queryIndicatorsLengthFrame, 
    queryIndicatorsPageFrame, 
    setSelected
} from ".";
import { v4 } from "uuid";


const queryIndicatorsWrapper = (
    query: IQuantaQuery[], 
    addResolver: (resolver: IResolver) => void
) => {
    const promise = new Promise<IQuantaIndicator[] | undefined>((resolve, reject) => {
        let requestId = v4()
        const resolver = (val: string) => {
            clearTimeout(expire)

            try {
                let indicatorResponse: IIndicatorResponse = JSON.parse(val)
                resolve(indicatorResponse.indicators)
            } catch {
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
        queryIndicators(requestId, query)
    })

    return promise
}

const queryIndicatorsId = (
    indicatorId: string,
    addResolver: (resolver: IResolver) => void
) => {
    const promise = new Promise<IQuantaIndicator | undefined>((resolve, reject) => {
        const resolver = (val: string) => {
            clearTimeout(expire)

            try {
                let indicatorResponse: IIndicatorResponse = JSON.parse(val)
                resolve(indicatorResponse.indicator)
            } catch {
                resolve(undefined)
            }
        }

        let expire = setTimeout(() => {
            console.debug("[Selector] Id Query Request Timed out")
            resolve(undefined)
            clearTimeout(expire)
        }, 1000 * 10)

        let requestId = v4()
        let resolverObject = {
            requestId: requestId,
            resolver: resolver
        } as IResolver

        addResolver(resolverObject)
        queryFrameIndicatorsId(requestId, indicatorId)
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
            clearTimeout(expire)

            try {
                let indicatorResponse: IIndicatorResponse = JSON.parse(val)
                resolve(indicatorResponse.indicators)
            } catch {
                resolve(undefined)
            }
        }

        let expire = setTimeout(() => {
            console.debug("[Selector] Page Query Request Timed out")
            resolve(undefined)
            clearTimeout(expire)
        }, 1000 * 10)

        let requestId: string | undefined = v4()
        let resolverObject = {
            requestId: requestId,
            resolver: resolver
        } as IResolver

        addResolver(resolverObject)
        if(query === undefined)
            queryIndicatorsPageFrame(requestId, page, pageLength)
        else
            pagedSelectedIndicatorsFrame(requestId, query, page, pageLength)
    })

    return promise
}

const queryIndicatorsLength = ( query: IQuantaQuery[] | undefined, addResolver: (resolver: IResolver) => void ) => {
    const promise = new Promise<number | undefined>((resolve, reject) => {
        const resolver = (val: string) => {
            clearTimeout(expire)

            try {
                let indicatorResponse: IIndicatorLengthResponse = JSON.parse(val)
                resolve(indicatorResponse.length)
            } catch {
                resolve(undefined)
            }
        }

        let expire = setTimeout(() => {
            console.debug("[Selector] Length Query Request Timed out")
            resolve(undefined)
            clearTimeout(expire)
        }, 1000 * 10)

        let requestId: string | undefined = v4()
        let resolverObject = {
            requestId: requestId,
            resolver: resolver
        } as IResolver

        addResolver(resolverObject)
        if(query === undefined)
            indicatorsLengthFrame(requestId)
        else
            queryIndicatorsLengthFrame(requestId, query)
    })

    return promise
}

export { 
    queryIndicatorsWrapper,
    queryIndicatorsId,
    queryIndicatorsPage,
    queryIndicatorsLength
}