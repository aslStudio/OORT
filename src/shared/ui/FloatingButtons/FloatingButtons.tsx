import React from "react";

import styles from './FloatingButtons.module.scss'

export const FloatingButtons: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const isTwoButtons = Array.isArray(children)

    const classes = [
        styles.root,
        isTwoButtons ? styles['is-two-buttons'] : styles['is-one-button']
    ].join(' ').trim()

    return (
        <div className={classes}>
            {children}
        </div>
    )
}