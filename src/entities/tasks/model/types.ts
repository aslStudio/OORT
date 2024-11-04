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