import React, { useCallback, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Webcam from "react-webcam"

import styles from './Camera.module.scss'

export type CameraProps = {
    onTakeVideo: (v: File) => void
}

export const Camera: React.FC<CameraProps> = ({
    onTakeVideo
}) => {
    const webcamRef = useRef<Webcam | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)

    const [isRecording, setIsRecording] = useState(false)
    const [recordedChunks, setRecordedChunks] = useState<BlobEvent['data'][]>([]);

    const onClick = useCallback((isStart: boolean) => {
        setIsRecording(isStart)
        if (webcamRef.current && webcamRef.current.stream) {
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

                if (recordedChunks.length) {
                    const blob = new Blob(
                        recordedChunks, 
                        { type: 'video/webm' }
                    )
                    const file = new File(
                        [blob], 
                        'recorded-video.webm', 
                        { type: 'video/webm' }
                    )
                    onTakeVideo(file)
                }
            }
        }
    }, [isRecording, recordedChunks])

    const handleDataAvailable = useCallback(
        ({ data }: BlobEvent) => {
          if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
          }
        },
        [setRecordedChunks]
      );

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