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

export type FetchExpandTaskResponse = ResponseDefault<{
    id: number
    title: string
    img: string
    description: string
    details: string
    reward: number
    fileSize: string
    duration: TimeStamp
    exampleImg: string
    task: string
}>

export type FetchExpandTaskParams = {
    id: number
}

export type UploadPhotoResponse = ResponseDefault<{
    refLink: string
}>

export type UploadPhotoParams = {
    id: number
    img: string
}

export type ActiveTasksApi = {
    fetch: (params: FetchActiveTasksParams) => Promise<FetchActiveTasksResponse>
    fetchExpand: (params: FetchActiveTasksParams) => Promise<FetchExpandTaskResponse>
    uploadPhotoResult: (params: UploadPhotoParams) => Promise<UploadPhotoResponse>
}