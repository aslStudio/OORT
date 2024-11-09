import React, { useRef, useState } from "react"
import { createPortal } from "react-dom"
import Webcam from "react-webcam"

import styles from './Camera.module.scss'
import { TransitionFade } from "@/shared/ui/TransitionFade"
import { Loader } from "@/shared/ui/Loader"

export type CameraProps = {
    onTakeVideo: (v: Blob) => void
}

export const Camera: React.FC<CameraProps> = ({
    onTakeVideo
}) => {
    const webcamRef = useRef<Webcam | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)

    const [isLoading, setIsLoading] = useState(true)
    const [isRecording, setIsRecording] = useState(false)

    const onClick = (isStart: boolean) => {
        if (webcamRef.current && webcamRef.current.stream) {
            setIsRecording(isStart)
            if (isStart) {
                mediaRecorderRef.current = new MediaRecorder(
                    webcamRef.current.stream, 
                    {
                        mimeType: "video/mp4"
                    }
                )
                mediaRecorderRef.current.addEventListener(
                    'dataavailable',
                    handleDataAvailable,
                )
                
                mediaRecorderRef.current.start()
            } else {
                mediaRecorderRef.current?.stop()
            }
        }
    }

    const handleDataAvailable = ({ data }: BlobEvent) => {
        if (data.size > 0) {
            const blob = new Blob(
                [data], 
                { type: 'video/mp4' }
            )
            onTakeVideo(blob)
        }
    }

    return createPortal(
        <div 
            className={[
                styles.root,
                isLoading ? styles['is-loading'] : ''
            ].join(' ').trim()}
        >
            <Webcam 
                ref={webcamRef}
                className={styles.webcam}
                width={window.innerWidth}
                height={window.innerHeight}
                videoConstraints={{
                    facingMode: {
                        exact: 'environment'
                    }
                }}
                onUserMedia={() => {
                    setIsLoading(false)
                }}
            />
            <TransitionFade className={styles.loader}>
                {isLoading && (
                    <Loader 
                        size={'m'}
                        color={'white'}
                    />
                )}
            </TransitionFade>
            <button
                className={
                    [
                        styles.button,
                        isRecording ? styles['is-recording'] : ''
                    ].join(' ').trim()
                }
                onClick={() => {
                    onClick(!isRecording)
                }}
            />
        </div>,
        document.body
    )
}