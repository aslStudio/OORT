import React from "react";
import { Link } from "react-router-dom";

import { PropsDefault } from "@/shared/lib/types";

import { Icon, IconProps } from "../Icon";

import { tags, sizes, radius, views } from './model'
import styles from './ButtonIcon.module.scss'

export type ButtonIconProps = PropsDefault<{
    tag?: (typeof tags)[number]
    size?: (typeof sizes)[number]
    radius?: (typeof radius)[number]
    icon: IconProps['name']
    view?: (typeof views)[number]
    to?: string
    onClick?: () => void
}>

const mapIconView: Record<NonNullable<ButtonIconProps['view']>, IconProps['view']> = {
    surface: 'dark',
    flat: 'surface',
    brand: 'surface'
}

export const ButtonIconComponent: React.FC<ButtonIconProps> = ({
    tag = 'button',
    size = 'm',
    radius = 'rounded',
    view = 'surface',
    to,
    className,
    icon,
    onClick
}) => {
    const classes = [
        className,
        styles.root,
        styles[`size_${size}`],
        styles[`radius_${radius}`],
        styles[`view_${view}`],
    ].join(' ')

    if (tag === 'button') {
        return (
            <button
                className={classes}
                onClick={onClick}
            >
                <Icon 
                    name={icon}
                    size={20}
                    view={mapIconView[view]}
                />
            </button>
        )
    }

    return (
        <Link
            className={classes}
            to={to ?? ''}
        >
            <Icon 
                name={icon}
                size={20}
                view={mapIconView[view]}
            />
        </Link>
    )
}

export const ButtonIcon = React.memo(ButtonIconComponent)