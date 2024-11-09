import React from "react";

import styles from './Start.module.scss'
import { LazyImage } from "@/shared/ui/LazyImage/LazyImage";
import { FloatingButtons } from "@/shared/ui/FloatingButtons";
import { Button } from "@/shared/ui";
import { useUploadFile } from "@/shared/lib/hooks/useUploadFile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { uploadPhotoResultModel } from "@/features/tasks";

export type StartProps = {
    imageExample: string
    task: string
    onTakePhoto: () => void
    onPhotoUploaded: (v: File) => void
}

const StartComponent: React.FC<StartProps> = ({
    task,
    imageExample,
    onTakePhoto,
    onPhotoUploaded,
}) => {
    const dispatch = useDispatch<AppDispatch>()

    const { onUploadClick } = useUploadFile()

    function onUploadFile(e: {
        target: {
            files: FileList | null
        }
    }) {
        try {
            if (e.target.files && e.target.files) {
                const file = e.target.files[0]
                onPhotoUploaded(file)
            }
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div>
            <h1 className={styles.title}>Start Task</h1>
            <LazyImage
                className={styles['main-image']}
                src={imageExample}
                alt="example"
                skeletonMinHeight={250}
            />
            <h2 className={styles['details-title']}>Example</h2>
            <p className={styles.details}>{task}</p>
            <FloatingButtons>
                <Button
                    view={'surface'}
                    isWide={true}
                    onClick={() => onUploadClick(
                        'image/*',
                        onUploadFile,
                    )}
                >
                    Upload Picture
                </Button>
                <Button
                    view={'surface'}
                    isWide={true}
                    onClick={onTakePhoto}
                >
                    Open Camera
                </Button>
            </FloatingButtons>
        </div>
    )
}

export const Start = React.memo(StartComponent)