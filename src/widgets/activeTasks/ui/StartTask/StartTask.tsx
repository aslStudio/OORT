import React from "react"

import styles from './StartTask.module.scss'
import { FloatingButtons } from "@/shared/ui/FloatingButtons"

export type StartTaskProps = {
    PreviewComponent: React.ReactNode
    task: string
    ActionsComponent: React.ReactNode
}

const StartTaskComponent: React.FC<StartTaskProps> = ({
    task,
    PreviewComponent,
    ActionsComponent,
}) => {
    return (
        <div>
            <h1 className={styles.title}>Start Task</h1>
            {PreviewComponent}
            <h2 className={styles['details-title']}>Example</h2>
            <p className={styles.details}>{task}</p>
            <FloatingButtons
                childrenCount={2}
            >
                {ActionsComponent}
            </FloatingButtons>
        </div>
    )
}

export const StartTask = React.memo(StartTaskComponent)