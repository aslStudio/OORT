import { Link, useLocation } from "react-router-dom"

import { RouterPathes } from "@/shared/lib/types"
import { Icon, IconProps } from "@/shared/ui"

import styles from './TabBar.module.scss'

const data: {
    icon: IconProps['name']
    text: string
    to: RouterPathes
}[] = [
    {
        icon: 'home',
        text: 'Main',
        to: RouterPathes.MAIN,
    },
    {
        icon: 'referrals',
        text: 'Referrals',
        to: RouterPathes.OTHER,
    },
    {
        icon: 'challenges',
        text: 'Challenges',
        to: RouterPathes.OTHER,
    },
    {
        icon: 'leaderboard',
        text: 'Leaderboard',
        to: RouterPathes.OTHER,
    },
]

export const TabBar = () => {
    const location = useLocation()

    return (
        <footer className={styles.root}>
            {data.map((item, key) => (
                <Link
                    key={key}
                    className={[
                        styles.button,
                        location.pathname === item.to ? styles['is-active'] : ''
                    ].join(' ').trim()}
                    to={item.to}
                >
                    <Icon 
                        className={styles.icon}
                        name={item.icon}
                        size={24}
                        view={location.pathname === item.to ? 'brand' : 'dark'}
                    />
                    <p>
                        {item.text}
                    </p>
                </Link>
            ))}
        </footer>
    )
}