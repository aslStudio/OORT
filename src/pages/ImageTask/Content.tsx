import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { AppDispatch, RootState } from "@/app/store"

import { TaskResponse } from "@/widgets/activeTasks"

import { uploadPhotoResultModel } from "@/features/tasks"

import { ExpandTask } from "@/entities/tasks/model/types"

import { TransitionFade } from "@/shared/ui/TransitionFade"

import { Start, Verify, Camera, Info } from './ui'

enum Step {
    INFO,
    START,
    CAMERA,
    VERIFY,
    RESPONSE,
}

export const Content: React.FC<{
    id: ExpandTask['id']
}> = ({
    id
}) => {
    const pool = useSelector((state: RootState) => state.expandTasks.pool)
    const { isSuccess, errorCode } = useSelector((state: RootState) => state.uploadPhotoResult)
    const dispatch = useDispatch<AppDispatch>()

    const [value, setValue] = useState<File | null>(null)
    const [step, setStep] = useState<Step>(Step.INFO)

    const taskData = pool[id]

    function onTakePhotoClick() {
        setStep(Step.CAMERA)
    }

    function onSubmit() {
        if (value) {
            dispatch(uploadPhotoResultModel.thunks.upload({
                id,
                img: value
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
            dispatch(uploadPhotoResultModel.actions.reset())
        }
    }, [])

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
                    onTakePhoto={onTakePhotoClick}
                    onPhotoUploaded={v => {
                        setValue(v)
                        setStep(Step.VERIFY)
                    }}  
                />
            )}
            {step === Step.VERIFY && (
                <Verify 
                    key={'Verify'}
                    value={value!}
                    onPhotoUploaded={v => {
                        setValue(v)
                        setStep(Step.VERIFY)
                    }}
                    onSubmit={onSubmit}
                />
            )}
            {step === Step.CAMERA && (
                <Camera 
                    key={'Camera'}
                    onTakePhoto={v => {
                        setValue(v)
                        setStep(Step.VERIFY)
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