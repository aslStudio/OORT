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
    time: TimeStamp
}[]>

export type FetchActiveTasksParams = ('all' | TaskType)[]

export type FetchExpandTaskResponse = ResponseDefault<{
    id: number
    title: string
    img: string
    description: string
    details: string
    reward: number
    fileSize: string
    time: TimeStamp
    duration?: TimeStamp
    example: string
    task: string
}>

export type FetchExpandTaskParams = {
    id: number
}

export type UploadPhotoResponse = ResponseDefault<{
    status: boolean
    errorCode: number
}>

export type UploadPhotoParams = {
    id: number
    img: File
}

export type UploadVideoResponse = ResponseDefault<{
    status: boolean
    errorCode: number
}>

export type UploadVideoParams = {
    id: number
    img: File
}

export type ActiveTasksApi = {
    fetch: (params: FetchActiveTasksParams) => Promise<FetchActiveTasksResponse>
    fetchExpand: (params: number | string) => Promise<FetchExpandTaskResponse>
    uploadPhotoResult: (params: UploadPhotoParams) => Promise<UploadPhotoResponse>
    uploadVideoResult: (params: UploadVideoParams) => Promise<UploadVideoResponse>
}