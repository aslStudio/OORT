import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store";

import { ActiveTaskCard, ActiveTaskCardSkeleton, activeTasksModel } from "@/entities/tasks";

import { PropsDefault } from "@/shared/lib/types";
import { TransitionFade } from "@/shared/ui/TransitionFade";

import styles from './ActiveTaskList.module.scss'
import { SkeletonWrapper } from "@/shared/ui/SkeletonWrapper";

export const ActiveTaskList: React.FC<PropsDefault> = ({
    className
}) => {
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
                                onClick={() => {}}
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