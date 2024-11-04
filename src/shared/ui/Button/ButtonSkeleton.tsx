import React from "react";

import { PropsDefault } from "@/shared/lib/types";

import styles from './Button.module.scss'

export const ButtonSkeleton: React.FC<PropsDefault> = ({
    className
}) => (
    <div 
        className={[
            className,
            styles.root,
            styles[`view_skeleton`],
            styles['is-wide'],
        ].join(' ')}
    />
)