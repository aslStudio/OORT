import React, { useRef } from "react"
import Webcam from "react-webcam"

import styles from './Camera.module.scss'
import { useDispatch } from "react-redux"
import { createPortal } from "react-dom"

export type CameraProps = {
    onTakePhoto: (v: File) => void
}

export const Camera: React.FC<CameraProps> = ({
    onTakePhoto
}) => {
    const dispatch = useDispatch()

    const webcamRef = useRef<Webcam | null>(null);

    function onClick() {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();

            if (imageSrc) {
                fetch(imageSrc)
                .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File(
                            [blob], 
                            'camera-photo.png', 
                            { type: 'image/png' }
                        );
                        onTakePhoto(file)
                    });
            }
        }
    }

    return createPortal(
        <div className={styles.root}>
            <Webcam
                ref={webcamRef}
                className={styles.webcam}
                width={window.innerWidth}
                height={window.innerHeight}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    facingMode: {
                        exact: 'environment'
                    }
                }}
            />
            <button 
                className={styles.button}
                onClick={onClick}
            />
        </div>,
        document.body
    )
}