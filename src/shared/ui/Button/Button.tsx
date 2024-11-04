import React from "react";
import { Link } from "react-router-dom";

import { PropsDefaultWithChildren } from "@/shared/lib/types";

import { tags, views } from './model'
import styles from './Button.module.scss'

export type ButtonProps = PropsDefaultWithChildren<{
    tag?: (typeof tags)[number]
    view?: (typeof views)[number]
    to?: string
    isWide?: boolean
    onClick?: () => void
}>

const ButtonComponent: React.FC<ButtonProps> = ({
    className,
    tag = 'button',
    to,
    view = 'brand',
    children,
    isWide = false,
    onClick
}) => {
    const classes = [
        className ? className : '',
        styles.root,
        styles[`view_${view}`],
        isWide ? styles['is-wide'] : ''
    ].join(' ')

    if  (tag === 'button') {
        return (
            <button
                className={classes}
                onClick={onClick}
            >
                {children}
            </button>
        )
    }

    return (
        <Link
            className={classes}
            to={to ?? ''}
        >
            {children}
        </Link>
    )
}

export const Button = React.memo(ButtonComponent)