import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

import { HistoryTaskCard, HistoryTaskCardSkeleton } from '@/entities/history'

import { PropsDefault } from '@/shared/lib/types'
import { SkeletonWrapper } from '@/shared/ui/SkeletonWrapper'
import { TransitionFade } from '@/shared/ui/TransitionFade'
import { LazyImage } from '@/shared/ui/LazyImage/LazyImage'
import { images } from '@/shared/assets/images'

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
            {!isPending && list.length && (
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
            {!isPending && !list.length && (
                <div 
                    key={'Empty'}
                    className={styles.empty}    
                >
                    <LazyImage 
                        className={styles.image}
                        src={images.Decorations.Empty}
                        alt={'empty'}
                        skeletonMinHeight={160}
                    />
                    <p>You haven't completed any missions yet.</p>
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