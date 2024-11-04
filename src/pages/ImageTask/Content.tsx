import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/app/store";

import { ExpandTask } from "@/entities/tasks/model/types";

import styles from './ImageTask.module.scss'
import { LazyImage } from "@/shared/ui/LazyImage/LazyImage";
import { Button } from "@/shared/ui";

export const Content: React.FC<{
    id: ExpandTask['id']
}> = ({
    id
}) => {
    const pool = useSelector((state: RootState) => state.expandTasks.pool)

    const taskData = pool[id]

    function onUploadClick() {
        const input = document.createElement('input')
        input.accept = 'image/*'
        input.type = 'file'
        input.addEventListener('change', console.log)
        document.body.appendChild(input)
        input.click()
    }

    function onTackPhotoClick() {
        const input = document.createElement('input')
        input.accept = 'image/*'
        input.type = 'file'
        input.capture = 'environment'
        input.addEventListener('change', console.log)
        document.body.appendChild(input)
        input.click()
    }

    return (
        <div className={styles.container}>
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
        </div>
    )
}