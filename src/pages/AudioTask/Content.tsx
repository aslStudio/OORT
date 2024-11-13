import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch, RootState} from "@/app/store"

import {TaskResponse} from "@/widgets/activeTasks"

import {uploadAudioResultModel} from "@/features/tasks"

import {ExpandTask} from "@/entities/tasks/model/types"

import {TransitionFade} from "@/shared/ui/TransitionFade"

import { Info, Start } from './ui'

enum Step {
    INFO,
    START,
    RESPONSE
}

export const Content: React.FC<{
    id: ExpandTask['id']
}> = ({
    id
}) => {
    const pool = useSelector((state: RootState) => state.expandTasks.pool)
    const { isSuccess, errorCode, isPending, } = useSelector((state: RootState) => state.uploadAudioResult)
    const dispatch = useDispatch<AppDispatch>()

    const [step, setStep] = useState<Step>(Step.INFO)

    const taskData = pool[id]

    function onSubmit(value: File) {
        if (value) {
            dispatch(uploadAudioResultModel.thunks.upload({
                id,
                audio: value,
            }))
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setStep(Step.RESPONSE)
        }
    }, [isSuccess])

    useEffect(() => {
        // here will be error handler
    }, [errorCode])

    useEffect(() => {
        return () => {
            dispatch(uploadAudioResultModel.actions.reset())
        }
    }, []);

    return (
        <TransitionFade>
            {step === Step.INFO && (
                <Info
                    key={'Info'}
                    id={id}
                    onStart={() => {
                        setStep(Step.START)
                    }}
                />
            )}
            {step === Step.START && (
                <Start
                    key={'Start'}
                    id={id}
                    isLoading={isPending}
                    onSubmit={v => {
                        console.log("Content onSubmit", v)
                        onSubmit(v)
                    }}
                />
            )}
            {step === Step.RESPONSE && (
                <TaskResponse
                    key={'Response'}
                    award={taskData.reward}
                />
            )}
        </TransitionFade>
    )
}