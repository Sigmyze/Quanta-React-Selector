import { ISchemaItem } from './messages'

interface ISelectorWrapperState {
    pingMessage: (sourceId: string) => void,
    setSchema: (name: string, items: ISchemaItem[]) => void,
    setSelected: (id: string, data: any) => void
}

export type { ISelectorWrapperState }
export * from './messages'