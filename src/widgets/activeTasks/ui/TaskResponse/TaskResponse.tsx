import React, { useEffect } from "react"

import { ReferralModal } from "@/features/referral"

import { useTelegram } from "@/shared/lib/hooks/useTelegram"
import { useTabBarContext } from "@/shared/lib/providers"
import { useModal } from "@/shared/ui/BottomSheet"
import { icons } from "@/shared/assets/icons"
import { RouterPathes } from "@/shared/lib/types"
import { Button, Icon } from "@/shared/ui"
import { ButtonIcon } from "@/shared/ui/ButtonIcon"

import styles from './TaskResponse.module.scss'

export type TaskResponseProps = {
    award: number
    story: string
}

const TaskResponseComponent: React.FC<TaskResponseProps> = ({
    award,
}) => {
    const { setHeaderColor } = useTelegram()
    const { show, hide } = useTabBarContext()
    const { isOpen, open, close } = useModal()

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
            <ReferralModal 
                isOpen={isOpen}
                setIsOpen={close}
            />
        </div>
    )
}

export const TaskResponse = React.memo(TaskResponseComponent)