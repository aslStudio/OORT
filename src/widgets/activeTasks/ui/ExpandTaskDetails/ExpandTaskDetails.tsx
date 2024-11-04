import React from "react";

import { PropsDefault, TimeStamp } from "@/shared/lib/types";
import { Icon, IconProps } from "@/shared/ui";

import styles from './ExpandTaskDetails.module.scss'
import { formatTime } from "@/shared/lib/time";

export type ExpandTaskDetailsProps = PropsDefault<{
    reward: number
    fileSize: string
    duration: TimeStamp
}>

const ExpandTaskDetailsComponent: React.FC<ExpandTaskDetailsProps> = ({
    className,
    reward,
    fileSize,
    duration
}) => {
    const classes = [
        className,
        styles.wrapper
    ].join(' ').trim()

    return (
        <div className={classes}>
            <Cell 
                icon={'reward'}
                title="Reward"
                value={`${reward} Pts`}
                description="You will receive your reward within 24 hours if the task is completed correctly"
            />
            <div 
                className={styles.divider}
            />
            <Cell 
                icon={'file-size'}
                title="File size"
                value={fileSize}
            />
            <div 
                className={styles.divider}
            />
            <Cell 
                icon={'duration'}
                title="Time to complete task"
                value={formatTime(duration)}
            />
        </div>
    )
}

export const ExpandTaskDetails = React.memo(ExpandTaskDetailsComponent)

const Cell: React.FC<{
    icon: IconProps['name']
    title: string
    value: string
    description?: string
}> = ({
    icon,
    title,
    value,
    description
}) => {
    return (
        <div className={styles.root}>
            <Icon 
                className={styles.icon}
                name={icon}
                size={20}
                view={'brand'}
            />
            <div>
                <p className={styles.title}>
                    <span>{title}:</span> {value}
                </p>
                {description && (
                    <p className={styles.description}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}