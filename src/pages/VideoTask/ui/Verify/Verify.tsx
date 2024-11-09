import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { RootState } from "@/app/store"

import { useUploadFile } from "@/shared/lib/hooks/useUploadFile"
import { VerifyTask } from "@/widgets/activeTasks"
import { VideoPlayer } from "@/shared/ui/VideoPlayer"
import { Button } from "@/shared/ui"

export type VerifyProps = {
    blob: Blob
    onSubmit: () => void
    onVideoUploaded: (v: File) => void
}

const VerifyComponent: React.FC<VerifyProps> = ({
    blob,
    onSubmit,
    onVideoUploaded
}) => {
    const { isPending } = useSelector((state: RootState) => state.uploadVideoResult)

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
                onVideoUploaded(file)
            }
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        const url = URL.createObjectURL(blob)
        setPreview(url)
    }, [blob])

    return (
        <VerifyTask 
            title={'Verify your video'}
            description={'Check if the video has a good quality and your voice is clearly audible.'}
            VerifyComponent={(
                <VideoPlayer 
                    src={preview}    
                />
            )}
            Actions={(
                <>
                    <Button
                        view={'surface'}
                        isWide={true}
                        onClick={() => onUploadClick(
                            'video/*',
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
                </>
            )}
        />
    )
}

export const Verify = React.memo(VerifyComponent)