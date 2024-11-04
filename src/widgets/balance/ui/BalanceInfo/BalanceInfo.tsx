import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store";

import { PropsDefault } from "@/shared/lib/types";
import { TransitionFade } from "@/shared/ui/TransitionFade";
import { TextSkeleton } from "@/shared/ui/TextSkeleton";
import { ButtonIconSkeleton } from "@/shared/ui/ButtonIcon/ButtonIconSkeleton";
import { toFormattedNumber } from "@/shared/lib/number";
import { ButtonIcon } from "@/shared/ui/ButtonIcon/ButtonIcon";

import { balanceModel } from '../../model'
import styles from './BalanceInfo.module.scss'
import { SkeletonWrapper } from "@/shared/ui/SkeletonWrapper";

export const BalanceInfo: React.FC<PropsDefault> = ({
    className
}) => {
    const { isPending, value } = useSelector((state: RootState) => state.balance)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(balanceModel.thunks.fetchBalance())
    }, [])

    return (
        <div className={styles.root}>
            <p className={styles.subtitle}>Withdraw & transactions history</p>
            <TransitionFade>
                {isPending && (
                    <SkeletonWrapper 
                        key={'isPending'}
                        className={styles.wrapper}
                    >
                        <TextSkeleton 
                            view="base"
                            fontSize={36}
                            lineHeight={48}
                            widthRange={[0.5, 0.7]}
                        />
                        <ButtonIconSkeleton 
                            size={'m'}
                        />
                    </SkeletonWrapper>
                )}
                {!isPending && (
                    <div 
                        key={'notIsPending'}
                        className={styles.wrapper}
                    >
                        <p className={styles.amount}>{toFormattedNumber(value)} <span>Ptc</span></p>
                        <ButtonIcon 
                            size={'m'}
                            view={'surface'}
                            icon={'chevron-right-outline'}
                            onClick={() => {}}
                        />
                    </div>
                )}
            </TransitionFade>
        </div>
    )
}