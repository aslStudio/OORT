import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { RootState } from "@/app/store"

import { ActiveTaskCard, ActiveTaskCardSkeleton, expandTasksModel } from "@/entities/tasks"
import { ActiveTaskItem } from "@/entities/tasks/model/types"

import { PropsDefault, RouterPathes } from "@/shared/lib/types"
import { TransitionFade } from "@/shared/ui/TransitionFade"
import { SkeletonWrapper } from "@/shared/ui/SkeletonWrapper"
import { TaskType } from "@/shared/api/enums"

import styles from './ActiveTaskList.module.scss'

export const ActiveTaskList: React.FC<PropsDefault> = ({
    className
}) => {
    const navigate = useNavigate()

    const { 
        list, 
        isPending 
    } = useSelector((state: RootState) => state.activeTasks)

    const classes = [
        className ? className : '',
        styles.root,
    ].join(' ').trim()

    function onClick(item: ActiveTaskItem) {
        if (item.type === TaskType.IMAGE) {
            navigate(
                RouterPathes.PHOTO_TASK.replace(':id', `${item.id}`)
            )
            return
        }
        if (item.type === TaskType.VIDEO) {
            navigate(
                RouterPathes.VIDEO_TASK.replace(':id', `${item.id}`)
            )
            return
        }
    }

    return (
        <TransitionFade className={classes}>
            {!isPending && (
                <div key={'notIsPending'}>
                    {list.map(item => (
                        <ActiveTaskCard 
                            key={item.id}
                            className={styles.item}
                            {...item}
                            onClick={() => onClick(item)}
                        />
                    ))}
                </div>
            )}
            {isPending && (
                <SkeletonWrapper key={'isPending'}>
                    {Array(3).fill(1).map((_, key) => (
                        <ActiveTaskCardSkeleton 
                            key={key}
                            className={styles.item}
                        />
                    ))}
                </SkeletonWrapper>
            )}
        </TransitionFade>
    )
}