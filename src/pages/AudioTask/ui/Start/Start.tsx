import { RootState } from "@/app/store";
import { ExpandTask } from "@/entities/tasks/model/types";
import { AudioPlayer } from "@/shared/ui/AudioPlayer";
import { AudioRecorder } from "@/shared/ui/AudioRecorder";
import { TransitionFade } from "@/shared/ui/TransitionFade";
import { StartTask } from "@/widgets/activeTasks";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export type StartProps = {
    id: ExpandTask['id']
    isLoading: boolean
    onSubmit: () => void
}

enum State {
    PREVIEW,
    RECORDER
}

export const Start: React.FC<StartProps> = ({
    id,
    isLoading,
    onSubmit
}) => {
    const pool = useSelector((state: RootState) => state.expandTasks.pool)

    const [state, setState] = useState(State.PREVIEW)

    const taskData = pool[id]

    return (
        <StartTask
            PreviewComponent={(
                <TransitionFade>
                    {state === State.PREVIEW && (
                        <AudioPlayer 
                            key={'State.PREVIEW'}
                            src={taskData.example}
                        />
                    )}
                    {state === State.RECORDER && (
                        <></>
                    )}
                </TransitionFade>
            )}
            task={state === State.PREVIEW ? taskData.task : undefined}
            ActionsComponent={(
                <AudioRecorder 
                    isLoading={isLoading}
                    onSubmit={onSubmit}
                    onStartRecorder={() => {
                        setState(State.RECORDER)
                    }}
                />
            )}
        />
    )
}