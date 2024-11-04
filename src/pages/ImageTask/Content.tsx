import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store";

import { ExpandTask } from "@/entities/tasks/model/types";

import styles from './ImageTask.module.scss'
import { LazyImage } from "@/shared/ui/LazyImage/LazyImage";
import { Button } from "@/shared/ui";
import { TransitionFade } from "@/shared/ui/TransitionFade";
import { uploadPhotoResultModel } from "@/features/tasks";
import { TaskResponse } from './ui'

export const Content: React.FC<{
    id: ExpandTask['id']
}> = ({
    id
}) => {
    const pool = useSelector((state: RootState) => state.expandTasks.pool)
    const { isPending, isSuccess, refCode } = useSelector((state: RootState) => state.uploadPhotoResult)
    const dispatch = useDispatch<AppDispatch>()

    const [value, setValue] = useState<null | string>(null)

    const taskData = pool[id]

    function onUploadFile(e: {
        target: {
            files: FileList | null
        }
    }) {
        try {
            if (e.target.files && e.target.files) {
                const file = e.target.files[0]
    
                const renderer = new FileReader()
    
                renderer.onload = (event: ProgressEvent<FileReader>) => {
                    if (event.target?.result) {
                        setValue(event.target?.result as string)   
                    }
                }
    
                renderer.readAsDataURL(file)
            }
        } catch (e) {
            alert(e)
        }
    }

    function onUploadClick() {
        const input = document.createElement('input')
        input.style.display = 'none'
        input.accept = 'image/*'
        input.type = 'file'
        //@ts-ignore
        input.addEventListener('change', onUploadFile)
        document.body.appendChild(input)
        input.click()
    }

    function onTackPhotoClick() {
        const input = document.createElement('input')
        input.style.display = 'none'
        input.accept = 'image/*'
        input.type = 'file'
        input.capture = 'environment'
        //@ts-ignores
        input.addEventListener('change', onUploadFile)
        document.body.appendChild(input)
        input.click()
    }

    function onSubmit() {
        if (value) {
            dispatch(uploadPhotoResultModel.thunks.upload({
                id,
                img: value
            }))
        }
    }

    return (
        <div className={styles.container}>
            <TransitionFade>
                {!value && !isSuccess && (
                    <>
                        <h1 className={styles.title}>Start Task</h1>
                        <LazyImage 
                            className={styles['main-image']}
                            src={taskData.exampleImg}
                            alt="example"
                            skeletonMinHeight={250}
                        />
                        <h2 className={styles['details-title']}>Example</h2>
                        <p className={styles.details}>{taskData.task}</p>
                        <div className={styles['floating-button']}>
                            <Button
                                className={styles['floating-button-item']}
                                view={'surface'}
                                isWide={true}
                                onClick={onUploadClick}
                            >
                                Upload Picture
                            </Button>
                            <Button
                                className={styles['floating-button-item']}
                                view={'surface'}
                                isWide={true}
                                onClick={onTackPhotoClick}
                            >
                                Open Camera
                            </Button>
                        </div>
                    </>
                )}
                {!!value && !isSuccess && (
                    <>
                        <h1 className={styles.title}>Verify your photo</h1>
                        <p className={styles.description}>Check if the desired element os clearly visible and image is not blurry.</p>
                        <LazyImage 
                            className={styles['main-result']}
                            src={value}
                            alt="result"
                            skeletonMinHeight={250}
                        />
                        <div className={styles['floating-button']}>
                            <Button
                                className={styles['floating-button-item']}
                                view={'surface'}
                                onClick={onUploadClick}
                            >
                                Re-upload
                            </Button>
                            <Button
                                className={styles['floating-button-item']}
                                view={'brand'}
                                isLoading={isPending}
                                onClick={onSubmit}
                            >
                                Proceed
                            </Button>
                        </div>
                    </>
                )}
                {isSuccess && (
                    <TaskResponse 
                        award={taskData.reward}
                        refLink={refCode}
                    />
                )}
            </TransitionFade>
        </div>
    )
}