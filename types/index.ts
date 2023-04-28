import { IQuantaIndicator, IQuantaQuery } from '../library/selector-wrapper/types'
import { IAnalyzedState } from '../library/selector-wrapper/types/state'
import { ISchemaItem } from './messages'

interface ISelectorWrapperState {
    analysis: IAnalyzedState | null,

    pingMessage: (sourceId: string) => void,
    setSchema: (name: string, items: ISchemaItem[]) => void,
    setSelected: (id: string, data: any) => void,

    queryIndicators: (query: IQuantaQuery[]) => Promise<IQuantaIndicator[] | undefined>
}

export type { ISelectorWrapperState }
export * from './messages'
export * from '../library/selector-wrapper/types'