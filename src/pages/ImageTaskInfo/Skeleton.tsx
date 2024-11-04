import { ExpandTaskDetailsSkeleton } from '@/widgets/activeTasks'

import { TextSkeleton } from '@/shared/ui/TextSkeleton'
import { SkeletonWrapper } from '@/shared/ui/SkeletonWrapper'

import styles from './ImageTaskInfo.module.scss'

export const Skeleton = () => {
    return (
        <SkeletonWrapper className={styles.container}>
            <TextSkeleton 
                className={styles.title}
                fontSize={24}
                lineHeight={32}
                view={'base'}
                widthRange={[0.4, 0.6]}
            />
            <div 
                className={styles['main-image']}
            />
            <div className={styles.description}>
                <TextSkeleton 
                    fontSize={14}
                    lineHeight={20}
                    view={'secondary'}
                    widthRange={[0.6, 0.9]}
                />
                <TextSkeleton 
                    fontSize={14}
                    lineHeight={20}
                    view={'secondary'}
                    widthRange={[0.6, 0.9]}
                />
                <TextSkeleton 
                    fontSize={14}
                    lineHeight={20}
                    view={'secondary'}
                    widthRange={[0.6, 0.9]}
                />
                <TextSkeleton 
                    fontSize={14}
                    lineHeight={20}
                    view={'secondary'}
                    widthRange={[0.6, 0.9]}
                />
            </div>
            <TextSkeleton 
                className={styles['details-title']}
                fontSize={21}
                lineHeight={28}
                widthRange={[0.4, 0.6]}
            />
            <div className={styles.details}>
                <TextSkeleton 
                    fontSize={14}
                    lineHeight={20}
                    view={'secondary'}
                    widthRange={[0.6, 0.9]}
                />
                <TextSkeleton 
                    fontSize={14}
                    lineHeight={20}
                    view={'secondary'}
                    widthRange={[0.6, 0.9]}
                />
            </div>
            <ExpandTaskDetailsSkeleton 
                className={styles['details-card']}
            />
        </SkeletonWrapper>
    )
}