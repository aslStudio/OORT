import { TaskDifficult, TaskType } from "@/shared/api/enums"
import { TimeStamp } from "@/shared/lib/types"

export type ActiveTaskItem = {
    id: number
    type: TaskType
    img: string
    title: string
    description: string
    difficult: TaskDifficult
    price: number
    duration: TimeStamp
}

export type ExpandTask = {
    id: number
    title: string
    img: string
    exampleImg: string
    description: string
    task: string
    details: string
    reward: number
    fileSize: string
    duration: TimeStamp
}