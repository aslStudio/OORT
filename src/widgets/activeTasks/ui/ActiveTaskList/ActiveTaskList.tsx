import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "@/app/store";

import { ActiveTaskCard, ActiveTaskCardSkeleton } from "@/entities/tasks";

import { PropsDefault, RouterPathes } from "@/shared/lib/types";
import { TransitionFade } from "@/shared/ui/TransitionFade";
import { SkeletonWrapper } from "@/shared/ui/SkeletonWrapper";

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

    useEffect(() => {
        console.log(isPending)
    }, [isPending])

    return (
        <div className={classes}>
            <TransitionFade>
                {!isPending && (
                    <div key={'isPending'}>
                        {list.map(item => (
                            <ActiveTaskCard 
                                key={item.id}
                                className={styles.item}
                                {...item}
                                onClick={() => {
                                    navigate(RouterPathes.PHOTO_TASK_DETAILS.replace(':id', `${item.id}`))
                                }}
                            />
                        ))}
                    </div>
                )}
                {isPending && (
                    <SkeletonWrapper key={'notIsPending'}>
                        {Array(3).fill(1).map((_, key) => (
                            <ActiveTaskCardSkeleton 
                                key={key}
                                className={styles.item}
                            />
                        ))}
                    </SkeletonWrapper>
                )}
            </TransitionFade>
        </div>
    )
}