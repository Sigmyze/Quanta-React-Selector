import { IQuantaIndicator, IQuantaQuery } from '../library/selector-wrapper/types'
import { IAnalyzedState } from '../library/selector-wrapper/types/state'
import { ISchemaItem } from './messages'

interface ISelectorWrapperState {
    analysis: IAnalyzedState | null,
    analysisUpdated: boolean,

    pingMessage: (sourceId: string) => void,
    setSchema: (name: string, items: ISchemaItem[]) => void,
    setSelected: (id: string, data: any) => void,

    //gets indicators from server based on query parameters
    queryIndicators: (query: IQuantaQuery[]) => Promise<IQuantaIndicator[] | undefined>,
    //queries an indicator by its indicator id
    queryIndicatorId: (indicatorId: string) => Promise<IQuantaIndicator | undefined>,
    //queries a paged set of indicators
    queryIndicatorsPaged: (page: number, pageLength: number, query?: IQuantaQuery[]) => Promise<IQuantaIndicator[] | undefined>,
    //queries the length of indicators
    queryIndicatorsLength: (query?: IQuantaQuery[]) => Promise<number | undefined>
}

export type { ISelectorWrapperState }
export * from './messages'
export * from '../library/selector-wrapper/types'