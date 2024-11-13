import React, { useRef, useState } from "react"
import { createPortal } from "react-dom"
import Webcam from "react-webcam"

import styles from './Camera.module.scss'
import {TransitionFade} from "@/shared/ui/TransitionFade";
import {Loader} from "@/shared/ui/Loader";

export type CameraProps = {
    onTakePhoto: (v: File) => void
}

export const Camera: React.FC<CameraProps> = ({
    onTakePhoto
}) => {
    const webcamRef = useRef<Webcam | null>(null);

    const [isLoading, setIsLoading] = useState(true)

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
                audio={false}
                screenshotFormat="image/jpeg"
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
                className={styles.button}
                onClick={onClick}
            />
        </div>,
        document.body
    )
}