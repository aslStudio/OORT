import { ResponseDefault, TimeStamp } from "@/shared/lib/types";
import { TaskDifficult, TaskType } from "../enums";

export type FetchActiveTasksResponse = ResponseDefault<{
    id: number
    type: TaskType
    img: string
    title: string
    description: string
    difficult: TaskDifficult
    price: number
    duration: TimeStamp
}[]>

export type FetchActiveTasksParams = TaskType | 'all'

export type ActiveTasksApi = {
    fetch: (params: FetchActiveTasksParams) => Promise<FetchActiveTasksResponse>
}