import React, { useEffect } from "react";

import { useTelegram } from "@/shared/lib/hooks/useTelegram";

import styles from './Respose.module.scss'
import { Button, Icon } from "@/shared/ui";
import { RouterPathes } from "@/shared/lib/types";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { useTabBarContext } from "@/shared/lib/providers";
import { icons } from "@/shared/assets/icons";
import { BottomSheet, useModal } from "@/shared/ui/BottomSheet";
import { useCopyToClipboard } from "@/shared/lib/hooks/useCopy";

export const TaskResponse: React.FC<{
    refLink: string
    award: number
}> = ({
    refLink,
    award
}) => {
    const { setHeaderColor, shareLink, shareToStory } = useTelegram()
    const { show, hide } = useTabBarContext()
    const { isOpen, open, close } = useModal()
    const [_, copy] = useCopyToClipboard()

    useEffect(() => {
        setHeaderColor('#131740')
        hide()

        return () => {
            show()
        }
    }, [])

    return (
        <div className={[
            styles.root,
            styles.container,
        ].join(' ').trim()}>
            <div className={styles.content}>
                <img 
                    src={icons.response}
                    width={140}
                    height={140}
                    alt="response"
                />
                <h2 className={styles.title}>
                    Thank you for your <br /> 
                    contribution! 🎉
                </h2>
                <div className={styles.cell}>
                    <div className={styles['row-between']}>
                        <div className={styles.row}>
                            <Icon 
                                name={'coin'}
                                view={'surface'}
                                size={20}
                            />
                            <p>Reward</p>
                        </div>
                        <p className={styles.reward}>+{award} Points</p>
                    </div>
                    <p className={styles.description}>
                        If the task is completed correctly you will receive your points within 24 hours
                    </p>
                </div>
            </div>
            <div className={styles.buttons}>
                <Button
                    className={styles['button-go']}
                    tag="link"
                    to={RouterPathes.MAIN}
                    view={'surface'}
                >
                    Go to Missions
                </Button>
                <ButtonIcon 
                    icon={'share-outline'}
                    view={'flat'}
                    size={'l'}
                    onClick={open}
                />
            </div>
            <BottomSheet
                isOpen={isOpen}
                setIsOpen={close}
            >
                <h3>Share Your Referral Link with Friends and Earn More Points!</h3>
                <div className={styles['copy-cell']}>
                    <div>
                        <p className={styles.label}>Your Referral Link</p>
                        <p className={styles.value}>{refLink}</p>
                    </div>
                    <ButtonIcon 
                        size={'l'}
                        view={'surface'}
                        icon={'copy-outline'}
                        onClick={() => copy(refLink)}
                    />
                </div>
                <Button
                    className={styles['modal-button']}
                    isWide={true}
                    view={'surface'}
                    icon={'link'}
                    onClick={() => shareLink(refLink)}
                >
                    Share Link
                </Button>
                <Button
                    className={styles['modal-button']}
                    isWide={true}
                    view={'surface'}
                    icon={'add'}
                    onClick={() => shareToStory(
                        'https://randomwordgenerator.com/img/picture-generator/54e0d6444e53a414f1dc8460962e33791c3ad6e04e5074417c2d78d39444c4_640.jpg',
                        {
                            widget_link: {
                                url: 'https://google.com',
                                name: refLink,
                            }
                        }
                    )}
                >
                    Share in Stories
                </Button>
            </BottomSheet>
        </div>
    )
}