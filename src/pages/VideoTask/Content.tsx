import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store";

import { ExpandTask } from "@/entities/tasks/model/types";

import { TransitionFade } from "@/shared/ui/TransitionFade";

import { Start, Info, Camera, Verify } from './ui'
import { uploadVideoResultModel } from "@/features/tasks";
import { TaskResponse } from "@/widgets/activeTasks";

enum Step {
    INFO,
    START,
    CAMERA,
    VERIFY,
    RESPONSE
}

export const Content: React.FC<{
    id: ExpandTask['id']
}> = ({
    id
}) => {
    const pool = useSelector((state: RootState) => state.expandTasks.pool)
    const { isSuccess, errorCode } = useSelector((state: RootState) => state.uploadVideoResult)
    const dispatch = useDispatch<AppDispatch>()

    const [value, setValue] = useState<File | null>(null)
    const [step, setStep] = useState<Step>(Step.INFO)
    const [blob, setBlob] = useState<Blob | null>(null)

    const taskData = pool[id]

    function onSubmit() {
        if (value) {
            dispatch(uploadVideoResultModel.thunks.upload({
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
            dispatch(uploadVideoResultModel.actions.reset())
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
                    onTakeVideo={() => {
                        setStep(Step.CAMERA)
                    }}
                    onVideoUploaded={v => {
                        setValue(v)
                        setBlob(null)
                        setStep(Step.VERIFY)
                    }}
                />
            )}
            {step === Step.CAMERA && (
                <Camera 
                    key={'Camera'}
                    onTakeVideo={blob => {
                        const file = new File(
                            [blob], 
                            'recorded-video.webm', 
                            { type: 'video/webm' }
                        )
                        setValue(file)
                        setBlob(blob)
                        setStep(Step.VERIFY)
                    }}
                />
            )}
            {step === Step.VERIFY && (
                <Verify 
                    key={'Verify'}
                    value={value!}
                    blob={blob}
                    onVideoUploaded={v => {
                        setValue(v)
                        setBlob(null)
                        setStep(Step.VERIFY)
                    }}
                    onSubmit={onSubmit}
                />
            )}
            {step === Step.RESPONSE && (
                <TaskResponse 
                    key={'Response'}
                    award={taskData.reward}
                    story={'https://acniowa.com/wp-content/uploads/2016/03/test-image.png'}
                />
            )}
        </TransitionFade>
    )
}
