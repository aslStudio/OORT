import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/app/store'

import { expandTasksModel } from '@/entities/tasks'

import { TransitionFade } from '@/shared/ui/TransitionFade'
import { useTelegram } from '@/shared/lib/hooks/useTelegram'
import { images } from '@/shared/assets/images'

import { Content } from './Content'
import { Skeleton } from './Skeleton'
import styles from './ImageTaskInfo.module.scss'

export const ImageTaskInfo = () => {
    const params = useParams()

    const { isPending } = useSelector((state: RootState) => state.expandTasks)
    const dispatch = useDispatch<AppDispatch>()

    const { setHeaderColor } = useTelegram()

    useEffect(() => {
        setHeaderColor('#f7f7f8')
        dispatch(expandTasksModel.thunks.fetchExpandTask(Number(params.id)))
    }, [])

    return (
        <div className={styles.root}>
            <img 
                className={styles.image}
                src={images.Decorations.PageBgDecoration}
                alt='page decoration'
            />
            <TransitionFade>
                {!isPending && (
                    <Content 
                        id={Number(params.id)}
                    />
                )}
                {isPending && (
                    <Skeleton />
                )}
            </TransitionFade>
        </div>
    )
}