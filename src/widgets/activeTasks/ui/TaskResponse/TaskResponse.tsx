import React, { useEffect } from "react"

import { useCopyToClipboard } from "@/shared/lib/hooks/useCopy"
import { useTelegram } from "@/shared/lib/hooks/useTelegram"
import { useTabBarContext } from "@/shared/lib/providers"
import { BottomSheet, useModal } from "@/shared/ui/BottomSheet"
import { icons } from "@/shared/assets/icons"
import { RouterPathes } from "@/shared/lib/types"
import { Button, Icon } from "@/shared/ui"
import { ButtonIcon } from "@/shared/ui/ButtonIcon"

import styles from './TaskResponse.module.scss'

export type TaskResponseProps = {
    award: number
    story: string
}

const refLink = 'MOCK REPLACE IT'

const TaskResponseComponent: React.FC<TaskResponseProps> = ({
    award,
    story
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
                        story,
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

export const TaskResponse = React.memo(TaskResponseComponent)