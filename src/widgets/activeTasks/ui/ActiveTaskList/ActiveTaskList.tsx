import React from "react"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import {RootState} from "@/app/store"

import {ActiveTaskCard, ActiveTaskCardSkeleton} from "@/entities/tasks"
import {ActiveTaskItem} from "@/entities/tasks/model/types"

import {PropsDefault, RouterPathes} from "@/shared/lib/types"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {SkeletonWrapper} from "@/shared/ui/SkeletonWrapper"
import {TaskType} from "@/shared/api/enums"

import styles from './ActiveTaskList.module.scss'
import {LazyImage} from "@/shared/ui/LazyImage/LazyImage"
import {images} from "@/shared/assets/images"

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
        if (item.type === TaskType.AUDIO) {
            navigate(
                RouterPathes.AUDIO_TASK.replace(':id', `${item.id}`)
            )
            return
        }
    }

    return (
        <TransitionFade className={classes}>
            {!isPending && list.length && (
                <div key={'Content'}>
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
                    <p>There are no any mission yet</p>
                </div>
            )}
            {isPending && (
                <SkeletonWrapper key={'Skeleton'}>
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