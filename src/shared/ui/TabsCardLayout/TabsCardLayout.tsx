import React, { useState } from "react";

import { PropsDefault } from "@/shared/lib/types";

import { TransitionFade } from "../TransitionFade";

import styles from './TabsCardLayout.module.scss'

export type TabsCardLayoutProps = PropsDefault<{
    leftTab: string
    rightTab: string
    FirstComponent: React.ReactNode
    SecondComponent: React.ReactNode
}>

const TabsCardLayoutComponent: React.FC<TabsCardLayoutProps> = ({
    leftTab,
    rightTab,
    FirstComponent,
    SecondComponent,
}) => {
    const [state, setState] = useState(1)

    return (
        <div className={styles.root}>
            <div className={styles.tabs}>
                <button
                    className={[
                        styles.tab,
                        state === 1 ? styles['is-active'] : ''
                    ].join(' ').trim()}
                    onClick={() => setState(1)}
                >
                    {leftTab}
                </button>
                <button
                    className={[
                        styles.tab,
                        state === 2 ? styles['is-active'] : ''
                    ].join(' ').trim()}
                    onClick={() => setState(2)}
                >
                    {rightTab}
                </button>
            </div>
            <div className={styles.wrapper}>
                <TransitionFade className={styles.fade}>
                    {state === 1 && (
                        <div 
                            key={'first'}
                            className={styles.inner}
                        >
                            {FirstComponent}       
                        </div>
                    )}
                    {state === 2 && (
                        <div 
                            key={'second'}
                            className={styles.inner}
                        >
                            {SecondComponent}       
                        </div>
                    )}
                </TransitionFade>
            </div>
        </div>        
    )
}

export const TabsCardLayout = React.memo(TabsCardLayoutComponent)