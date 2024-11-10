import { getRandomInt } from '@/shared/lib/number'
import { TasksHistoryApi, GetTasksHistoryResponse } from './types'
import { TaskState } from '../enums'
import { TimeStamp } from '@/shared/lib/types'

export const tasksHistoryApi: TasksHistoryApi = {
    fetch: async ({ state }) => {
        await new Promise(resolve => setTimeout(resolve, 3_000))

        function getList() {
            let result = [] as GetTasksHistoryResponse['payload']

            if (state.includes('all')) {
                result = Array(15).fill(1).map((_, key) => ({
                    id: key,
                    award: getRandomInt(0, 2000),
                    date: new Date().getTime() as TimeStamp,
                    title: 'Rusty Red Rover Expedition',
                    state: getRandomInt(0, 2) as TaskState,
                    img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                }))
            } else {
                if (state.includes(TaskState.ACCEPTED)) {
                    result = [
                        ...result,
                        ...Array(5).fill(1).map((_, key) => ({
                            id: key,
                            award: getRandomInt(0, 2000),
                            date: new Date().getTime() as TimeStamp,
                            title: 'Rusty Red Rover Expedition',
                            state: TaskState.ACCEPTED,
                            img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                        }))
                    ]
                }
                if (state.includes(TaskState.REVIEW)) {
                    result = [
                        ...result,
                        ...Array(5).fill(1).map((_, key) => ({
                            id: key,
                            award: getRandomInt(0, 2000),
                            date: new Date().getTime() as TimeStamp,
                            title: 'Rusty Red Rover Expedition',
                            state: TaskState.REVIEW,
                            img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                        }))
                    ]
                }
                if (state.includes(TaskState.DECLINED)) {
                    result = [
                        ...result,
                        ...Array(5).fill(1).map((_, key) => ({
                            id: key,
                            award: getRandomInt(0, 2000),
                            date: new Date().getTime() as TimeStamp,
                            title: 'Rusty Red Rover Expedition',
                            state: TaskState.DECLINED,
                            img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                        }))
                    ]
                }
            }

            return result
        }

        return {
            error: false,
            payload: getList(),
        }
    }
}