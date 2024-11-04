import React from "react";

import { PropsDefault } from "@/shared/lib/types";
import { LazyImage } from "@/shared/ui/LazyImage/LazyImage";
import { Badge, BadgeProps } from "@/shared/ui/Badge";
import { InfoCell } from "@/shared/ui/InfoCell/InfoCell";
import { formatTime } from '@/shared/lib/time'
import { ButtonIcon } from "@/shared/ui/ButtonIcon/ButtonIcon";
import { TaskDifficult, TaskType } from "@/shared/api/enums";

import { ActiveTaskItem } from "../../model/types";
import { getTaskDifficultText, getTaskTypeText } from "../../model";

import styles from './ActiveTaskCard.module.scss'

export type ActiveTaskCardProps = PropsDefault<ActiveTaskItem & {
    onClick: (id: number) => void
}>

const badgeViewByDifficult: Record<TaskDifficult, BadgeProps['view']> = {
    [TaskDifficult.DIFFICULT]: 'critical',
    [TaskDifficult.EASY]: 'success'
}

const taskTypeIconMap: Record<TaskType, BadgeProps['icon']> = {
    [TaskType.AUDIO]: 'audio',
    [TaskType.IMAGE]: 'image',
    [TaskType.VIDEO]: 'video',
}

const ActiveTaskCardComponent: React.FC<ActiveTaskCardProps> = ({
    className,
    id,
    type,
    img,
    title,
    description,
    difficult,
    price,
    duration,
    onClick
}) => {
    return (
        <div className={[
            className ? className : '',
            styles.root
        ].join(' ').trim()}>
            <div className={styles['image-wrapper']}>
                <Badge 
                    className={styles.type}
                    size={'l'}
                    view={'default'}
                    icon={taskTypeIconMap[type]}
                >
                    {getTaskTypeText(type)}
                </Badge>
                <LazyImage 
                    className={styles.image}
                    src={img}
                    alt={`${title} image`}
                    skeletonMinHeight={200}
                />
            </div>
            <div className={styles.content}>
                <div className={styles['header-wrapper']}>
                    <h3 className={styles.title}>{title}</h3>
                    <Badge
                        size={'s'}
                        view={badgeViewByDifficult[difficult]}
                    >
                        {getTaskDifficultText(difficult)}
                    </Badge>
                </div>
                <p className={styles.description}>{description}</p>
                <div className={styles.bottom}>
                    <div className={styles.inner}>
                        <InfoCell 
                            view="brand"
                            icon={'coin'}
                            title={`${price} Pts`}
                        />
                        <div 
                            className={styles.divider}
                        />
                        <InfoCell 
                            view="secondary"
                            icon={'clock'}
                            title={formatTime(duration)}
                        />
                    </div>
                    <ButtonIcon 
                        view={'brand'}
                        size={'m'}
                        radius={'rounded'}
                        icon={'chevron-right-outline'}
                        onClick={() => onClick(id)}
                    />
                </div>
            </div>
        </div>
    )
}

export const ActiveTaskCard = React.memo(ActiveTaskCardComponent)