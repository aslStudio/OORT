import React from "react";

import { PropsDefault } from "@/shared/lib/types";
import { LazyImage } from "@/shared/ui/LazyImage/LazyImage";
import { Badge } from "@/shared/ui/Badge";
import { formatDate } from "@/shared/lib/time";
import { Icon, IconProps } from "@/shared/ui";
import { TaskState } from "@/shared/api/enums";
import { Stepper, StepperProps } from "@/shared/ui/Stepper";

import { HistoryTaskItem } from '../../model'

import styles from './HistoryTaskCard.module.scss'

export type HistoryTaskCardProps = PropsDefault<HistoryTaskItem>

const iconNameMap: Record<HistoryTaskItem['state'], IconProps['name']> = {
    [TaskState.ACCEPTED]: 'checked-filled',
    [TaskState.REVIEW]: 'clock-filled',
    [TaskState.DECLINED]: 'cancel-filled',
}

const iconColorMap: Record<HistoryTaskItem['state'], NonNullable<IconProps['view']>> = {
    [TaskState.ACCEPTED]: 'success',
    [TaskState.REVIEW]: 'warning',
    [TaskState.DECLINED]: 'critical',
}

const stepperLabelMap: Record<HistoryTaskItem['state'], string> = {
    [TaskState.ACCEPTED]: 'Accepted Reward Sent',
    [TaskState.REVIEW]: 'In Review (Up to 24h)',
    [TaskState.DECLINED]: 'Declined',
}

const stepperValueMap: Record<HistoryTaskItem['state'], number> = {
    [TaskState.ACCEPTED]: 3,
    [TaskState.REVIEW]: 2,
    [TaskState.DECLINED]: 3,
}

const stepperViewMap: Record<HistoryTaskItem['state'], StepperProps['view']> = {
    [TaskState.ACCEPTED]: 'success',
    [TaskState.REVIEW]: 'warning',
    [TaskState.DECLINED]: 'critical',
}

const HistoryTaskCardComponent: React.FC<HistoryTaskCardProps> = ({
    className,
    id,
    award,
    title,
    date,
    state,
    img
}) => {
    const classes = [
        className ? className : '',
        styles.root,
    ].join(' ').trim()

    return (
        <div className={classes}>
            <div className={styles['image-wrapper']}>
                <Badge 
                    className={styles.badge}
                    size={'m'}
                    view={'brand'}
                    icon={'coin'}
                >
                    {award} Pts
                </Badge>
                <LazyImage 
                    className={styles.image}
                    src={img}
                    alt={`task-history-${id}`}
                    skeletonMinHeight={120}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <p>{formatDate(date)}</p>
                    <Icon 
                        name={iconNameMap[state]}
                        view={iconColorMap[state]}
                        size={20}
                    />
                </div>
                <p className={styles.title}>{title}</p>
                <Stepper 
                    className={styles.stepper}
                    label={stepperLabelMap[state]}
                    view={stepperViewMap[state]}
                    max={3}
                    value={stepperValueMap[state]}
                />
            </div>
        </div>
    )
}

export const HistoryTaskCard = React.memo(HistoryTaskCardComponent)