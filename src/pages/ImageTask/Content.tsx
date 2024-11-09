import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Webcam from "react-webcam"

import { AppDispatch, RootState } from "@/app/store"

import { uploadPhotoResultModel } from "@/features/tasks"

import { ExpandTask } from "@/entities/tasks/model/types"

import { LazyImage } from "@/shared/ui/LazyImage/LazyImage"
import { Button } from "@/shared/ui"
import { TransitionFade } from "@/shared/ui/TransitionFade"

import { TaskResponse, Start, Verify, Camera } from './ui'
import styles from './ImageTask.module.scss'

enum Step {
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
    const [step, setStep] = useState<Step>(Step.START)

    const taskData = pool[id]

    // function onGetFile(file: File) {
    //     try {
    //         const renderer = new FileReader()
    
            // renderer.onload = (event: ProgressEvent<FileReader>) => {
            //     if (event.target?.result) {
            //         setPreview(event.target?.result as string)
            //         setValue(file)
            //         setStep(Step.VERIFY)
            //     }
            // }

    //         renderer.readAsDataURL(file)
    //     } catch (e) {
    //         alert(e)
    //     }
    // }

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
        <div className={styles.container}>
            <TransitionFade>
                {step === Step.START && (
                    <Start 
                        imageExample={taskData.exampleImg}
                        task={taskData.task}
                        onTakePhoto={onTakePhotoClick}
                        onPhotoUploaded={v => {
                            setValue(v)
                            setStep(Step.VERIFY)
                        }}  
                    />
                )}
                {step === Step.VERIFY && (
                    <Verify 
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
                        onTakePhoto={v => {
                            setValue(v)
                            setStep(Step.VERIFY)
                        }}
                    />
                )}
                {step === Step.RESPONSE && (
                    <TaskResponse 
                        award={taskData.reward}
                        refLink={'TEST REPLACE WITH MOCK'}
                    />
                )}
            </TransitionFade>
        </div>
    )
}