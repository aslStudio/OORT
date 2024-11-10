import { ResponseDefault, TimeStamp } from "@/shared/lib/types"

import { TaskState } from "../enums"

export type GetTasksHistoryParams = {
    state: (TaskState | 'all')[]
}

export type GetTasksHistoryResponse = ResponseDefault<{
    id: number
    award: number
    date: TimeStamp
    title: string
    state: TaskState
    img: string
}[]>

export type TasksHistoryApi = {
    fetch: (params: GetTasksHistoryParams) => Promise<GetTasksHistoryResponse>
}