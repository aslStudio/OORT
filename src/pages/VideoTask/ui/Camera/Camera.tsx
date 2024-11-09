import React, { useCallback, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Webcam from "react-webcam"

import styles from './Camera.module.scss'

export type CameraProps = {
    onTakeVideo: (v: Blob) => void
}

export const Camera: React.FC<CameraProps> = ({
    onTakeVideo
}) => {
    const webcamRef = useRef<Webcam | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)

    const [isRecording, setIsRecording] = useState(false)

    const onClick = (isStart: boolean) => {
        if (webcamRef.current && webcamRef.current.stream) {
            setIsRecording(isStart)
            if (isStart) {
                mediaRecorderRef.current = new MediaRecorder(
                    webcamRef.current.stream, 
                    {
                        mimeType: "video/webm"
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
                { type: 'video/webm' }
            )
            onTakeVideo(blob)
        }
    }

    return createPortal(
        <div className={styles.root}>
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
            />
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