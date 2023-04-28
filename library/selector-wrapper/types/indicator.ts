import { IQuantaQuery } from "./query"

interface IQuantaIndicator {
    field?: IDatasetField,
    chartData?: IChartData
}

interface IDatasetField {
    datasetFields?: IQuantaQuery[]
}

interface IChartData {
    xValue?: number,
    yValue?: number,
    isProjection?: boolean
}

export type { 
    IQuantaIndicator,
    IDatasetField,
    IChartData
}