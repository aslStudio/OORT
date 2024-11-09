import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { RootState } from "@/app/store"

import { LazyImage } from "@/shared/ui/LazyImage/LazyImage"
import { FloatingButtons } from "@/shared/ui/FloatingButtons"
import { Button } from "@/shared/ui"
import { useUploadFile } from "@/shared/lib/hooks/useUploadFile"

import styles from './Verify.module.scss'

export type VerifyProps = {
    value: File
    onSubmit: () => void
    onPhotoUploaded: (v: File) => void
}

const VerifyComponent: React.FC<VerifyProps> = ({
    value,
    onPhotoUploaded,
    onSubmit
}) => {
    const { isPending } = useSelector((state: RootState) => state.uploadPhotoResult)

    const { onUploadClick } = useUploadFile()

    const [preview, setPreview] = useState('')

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

    useEffect(() => {
        const renderer = new FileReader()

        renderer.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target?.result) {
                setPreview(event.target?.result as string)
            }
        }

        renderer.readAsDataURL(value)
    }, [value])

    return (
        <div>
            <h1 className={styles.title}>Verify your photo</h1>
            <p className={styles.description}>Check if the desired element os clearly visible and image is not blurry.</p>
            <LazyImage 
                className={styles['main-result']}
                src={preview}
                alt="result"
                skeletonMinHeight={250}
            />
            <FloatingButtons>
                <Button
                    view={'surface'}
                    isWide={true}
                    onClick={() => onUploadClick(
                        'image/*',
                        onUploadFile,
                    )}
                >
                    Re-upload
                </Button>
                <Button
                    view={'brand'}
                    isLoading={isPending}
                    isWide={true}
                    onClick={onSubmit}
                >
                    Proceed
                </Button>
            </FloatingButtons>
        </div>
    )
}

export const Verify = React.memo(VerifyComponent)