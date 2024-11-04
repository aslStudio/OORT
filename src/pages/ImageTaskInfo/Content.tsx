import React from "react"
import { useSelector } from "react-redux"

import { RootState } from "@/app/store"

import { ExpandTaskDetails } from "@/widgets/activeTasks"

import { ExpandTask } from "@/entities/tasks/model/types"

import { LazyImage } from "@/shared/ui/LazyImage/LazyImage"
import { Button } from "@/shared/ui"
import { RouterPathes } from "@/shared/lib/types"

import styles from './ImageTaskInfo.module.scss'

export const Content: React.FC<{
    id: ExpandTask['id']
}> = ({
    id
}) => {    
    const pool = useSelector((state: RootState) => state.expandTasks.pool)

    const taskData = pool[id]

    return (
        <div className={styles.container}>
            <h1
                className={styles.title}
            >
                {taskData.title}
            </h1>
            <LazyImage 
                className={styles['main-image']}
                src={taskData.img}
                alt="image"
                skeletonMinHeight={280}
            />
            <p className={styles.description}>{taskData.description}</p>
            <h2 className={styles['details-title']}>Task Details</h2>
            <p className={styles.details}>{taskData.details}</p>
            <ExpandTaskDetails 
                className={styles['details-card']}
                reward={taskData.reward}
                fileSize={taskData.fileSize}
                duration={taskData.duration}
            />
            <div className={styles['floating-button']}>
                <Button
                    tag="link"
                    view={'brand'}
                    isWide={true}
                    to={RouterPathes.PHOTO_TASK.replace(':id', `${id}`)}
                >
                    Start
                </Button>
            </div>
        </div>
    )
}