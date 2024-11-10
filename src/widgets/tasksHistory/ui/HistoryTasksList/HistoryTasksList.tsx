import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

import { HistoryTaskCard, HistoryTaskCardSkeleton } from '@/entities/history'

import { PropsDefault } from '@/shared/lib/types'
import { SkeletonWrapper } from '@/shared/ui/SkeletonWrapper'
import { TransitionFade } from '@/shared/ui/TransitionFade'

import styles from './HistoryTasksList.module.scss'

export const HistoryTasksList: React.FC<PropsDefault> = ({
    className
}) =>  {
    const {
        list,
        isPending
    } = useSelector((state: RootState) => state.historyTasks)

    const classes = [
        className ? className : '',
        styles.root,
    ].join(' ').trim()

    return (
        <TransitionFade className={classes}>
            {!isPending && (
                <div key={'notIsPending'}>
                    {list.map(item => (
                        <HistoryTaskCard 
                            key={item.id}
                            className={styles.item}
                            {...item}
                        />
                    ))}
                </div>
            )}
            {isPending && (
                <SkeletonWrapper key={'isPending'}>
                    {Array(3).fill(1).map((_, key) => (
                        <HistoryTaskCardSkeleton 
                            key={key}
                            className={styles.item}
                        />
                    ))}
                </SkeletonWrapper>
            )}
        </TransitionFade>
    )
}