import React, { useEffect } from "react"

import { BottomSheet } from "@/shared/ui/BottomSheet"

import styles from './ReferralModal.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/store"
import { referralModel } from "../../model"
import { TransitionFade } from "@/shared/ui/TransitionFade"
import { SkeletonWrapper } from "@/shared/ui/SkeletonWrapper"
import { ButtonSkeleton } from "@/shared/ui/Button/ButtonSkeleton"
import { ButtonIcon } from "@/shared/ui/ButtonIcon"
import { Button } from "@/shared/ui"
import { useTelegram } from "@/shared/lib/hooks/useTelegram"
import { useCopyToClipboard } from "@/shared/lib/hooks/useCopy"

export type ReferralModalProps = {
    isOpen: boolean
    setIsOpen: (v: boolean) => void
}

export const ReferralModal: React.FC<ReferralModalProps> = ({
    isOpen,
    setIsOpen
}) => {
    const {
        isPending,
        referralLink,
        storyImage
    } = useSelector((state: RootState) => state.referral)
    const dispatch = useDispatch<AppDispatch>()

    const { shareLink, shareToStory } = useTelegram()
    const [_, copy] = useCopyToClipboard()

    useEffect(() => {
        if (isOpen && !referralLink.length) {
            dispatch(referralModel.thunks.fetch())
        }
    }, [isOpen, referralLink])

    return (
        <BottomSheet
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <h3 className={styles.title}>
                Share Your Referral Link with Friends and Earn More Points!
            </h3>
            <TransitionFade className={styles.wrapper}>
                {isPending && (
                    <SkeletonWrapper key={'Skeleton'}>
                        <div 
                            className={styles['cell-skeleton']}
                        />
                        <ButtonSkeleton 
                            className={styles['modal-button']}
                        />
                        <ButtonSkeleton 
                            className={styles['modal-button']}
                        />
                    </SkeletonWrapper>
                )}
                {!isPending && (
                    <div key={'Content'}>
                        <div className={styles['copy-cell']}>
                            <div>
                                <p className={styles.label}>Your Referral Link</p>
                                <p className={styles.value}>{referralLink}</p>
                            </div>
                            <ButtonIcon 
                                size={'l'}
                                view={'surface'}
                                icon={'copy-outline'}
                                onClick={() => copy(referralLink)}
                            />
                        </div>
                        <Button
                            className={styles['modal-button']}
                            isWide={true}
                            view={'surface'}
                            icon={'link'}
                            onClick={() => shareLink(referralLink)}
                        >
                            Share Link
                        </Button>
                        <Button
                            className={styles['modal-button']}
                            isWide={true}
                            view={'surface'}
                            icon={'add'}
                            onClick={() => shareToStory(
                                storyImage,
                                {
                                    widget_link: {
                                        url: referralLink,
                                        name: referralLink,
                                    }
                                }
                            )}
                        >
                            Share in Stories
                        </Button>
                    </div>
                )}
            </TransitionFade>
        </BottomSheet>
    )
}