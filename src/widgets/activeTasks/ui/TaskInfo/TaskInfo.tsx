import React from "react"

import { ExpandTaskDetails, ExpandTaskDetailsProps } from "../ExpandTaskDetails"

import styles from './TaskInfo.module.scss'
import { LazyImage } from "@/shared/ui/LazyImage/LazyImage"
import { FloatingButtons } from "@/shared/ui/FloatingButtons"
import { Button } from "@/shared/ui"

export type TaskInfoProps = {
    title: string
    img: string
    description: string
    details: string
    taskDetails: ExpandTaskDetailsProps
    onStart: () => void
}

const TaskInfoComponent: React.FC<TaskInfoProps> = ({
    title,
    img,
    description,
    details,
    taskDetails,
    onStart
}) => {
    return (
        <div>
            <h1
                className={styles.title}
            >
                {title}
            </h1>
            <LazyImage 
                className={styles['main-image']}
                src={img}
                alt="image"
                skeletonMinHeight={280}
            />
            <p className={styles.description}>{description}</p>
            <h2 className={styles['details-title']}>Task Details</h2>
            <p className={styles.details}>{details}</p>
            <ExpandTaskDetails 
                className={styles['details-card']}
                {...taskDetails}
            />
            <FloatingButtons>
                <Button
                    view={'brand'}
                    isWide={true}
                    onClick={onStart}
                >
                    Start
                </Button>
            </FloatingButtons>
        </div>
    )
}

export const TaskInfo = React.memo(TaskInfoComponent)