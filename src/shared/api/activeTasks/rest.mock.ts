import { getRandomInt } from '@/shared/lib/number'
import { TaskDifficult, TaskType } from '../enums'
import { ActiveTasksApi } from './types'
import { TimeStamp } from '@/shared/lib/types'

export const activeTaskApi: ActiveTasksApi = {
    fetch: async type => {
        await new Promise(resolve => setTimeout(resolve, 3_000))

        console.log(`fetch tasks ${type}`)

        function getList() {
            if (type === 'all') {
                return Array(5).fill(1).map((_, key) => ({
                    id: key,
                    type: getRandomInt(0, 2) as TaskType,
                    img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                    title: 'Autonomous Driving',
                    description: `Your smartphone's power helps move AI progress forward. With OORT DataHub, your device aids in processing datasets that revolutionize our world and make it a better and safer place with AI technology. Together, we're moving humanity forward.`,
                    difficult: getRandomInt(0, 1) as TaskDifficult,
                    price: getRandomInt(1_000, 10_000),
                    duration: getRandomInt(1, 5) * 60000 as TimeStamp,
                }))
            }
            if (type === TaskType.IMAGE) {
                return Array(5).fill(1).map((_, key) => ({
                    id: key,
                    type: TaskType.IMAGE,
                    img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                    title: 'Autonomous Driving',
                    description: `Your smartphone's power helps move AI progress forward. With OORT DataHub, your device aids in processing datasets that revolutionize our world and make it a better and safer place with AI technology. Together, we're moving humanity forward.`,
                    difficult: getRandomInt(0, 1) as TaskDifficult,
                    price: getRandomInt(1_000, 10_000),
                    duration: getRandomInt(1, 5) * 60000 as TimeStamp,
                }))
            }

            return []
        }

        return {
            error: false,
            payload: getList()
        }
    },
    fetchExpand: async id => {
        await new Promise(resolve => setTimeout(resolve, 3_000))

        return {
            error: false,
            payload: {
                id: Number(id),
                title: 'Autonomous Driving',
                description: `Your smartphone's power helps move AI progress forward. With OORT DataHub, your device aids in processing datasets that revolutionize our world and make it a better and safer place with AI technology. Together, we're moving humanity forward.`,
                img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                exampleImg: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                details: 'Please label the road signs, your effort will help make autonomous driving safer.',
                reward: getRandomInt(1_000, 10_000),
                fileSize: 'Up to 3MB',
                duration: getRandomInt(1, 5) * 60000 as TimeStamp,
                task: 'Please take a picture that looks similar to the example above.'
            }
        }
    },
    uploadPhotoResult: async data => {
        await new Promise(resolve => setTimeout(resolve, 3_000))

        return {
            error: false,
            payload: {
                status: true,
                errorCode: 0,
            }
        }
    }
}