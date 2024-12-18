import {getRandomInt} from '@/shared/lib/number'
import {TaskDifficult, TaskType} from '../enums'
import {ActiveTasksApi, FetchActiveTasksResponse} from './types'
import {TimeStamp} from '@/shared/lib/types'

const IMAGE_IDS = [0, 1, 2, 3, 5]
const VIDEO_IDS = [6, 7, 8, 9, 10]
const AUDIO_IDS = [11, 12, 13, 14, 15]

export const activeTaskApi: ActiveTasksApi = {
    fetch: async type => {
        await new Promise(resolve => setTimeout(resolve, 3_000))

        function getType(id: number) {
            if (IMAGE_IDS.includes(id)) {
                return TaskType.IMAGE
            } else if (VIDEO_IDS.includes(id)) {
                return TaskType.VIDEO
            }

            return TaskType.AUDIO
        }

        function getList() {
            let result = [] as FetchActiveTasksResponse['payload']

            if (type.includes('all')) {
                result = Array(15).fill(1).map((_, key) => ({
                    id: key,
                    type: getType(key),
                    img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                    title: 'Autonomous Driving',
                    description: `Your smartphone's power helps move AI progress forward. With OORT DataHub, your device aids in processing datasets that revolutionize our world and make it a better and safer place with AI technology. Together, we're moving humanity forward.`,
                    difficult: getRandomInt(0, 1) as TaskDifficult,
                    price: getRandomInt(1_000, 10_000),
                    time: getRandomInt(1, 5) * 60000 as TimeStamp,
                }))
            } else {
                if (type.includes(TaskType.IMAGE)) {
                    result = [
                        ...result,
                        ...Array(5).fill(1).map((_, key) => ({
                            id: IMAGE_IDS[key],
                            type: TaskType.IMAGE,
                            img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                            title: 'Autonomous Driving',
                            description: `Your smartphone's power helps move AI progress forward. With OORT DataHub, your device aids in processing datasets that revolutionize our world and make it a better and safer place with AI technology. Together, we're moving humanity forward.`,
                            difficult: getRandomInt(0, 1) as TaskDifficult,
                            price: getRandomInt(1_000, 10_000),
                            time: getRandomInt(1, 5) * 60000 as TimeStamp,
                        })),
                    ]
                }
                if (type.includes(TaskType.VIDEO)) {
                    result = [
                        ...result,
                        ...Array(5).fill(1).map((_, key) => ({
                            id: VIDEO_IDS[key],
                            type: TaskType.VIDEO,
                            img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                            title: 'Autonomous Driving',
                            description: `Your smartphone's power helps move AI progress forward. With OORT DataHub, your device aids in processing datasets that revolutionize our world and make it a better and safer place with AI technology. Together, we're moving humanity forward.`,
                            difficult: getRandomInt(0, 1) as TaskDifficult,
                            price: getRandomInt(1_000, 10_000),
                            time: getRandomInt(1, 5) * 60000 as TimeStamp,
                        })),
                    ]
                }
                if (type.includes(TaskType.AUDIO)) {
                    result = [
                        ...result,
                        ...Array(5).fill(1).map((_, key) => ({
                            id: AUDIO_IDS[key],
                            type: TaskType.AUDIO,
                            img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                            title: 'Autonomous Driving',
                            description: `Your smartphone's power helps move AI progress forward. With OORT DataHub, your device aids in processing datasets that revolutionize our world and make it a better and safer place with AI technology. Together, we're moving humanity forward.`,
                            difficult: getRandomInt(0, 1) as TaskDifficult,
                            price: getRandomInt(1_000, 10_000),
                            time: getRandomInt(1, 5) * 60000 as TimeStamp,
                        })),
                    ]
                }
            }

            return result
        }

        return {
            error: false,
            payload: getList()
        }
    },
    fetchExpand: async id => {
        await new Promise(resolve => setTimeout(resolve, 3_000))

        if (IMAGE_IDS.includes(Number(id))) {
            return {
                error: false,
                payload: {
                    id: Number(id),
                    title: 'Autonomous Driving',
                    description: `Your smartphone's power helps move AI progress forward. With OORT DataHub, your device aids in processing datasets that revolutionize our world and make it a better and safer place with AI technology. Together, we're moving humanity forward.`,
                    img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                    example: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                    details: 'Please label the road signs, your effort will help make autonomous driving safer.',
                    reward: getRandomInt(1_000, 10_000),
                    fileSize: 'Up to 3MB',
                    time: getRandomInt(1, 5) * 60000 as TimeStamp,
                    task: 'Please take a picture that looks similar to the example above.'
                }
            }
        }

        if (VIDEO_IDS.includes(Number(id))) {
            return {
                error: false,
                payload: {
                    id: Number(id),
                    title: 'Autonomous Driving',
                    description: `Your smartphone's power helps move AI progress forward. With OORT DataHub, your device aids in processing datasets that revolutionize our world and make it a better and safer place with AI technology. Together, we're moving humanity forward.`,
                    img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                    example: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    details: 'Please label the road signs, your effort will help make autonomous driving safer.',
                    reward: getRandomInt(1_000, 10_000),
                    fileSize: 'Up to 3MB',
                    time: getRandomInt(1, 5) * 60000 as TimeStamp,
                    duration: getRandomInt(1, 5) * 60000 as TimeStamp,
                    task: 'Please take a picture that looks similar to the example above.'
                }
            }
        }

        return {
            error: false,
            payload: {
                id: Number(id),
                title: 'Video introduction',
                description: `Your smartphone's power helps move AI progress forward. With OORT DataHub, your device aids in processing datasets that revolutionize our world and make it a better and safer place with AI technology. Together, we're moving humanity forward.`,
                img: 'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                example: `https://test-audio-oort.s3.eu-central-1.amazonaws.com/0788.mp3?[${new Date().getTime()}]`,
                details: 'Please label the road signs, your effort will help make autonomous driving safer.',
                reward: getRandomInt(1_000, 10_000),
                fileSize: 'Up to 3MB',
                time: getRandomInt(1, 5) * 60000 as TimeStamp,
                task: 'Please take a picture that looks similar to the example above.',
                text: 'OORT a trailblazer in Decentralized AI, Decentralized Physical Infrastructure Networks (DePIN), has just scored a major win. Microsoft has granted OORT as a follow-up to its previous grant one year ago, a clear vote of confidence in the company’s innovative vision and technology. OORT a trailblazer in Decentralized AI, Decentralized Physical Infrastructure Networks (DePIN), has just scored a major win. Microsoft has granted OORT as a follow-up to its previous grant one year ago, a clear vote of confidence in the company’s innovative vision and technology.'
            }
        }
    },
    uploadPhotoResult: async _data => {
        await new Promise(resolve => setTimeout(resolve, 3_000))

        return {
            error: false,
            payload: {
                status: true,
                errorCode: 0,
            }
        }
    },
    uploadVideoResult: async _data => {
        await new Promise(resolve => setTimeout(resolve, 3_000))

        return {
            error: false,
            payload: {
                status: true,
                errorCode: 0,
            }
        }
    },
    uploadAudioResult: async _data => {
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