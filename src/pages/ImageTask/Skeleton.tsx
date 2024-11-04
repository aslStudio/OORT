import { TextSkeleton } from '@/shared/ui/TextSkeleton'
import styles from './ImageTask.module.scss'
import { SkeletonWrapper } from '@/shared/ui/SkeletonWrapper'

export const Skeleton = () => (
    <SkeletonWrapper className={styles.container}>
        <TextSkeleton 
            className={styles.title}
            fontSize={24}
            lineHeight={32}
            widthRange={[0.4, 0.6]}
        />
        <div 
            className={styles['main-image']}
        />
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
    </SkeletonWrapper>
)